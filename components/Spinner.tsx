import React, { useEffect, useState, useMemo } from 'react';
import { Restaurant } from '../types';

interface Props {
  restaurants: Restaurant[];
  isSpinning: boolean;
  onFinished: () => void;
  onTriggerSpin: () => void;
  winner: Restaurant | null;
  useWeight: boolean;
}

// SLO Palette with slightly more vibrant/matte tones for the wheel
// Added #73A6C7 (slo-sky) to the palette
const COLORS = ['#2A9D8F', '#E9C46A', '#E76F51', '#264653', '#F4A261', '#73A6C7']; 

const Spinner: React.FC<Props> = ({ restaurants, isSpinning, onFinished, onTriggerSpin, winner, useWeight }) => {
  const [rotation, setRotation] = useState(0);

  // Removed the "isUpdating" dimmer logic per request
  // We still want to reset rotation if restaurants change significantly, but visually we keep it solid.

  const sliceData = useMemo(() => {
    if (restaurants.length === 0) return [];
    
    const totalWeight = useWeight 
      ? restaurants.reduce((sum, r) => sum + r.rating, 0) 
      : restaurants.length;

    let currentAngle = 0;
    
    return restaurants.map((r) => {
      const weight = useWeight ? r.rating : 1;
      const angleSize = (weight / totalWeight) * 360;
      const start = currentAngle;
      const end = currentAngle + angleSize;
      const center = start + (angleSize / 2);
      currentAngle = end;

      return {
        ...r,
        startAngle: start,
        endAngle: end,
        centerAngle: center,
        angleSize
      };
    });
  }, [restaurants, useWeight]);

  const getCoordinatesForAngle = (angleInDegrees: number, radius: number = 100) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    const x = Math.cos(angleInRadians) * radius;
    const y = Math.sin(angleInRadians) * radius;
    return [x, y];
  };

  useEffect(() => {
    if (isSpinning && winner && sliceData.length > 0) {
      const winnerSlice = sliceData.find(s => s.id === winner.id);
      if (!winnerSlice) return;

      const winnerCenter = winnerSlice.centerAngle;
      const extraSpins = 360 * 5; // Smooth spins
      const targetRotation = 270 - winnerCenter + extraSpins;
      
      let nextRotation = rotation + (targetRotation - (rotation % 360));
      if (nextRotation <= rotation) nextRotation += 360;
      
      // Random jitter
      const randomOffset = (Math.random() - 0.5) * (winnerSlice.angleSize * 0.8);
      
      setRotation(nextRotation + randomOffset);

      const duration = 3000; // 3 seconds
      const timer = setTimeout(() => {
        onFinished();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isSpinning, winner, sliceData]);

  const renderWheel = () => {
    return sliceData.map((slice, index) => {
      const [startX, startY] = getCoordinatesForAngle(slice.startAngle);
      const [endX, endY] = getCoordinatesForAngle(slice.endAngle);
      const largeArcFlag = slice.angleSize > 180 ? 1 : 0;

      const pathData = [
        `M 0 0`,
        `L ${startX} ${startY}`,
        `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `Z`
      ].join(' ');

      const baseColor = COLORS[index % COLORS.length];
      
      // Text placement
      const midAngle = slice.centerAngle;
      const flipText = midAngle > 90 && midAngle < 270;
      const textRotation = flipText ? midAngle + 180 : midAngle;
      const textAnchor = flipText ? "end" : "start";
      const textX = flipText ? -45 : 45; 

      // Text Wrapping Logic
      const words = slice.name.split(' ');
      let lines: string[] = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        // Heuristic: ~14 characters per line fits well
        if (currentLine.length + 1 + words[i].length <= 14) {
           currentLine += ' ' + words[i];
        } else {
           lines.push(currentLine);
           currentLine = words[i];
        }
      }
      lines.push(currentLine);

      // Cap at 2 lines to prevent visual clutter
      if (lines.length > 2) {
         // Join the rest into the second line
         lines = [lines[0], lines.slice(1).join(' ')];
         // Truncate if ridiculously long
         if (lines[1].length > 15) lines[1] = lines[1].substring(0, 13) + '..';
      }

      return (
        <g key={slice.id} className="transition-all duration-500 ease-out">
          <path 
            d={pathData} 
            fill={baseColor} 
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="0.5"
          />
          <text
            transform={`rotate(${textRotation})`}
            fill="white"
            fontSize="5.5" 
            fontWeight="700"
            fontFamily="Quicksand, sans-serif"
            textAnchor={textAnchor}
            style={{ pointerEvents: 'none', textShadow: '0px 1px 2px rgba(0,0,0,0.3)' }}
          >
            {lines.map((line, i) => (
              <tspan 
                key={i} 
                x={textX} 
                dy={i === 0 ? (lines.length > 1 ? "-0.25em" : "0.35em") : "1.2em"}
              >
                {line}
              </tspan>
            ))}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="relative flex flex-col items-center">
      
      {/* Increased Size from 380px to 440px */}
      <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] xl:w-[640px] xl:h-[640px] flex items-center justify-center transition-all duration-300">
         
        {/* Realistic Wheel Container */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-100 shadow-2xl flex items-center justify-center border border-gray-400">
           {/* Chrome Bezel */}
           <div className="w-[98%] h-[98%] rounded-full bg-gradient-to-b from-gray-100 via-white to-gray-300 flex items-center justify-center p-1 shadow-inner">
              
              {/* Dark Inner Rim */}
              <div className="w-full h-full rounded-full bg-gray-800 p-[2px] shadow-inner relative">
                
                {/* Spinning SVG - Removed opacity transitions on update */}
                <div 
                  className="w-full h-full rounded-full overflow-hidden relative z-0"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? 'transform 3s cubic-bezier(0.1, 0.7, 0.1, 1)' : 'transform 0.5s ease-out'
                  }}
                >
                  <svg 
                    viewBox="-100 -100 200 200" 
                    className="w-full h-full"
                  >
                    <defs>
                        {/* Radial gradient for 3D effect on slices */}
                        <radialGradient id="sliceShine" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="60%" stopColor="white" stopOpacity="0" />
                            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
                        </radialGradient>
                    </defs>
                    <g transform="rotate(0)">
                      {renderWheel()}
                    </g>
                    
                    {/* Gloss Overlay on top of wheel */}
                    <circle cx="0" cy="0" r="100" fill="url(#sliceShine)" pointerEvents="none" />
                    
                    {/* Center Hub Background */}
                    <circle cx="0" cy="0" r="18" fill="#2D3748" stroke="#1A202C" strokeWidth="2" />
                  </svg>
                </div>

                {/* Glass Reflection Overlay (Static) */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-10"></div>

              </div>
           </div>
        </div>

        {/* Pointer - 3D Triangle */}
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-30 drop-shadow-lg">
           <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
             <path d="M20 38L5 5H35L20 38Z" fill="#E53E3E" stroke="#9B2C2C" strokeWidth="2" />
             <path d="M20 38L5 5H35L20 38Z" fill="url(#pointerGrad)" fillOpacity="0.5"/>
             <defs>
               <linearGradient id="pointerGrad" x1="20" y1="5" x2="20" y2="38" gradientUnits="userSpaceOnUse">
                 <stop stopColor="white" stopOpacity="0.6"/>
                 <stop offset="1" stopColor="black" stopOpacity="0.1"/>
               </linearGradient>
             </defs>
           </svg>
        </div>

        {/* Center CTA Button - Floating above center */}
        <button
            onClick={onTriggerSpin}
            disabled={isSpinning || restaurants.length === 0}
            className={`
                absolute z-40 w-24 h-24 rounded-full flex items-center justify-center
                text-white font-bold text-xl tracking-wider border-4 border-gray-200
                shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_4px_10px_rgba(255,255,255,0.4)]
                transition-all duration-150 active:translate-y-1 active:shadow-[0_5px_10px_rgba(0,0,0,0.3)]
                ${isSpinning || restaurants.length === 0
                  ? 'bg-gray-400 cursor-not-allowed grayscale' 
                  : 'bg-gradient-to-br from-slo-coral to-red-600 hover:scale-105'}
            `}
        >
            <span className="drop-shadow-md">SPIN</span>
        </button>
      </div>
    </div>
  );
};

export default Spinner;