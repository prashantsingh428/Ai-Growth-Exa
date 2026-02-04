import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const NeuralCursor = () => {
    const cursorRef = useRef(null);
    const canvasRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const delayedMouse = useRef({ x: 0, y: 0 });
    const currentColor = useRef('rgba(59, 130, 246'); // Default blue

    useEffect(() => {
        // Track mouse position
        const manageMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            // Detect element and get text color
            const element = document.elementFromPoint(e.clientX, e.clientY);
            if (element) {
                const computedStyle = getComputedStyle(element);
                const color = computedStyle.color;

                // Convert rgb(r, g, b) to rgba(r, g, b format (without closing paren and alpha)
                if (color && color.startsWith('rgb')) {
                    currentColor.current = color.replace('rgb(', 'rgba(').replace(')', '');
                }
            }
        };

        window.addEventListener("mousemove", manageMouseMove);

        // Canvas Setup for the neural trail
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Particles for the tail
        const maxParticles = 15;
        const particles = [];

        class Particle {
            constructor(x, y, color) {
                this.x = x || delayedMouse.current.x;
                this.y = y || delayedMouse.current.y;
                this.size = Math.random() * 1.5 + 0.8;
                this.life = 1; // 1 = full life, 0 = dead
                this.decay = Math.random() * 0.03 + 0.02;
                this.color = color || 'rgba(59, 130, 246'; // Use provided color or default to blue
            }

            update() {
                this.life -= this.decay;
            }

            draw() {
                ctx.fillStyle = `${this.color}, ${this.life * 0.6})`;
                ctx.shadowBlur = 5;
                ctx.shadowColor = this.color.replace('rgba', 'rgb').replace(/,[^,]*\)/, ')');
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const animate = () => {
            // Smooth follower logic (Lerp)
            const { x, y } = mouse.current;
            delayedMouse.current.x += (x - delayedMouse.current.x) * 0.15;
            delayedMouse.current.y += (y - delayedMouse.current.y) * 0.15;

            // Move the main cursor dot
            gsap.set(cursorRef.current, { x: mouse.current.x, y: mouse.current.y });

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new particle at follower position
            if (Math.random() > 0.6) {
                particles.push(new Particle(delayedMouse.current.x, delayedMouse.current.y, currentColor.current));
            }

            // Draw follower connecting line
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(147, 51, 234, 0.5)'; // Purple line
            ctx.lineWidth = 1;
            ctx.moveTo(mouse.current.x, mouse.current.y);
            ctx.lineTo(delayedMouse.current.x, delayedMouse.current.y);
            ctx.stroke();

            // Perform particle updates
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                const dx = particles[i].x - delayedMouse.current.x;
                const dy = particles[i].y - delayedMouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `${particles[i].color}, ${particles[i].life * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(delayedMouse.current.x, delayedMouse.current.y);
                    ctx.stroke();
                }

                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            window.removeEventListener("resize", setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            {/* The Main Dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-blue-500 rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            />
            {/* The Canvas Trail */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
            />
        </>
    );
};

export default NeuralCursor;
