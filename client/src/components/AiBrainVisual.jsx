import React, { useEffect, useRef } from 'react';

const AiBrainVisual = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Safety check

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 60;
        const connectionDistance = 120;
        let requestAnimationFrameId;

        const resize = () => {
            if (canvas && canvas.parentElement) {
                width = canvas.width = canvas.parentElement.offsetWidth;
                height = canvas.height = canvas.parentElement.offsetHeight;
                initParticles();
            }
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1.0;
                this.vy = (Math.random() - 0.5) * 1.0;
                this.size = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? '#3b82f6' : '#a855f7'; // Blue or Purple
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!width || !height) return;

            ctx.clearRect(0, 0, width, height);

            // Draw connections first (behind nodes)
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(148, 163, 184, ${1 - dist / connectionDistance})`; // Gray-400 equivalent
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Central "Brain" Pulse Effect
            const time = Date.now() * 0.002;
            const coreX = width / 2;
            const coreY = height / 2;
            const pulseSize = 25 + Math.sin(time) * 5;

            // Outer glow
            const gradient = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, pulseSize * 4);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(coreX, coreY, pulseSize * 4, 0, Math.PI * 2);
            ctx.fill();

            // Inner Core
            ctx.beginPath();
            ctx.arc(coreX, coreY, pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#3b82f6';
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow

            requestAnimationFrameId = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (requestAnimationFrameId) cancelAnimationFrame(requestAnimationFrameId);
        };
    }, []);

    return (
        <div className="relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 pointer-events-none"></div>
            <canvas ref={canvasRef} className="block w-full h-full" />

            <div className="absolute bottom-6 left-6 right-6 bg-gray-950/80 backdrop-blur-md p-4 rounded-xl border border-gray-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <div>
                        <h3 className="text-white text-sm font-bold tracking-wide">AI CORE</h3>
                        <p className="text-blue-400 text-xs font-mono">Growth Engine</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-xs text-gray-400 font-mono">STATUS: OPTIMAL</span>
                </div>
            </div>
        </div>
    );
};

export default AiBrainVisual;
