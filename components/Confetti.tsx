import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
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
    const colors = ['#ef4444', '#3b82f6', '#eab308', '#22c55e', '#ec4899', '#a855f7'];

    // Create larger, more "paper-like" particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height, // Start above
        w: Math.random() * 15 + 10, // Wider
        h: Math.random() * 10 + 8, // Taller
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2, // Slower gravity
        drift: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        tilt: Math.random() * 10,
        tiltSpeed: Math.random() * 0.1 + 0.05,
        drag: 0.05 // Air resistance
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.lineWidth = p.h / 2;
        ctx.strokeStyle = p.color;
        
        // Simulate 3D rotation by changing height based on tilt
        const currentH = p.h * Math.cos(p.tilt);
        
        ctx.save();
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -currentH / 2, p.w, currentH);
        ctx.restore();

        // Physics
        p.y += p.speed;
        p.x += p.drift + Math.sin(p.tilt) * 0.5; // Sway
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;

        // Wrap around
        if (p.y > canvas.height) {
          p.y = -50;
          p.x = Math.random() * canvas.width;
          p.speed = Math.random() * 3 + 2;
        }
      });

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
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};