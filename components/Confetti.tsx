import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number; // Velocity X
  vy: number; // Velocity Y
  w: number;
  h: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  drag: number;
}

export const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    // Bright, beachy palette
    const colors = ['#2A9D8F', '#E9C46A', '#E76F51', '#F4A261', '#264653'];

    const createParticle = (x: number, y: number, burstFromSide: boolean = false, direction: 'left' | 'right' = 'left') => {
      const speed = Math.random() * 15 + 10;
      const angle = burstFromSide 
        ? (direction === 'left' ? -Math.PI / 4 : -Math.PI * 0.75) + (Math.random() * 0.5 - 0.25)
        : Math.PI / 2;

      let vx = 0;
      let vy = 0;

      if (burstFromSide) {
        vx = Math.cos(angle) * speed * 1.5;
        vy = Math.sin(angle) * speed * 1.5;
      } else {
        // Falling rain style
        vx = Math.random() * 4 - 2;
        vy = Math.random() * 5 + 5;
      }

      return {
        x,
        y,
        vx,
        vy,
        w: Math.random() * 15 + 8,
        h: Math.random() * 15 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        drag: 0.96 // Slow down over time
      };
    };

    // Initial Burst
    // 1. Rain from top
    for (let i = 0; i < 150; i++) {
      particles.push(createParticle(Math.random() * canvas.width, Math.random() * -100));
    }
    
    // 2. Burst from Left Side
    for (let i = 0; i < 100; i++) {
      particles.push(createParticle(0, canvas.height * 0.8, true, 'left'));
    }

    // 3. Burst from Right Side
    for (let i = 0; i < 100; i++) {
      particles.push(createParticle(canvas.width, canvas.height * 0.8, true, 'right'));
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        
        p.vy += 0.5; // Gravity
        p.vx *= p.drag;
        p.vy *= p.drag;

        // Reset if falling rain goes off screen (keep the party going slightly)
        if (p.y > canvas.height + 100 && Math.random() > 0.9) {
           p.y = -50;
           p.x = Math.random() * canvas.width;
           p.vy = Math.random() * 5 + 5;
           p.vx = Math.random() * 2 - 1;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40" // Lower z-index to stay behind result card (z-50)
    />
  );
};