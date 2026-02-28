import React, { useEffect, useRef } from 'react';

export const AnimatedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const gridSize = 40;
    const runners: { 
      x: number; 
      y: number; 
      targetX: number; 
      targetY: number; 
      alpha: number; 
      state: 'fading-in' | 'moving' | 'fading-out';
      stepsLeft: number;
      dir: { x: number; y: number };
      speed: number;
      trail: { x: number; y: number }[];
    }[] = [];
    const maxRunners = 4;
    const trailLength = 25;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      // Ensure we use device pixel ratio for sharpness and correct proportions
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      runners.length = 0;
    };

    const createRunner = () => {
      const startX = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const startY = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      
      const directions = [
        { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }
      ];
      const dir = directions[Math.floor(Math.random() * directions.length)];
      
      return {
        x: startX,
        y: startY,
        targetX: startX + dir.x * gridSize,
        targetY: startY + dir.y * gridSize,
        alpha: 0,
        state: 'fading-in' as const,
        stepsLeft: 4 + Math.floor(Math.random() * 6),
        dir,
        speed: 2 + Math.random() * 1,
        trail: [],
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid Lines
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Manage Runners
      if (runners.length < maxRunners && Math.random() < 0.05) {
        runners.push(createRunner());
      }

      for (let i = runners.length - 1; i >= 0; i--) {
        const r = runners[i];

        // Update Trail
        r.trail.unshift({ x: r.x, y: r.y });
        if (r.trail.length > trailLength) {
          r.trail.pop();
        }

        // State Management
        if (r.state === 'fading-in') {
          r.alpha += 0.05;
          if (r.alpha >= 0.8) {
            r.alpha = 0.8;
            r.state = 'moving';
          }
        } else if (r.state === 'fading-out') {
          r.alpha -= 0.02;
          if (r.alpha <= 0) {
            runners.splice(i, 1);
            continue;
          }
        }

        // Movement
        if (r.state === 'moving' || r.state === 'fading-in') {
          r.x += r.dir.x * r.speed;
          r.y += r.dir.y * r.speed;

          // Check if reached target intersection
          const distToTarget = Math.sqrt(Math.pow(r.targetX - r.x, 2) + Math.pow(r.targetY - r.y, 2));
          if (distToTarget < r.speed) {
            r.x = r.targetX;
            r.y = r.targetY;
            r.stepsLeft--;

            if (r.stepsLeft <= 0) {
              r.state = 'fading-out';
            } else {
              // Decide whether to change direction at this intersection
              if (Math.random() < 0.3) { // 30% chance to change direction
                const directions = [
                  { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }
                ];
                // Filter out the opposite direction to prevent 180-degree turns
                const possibleDirs = directions.filter(d => !(d.x === -r.dir.x && d.y === -r.dir.y));
                r.dir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
              }

              // Set next target
              r.targetX = r.x + r.dir.x * gridSize;
              r.targetY = r.y + r.dir.y * gridSize;
              
              // Bounds check
              if (r.targetX < 0 || r.targetX > width || r.targetY < 0 || r.targetY > height) {
                r.state = 'fading-out';
              }
            }
          }
        }

        // Draw Trail
        const size = 3; // Larger pixel size
        r.trail.forEach((pos, index) => {
          const trailAlpha = (r.alpha * (1 - index / trailLength) * 0.8);
          if (trailAlpha > 0) {
            ctx.fillStyle = `rgba(255, 58, 2, ${trailAlpha})`; // Color #ff3a02
            ctx.fillRect(pos.x - size / 2, pos.y - size / 2, size, size);
          }
        });

        // Draw Head (Pixel)
        if (r.alpha > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${r.alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(r.x - size / 2, r.y - size / 2, size, size);
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    resize();
    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        style={{ background: 'transparent', display: 'block' }}
      />
    </div>
  );
};
