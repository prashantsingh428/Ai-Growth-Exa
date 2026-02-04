import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const textRef = useRef(null);
    const containerRef = useRef(null);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    const targetText = "AI GROWTH EXA";

    useEffect(() => {
        let iteration = 0;
        let interval = null;

        const startScramble = () => {
            interval = setInterval(() => {
                textRef.current.innerText = targetText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return targetText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");

                if (iteration >= targetText.length) {
                    clearInterval(interval);
                    // Add a slight pause after text completion before fading out
                    gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 0.8,
                        delay: 0.5,
                        ease: "power2.inOut",
                        onComplete: onComplete
                    });
                }

                iteration += 1 / 3; // Controls the speed of the reveal
            }, 30);
        };
        setTimeout(startScramble, 500);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-black flex items-center justify-center text-white">
            <h1 ref={textRef} className="text-4xl md:text-6xl font-mono font-bold tracking-widest text-blue-500">
                X#@ $&%*
            </h1>
        </div>
    );
};

export default Loader;
