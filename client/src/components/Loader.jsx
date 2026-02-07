import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const [phase, setPhase] = useState(1);
    const introRef = useRef(null);
    const mainTextRef = useRef(null);
    const containerRef = useRef(null);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    const introText = "Introducing AI GrowthExa to Modern Marketer";
    const mainText = "AI GROWTH EXA";

    useEffect(() => {
        if (phase === 1) {
            let currentText = "";
            let charIndex = 0;

            const typeInterval = setInterval(() => {
                if (charIndex < introText.length) {
                    currentText += introText[charIndex];
                    if (introRef.current) {
                        introRef.current.innerText = currentText;
                    }
                    charIndex++;
                } else {
                    clearInterval(typeInterval);

                    gsap.to(introRef.current, {
                        opacity: 0,
                        y: -20,
                        duration: 0.6,
                        delay: 0.8,
                        ease: "power2.in",
                        onComplete: () => setPhase(2)
                    });
                }
            }, 50);

            gsap.fromTo(introRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8 }
            );

            return () => clearInterval(typeInterval);
        }

        if (phase === 2) {
            let iteration = 0;
            let interval = null;

            const startScramble = () => {
                interval = setInterval(() => {
                    if (mainTextRef.current) {
                        mainTextRef.current.innerText = mainText
                            .split("")
                            .map((letter, index) => {
                                if (index < iteration) {
                                    return mainText[index];
                                }
                                return chars[Math.floor(Math.random() * chars.length)];
                            })
                            .join("");
                    }

                    if (iteration >= mainText.length) {
                        clearInterval(interval);

                        gsap.to(containerRef.current, {
                            yPercent: -100,
                            duration: 0.8,
                            delay: 0.8,
                            ease: "power2.inOut",
                            onComplete: onComplete
                        });
                    }

                    iteration += 1 / 3;
                }, 30);
            };

            gsap.fromTo(mainTextRef.current,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    delay: 0.2,
                    onComplete: startScramble
                }
            );

            return () => clearInterval(interval);
        }
    }, [phase, onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-gradient-to-br from-[#030712] via-[#0a1628] to-[#030712] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            {phase === 1 && (
                <div className="relative z-10 text-center px-6">
                    <p
                        ref={introRef}
                        className="text-xl md:text-3xl font-semibold text-blue-400 tracking-wide"
                        style={{
                            textShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
                        }}
                    >
                    </p>
                </div>
            )}

            {phase === 2 && (
                <div className="relative z-10 text-center">
                    <h1
                        ref={mainTextRef}
                        className="text-5xl md:text-7xl font-mono font-bold tracking-widest bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                        style={{
                            filter: 'drop-shadow(0 0 40px rgba(147, 51, 234, 0.6))',
                        }}
                    >
                        X#@ $&%*
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Loader;
