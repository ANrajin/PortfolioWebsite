'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
    className?: string;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Code-style characters - programming symbols and single chars only
        const codeChars = '01{}[]()<>/\\;:=+-*&|!?#@$%^~`_.,01001100101010';

        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);

        // Array to track the y position of each column
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        // Animation loop
        const draw = () => {
            // More opaque background for better text readability
            ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set text style
            ctx.font = `${fontSize}px monospace`;

            // Draw characters
            for (let i = 0; i < drops.length; i++) {
                const char = codeChars[Math.floor(Math.random() * codeChars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Draw with reduced opacity for subtlety
                ctx.fillStyle = 'rgba(20, 184, 166, 0.25)';
                ctx.fillText(char, x, y);

                // Reset drop to top with some randomness
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 60);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            clearInterval(interval);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none ${className}`}
            style={{ zIndex: 0, opacity: 0.5 }}
        />
    );
};

export default MatrixRain;
