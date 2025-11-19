import React, { useEffect, useState, useMemo } from 'react';
import { Restaurant } from '../types';

interface Props {
  restaurants: Restaurant[];
  isSpinning: boolean;
  onFinished: () => void;
  winner: Restaurant | null;
  useWeight: boolean;
}

// Classic Dartboard colors
const COLORS = ['#212121', '#F5F5DC', '#B71C1C', '#1B5E20']; 

const Spinner: React.FC<Props> = ({ restaurants, isSpinning, onFinished, winner, useWeight }) => {
  const [rotation, setRotation] = useState(0);

  // Calculate angles for each slice based on weight
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

  // Coordinate helper
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

      // Calculate rotation to land the winner at the top (270 degrees / -90 degrees)
      const winnerCenter = winnerSlice.centerAngle;
      
      // We want: (rotation + winnerCenter) % 360 === 270
      const extraSpins = 360 * 8; // Fast spin
      const targetRotation = 270 - winnerCenter + extraSpins;
      
      // Ensure forward rotation
      let nextRotation = rotation + (targetRotation - (rotation % 360));
      if (nextRotation <= rotation) nextRotation += 360;
      
      // Add slight randomness within the wedge to feel organic
      const randomOffset = (Math.random() - 0.5) * (winnerSlice.angleSize * 0.7);
      
      setRotation(nextRotation + randomOffset);

      const duration = 4000; 
      const timer = setTimeout(() => {
        onFinished();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isSpinning, winner, sliceData]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderWheel = () => {
    return sliceData.map((slice, index) => {
      // SVG Arc Logic
      const [startX, startY] = getCoordinatesForAngle(slice.startAngle);
      const [endX, endY] = getCoordinatesForAngle(slice.endAngle);
      const largeArcFlag = slice.angleSize > 180 ? 1 : 0;

      const pathData = [
        `M 0 0`,
        `L ${startX} ${startY}`,
        `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `Z`
      ].join(' ');

      // Determine Colors (Dartboard pattern)
      const baseColor = COLORS[index % COLORS.length];
      
      // Text Rotation
      const midAngle = slice.centerAngle;
      
      // Adjust text flip so it's always readable
      const flipText = midAngle > 90 && midAngle < 270;
      const textRotation = flipText ? midAngle + 180 : midAngle;
      const textAnchor = flipText ? "end" : "start";
      const textX = flipText ? -45 : 45; // Push text closer to edge

      return (
        <g key={slice.id}>
          <path 
            d={pathData} 
            fill={baseColor} 
            stroke="#d4af37" // Gold wire
            strokeWidth="1"
          />
          {/* Text Label */}
          <text
            x={textX} 
            y={0}
            dy="0.35em"
            fill={['#F5F5DC', '#F5F5DC'].includes(baseColor) ? '#212121' : '#FFF'}
            fontSize="9" 
            fontWeight="900"
            fontFamily="Poppins, sans-serif"
            textAnchor={textAnchor}
            transform={`rotate(${textRotation})`}
            style={{ pointerEvents: 'none', textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}
          >
            {slice.name.length > 18 ? slice.name.substring(0, 16) + '..' : slice.name}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="relative w-[500px] h-[500px] mx-auto my-4 flex items-center justify-center scale-75 md:scale-100 transform transition-transform">
       {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 z-20 drop-shadow-xl">
        <svg width="40" height="60" viewBox="0 0 40 60">
           <path d="M 20 60 L 0 0 L 40 0 Z" fill="#d4af37" stroke="#000" strokeWidth="2"/>
        </svg>
      </div>

      {/* Wood Backing */}
      <div className="w-full h-full rounded-full bg-wood-dark border-8 border-wood-light shadow-2xl flex items-center justify-center">
        
        {/* Spinning Wheel Container */}
        <div 
          className="w-[95%] h-[95%] rounded-full overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0, 0.2, 1)' : 'transform 0.5s ease-out'
          }}
        >
          {/* SVG Wheel - viewBox scaled to -100 to 100 */}
          <svg 
            viewBox="-100 -100 200 200" 
            className="w-full h-full"
          >
            <g transform="rotate(0)">
              {renderWheel()}
            </g>
            
            {/* Wireframe rings for dartboard effect */}
            <circle cx="0" cy="0" r="100" fill="none" stroke="#d4af37" strokeWidth="2" />
            <circle cx="0" cy="0" r="50" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
          </svg>

        </div>

        {/* Bullseye Cap */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 bg-red-700 rounded-full shadow-inner border-2 border-yellow-600 z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;