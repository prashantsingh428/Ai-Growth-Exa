import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: "Defining Process",
        desc: "Establishing the framework and objectives",
        color: "text-blue-500",
        bg: "bg-blue-500",
        glow: "shadow-blue-200"
    },
    {
        title: "Meeting Preparation",
        desc: "Organizing and gathering necessary material",
        color: "text-emerald-500",
        bg: "bg-emerald-500",
        glow: "shadow-emerald-200"
    },
    {
        title: "Holding the Meeting",
        desc: "Conducting the meeting to discuss and strategize",
        color: "text-amber-500",
        bg: "bg-amber-500",
        glow: "shadow-amber-200"
    },
    {
        title: "The Follow Up",
        desc: "Reviewing outcomes and ensuring actions are taken",
        color: "text-purple-500",
        bg: "bg-purple-500",
        glow: "shadow-purple-200"
    },
    {
        title: "Maintaining Momentum",
        desc: "Continuously driving progress and engagement",
        color: "text-orange-500",
        bg: "bg-orange-500",
        glow: "shadow-orange-200"
    }
];

const FinalCtaSection = () => {
    const sectionRef = useRef(null);
    const nodesRef = useRef([]);
    const linesRef = useRef([]);
    const rocketRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate nodes one by one
            nodesRef.current.forEach((node, i) => {
                gsap.fromTo(node,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        delay: i * 0.2,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: node,
                            start: "top 85%",
                        }
                    }
                );
            });

            // Animate dashed lines
            linesRef.current.forEach((line, i) => {
                gsap.fromTo(line,
                    { width: 0, opacity: 0 },
                    {
                        width: "100%",
                        opacity: 1,
                        duration: 0.8,
                        delay: (i * 0.2) + 0.3,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: line,
                            start: "top 85%",
                        }
                    }
                );
            });

            // Rocket animation following the path
            gsap.fromTo(rocketRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    delay: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: rocketRef.current,
                        start: "top 90%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-50 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-50 blur-[120px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-12 sm:mb-14 md:mb-16 px-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-5 md:mb-6 tracking-tight leading-tight">
                        Ready to Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Smarter Growth System?</span>
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium">
                        Stop guessing. <span className="text-blue-600">Start scaling</span> with AI-powered strategies.
                    </p>
                </div>

                {/* Animated Process Flow */}
                <div className="relative mb-16 sm:mb-20 md:mb-24 py-8 sm:py-10 md:py-12 px-3 sm:px-4 bg-gray-50/50 rounded-2xl sm:rounded-3xl md:rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-4 relative">
                        {steps.map((step, i) => (
                            <React.Fragment key={i}>
                                <div
                                    ref={el => nodesRef.current[i] = el}
                                    className="flex flex-col items-center text-center relative z-20 w-full md:w-1/5"
                                >
                                    <div className={`w-16 h-16 rounded-3xl ${step.bg} shadow-lg ${step.glow} flex items-center justify-center mb-4 transform transition-transform hover:scale-110 hover:rotate-3 cursor-default`}>
                                        <div className="w-8 h-8 rounded-full border-4 border-white/30 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <h4 className={`text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 ${step.color}`}>{step.title}</h4>
                                    <p className="text-xs text-gray-500 font-medium max-w-[140px] sm:max-w-[150px]">{step.desc}</p>
                                </div>

                                {i < steps.length - 1 && (
                                    <div className="hidden md:block flex-1 h-[2px] relative top-[-24px]">
                                        <div
                                            ref={el => linesRef.current[i] = el}
                                            className="w-full h-full border-t-2 border-dashed border-gray-300 opacity-0"
                                        ></div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}

                        {/* Rocket Icon at the end */}
                        <div
                            ref={rocketRef}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 opacity-0 hidden md:block"
                        >
                            <div className="text-4xl animate-bounce">🚀</div>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center px-4">
                    <button className="group relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-base sm:text-lg md:text-xl rounded-full transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:-translate-y-1 flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap">
                        <span>🔘 Book Strategy Call</span>
                    </button>

                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <a
                            href="#"
                            className="flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-emerald-50 text-emerald-700 font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl hover:bg-emerald-100 transition-colors border border-emerald-100 whitespace-nowrap"
                        >
                            <span className="text-2xl">📲</span>
                            <span>WhatsApp Support</span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-blue-50 text-blue-700 font-bold text-sm sm:text-base rounded-xl sm:rounded-2xl hover:bg-blue-100 transition-colors border border-blue-100 whitespace-nowrap"
                        >
                            <span className="text-2xl">📅</span>
                            <span>Calendly Booking</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCtaSection;
