import React, { useState, useEffect, useRef } from 'react';

const StatCard = ({ number, suffix = '', label, delay }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            { threshold: 0.5 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            if (currentStep <= steps) {
                setCount(Math.floor(increment * currentStep));
            } else {
                setCount(number);
                clearInterval(timer);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isVisible, number]);

    return (
        <div
            ref={cardRef}
            className="flex-shrink-0 w-[320px] mx-3 overflow-hidden rounded-2xl p-8 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
            style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
            }}
        >
            <div className="text-center">
                <div className="mb-3 flex items-center justify-center gap-2">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-400"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-400"></div>
                </div>

                <div className="mb-4">
                    <span className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        {count.toLocaleString()}{suffix}
                    </span>
                </div>

                <p className="text-lg text-gray-300 font-medium tracking-wide">
                    {label}
                </p>
            </div>

            <div className="mt-6 h-1 w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        </div>
    );
};

const StatsSection = () => {
    const sectionRef = useRef(null);

    const heroStats = [
        { range: '3.8x – 6.2x', label: 'ROAS across paid campaigns', icon: '📈' },
        { range: 'Up to 42%', label: 'CPL Reduction using AI targeting', icon: '💰' },
        { range: '2x – 5x', label: 'Business Growth within 90–180 days', icon: '🚀' }
    ];

    const detailedStats = [
        { number: 5000, suffix: '+', label: 'Clients Served' },
        { number: 95, suffix: '%+', label: 'Happy Clients' },
        { number: 98, suffix: '%', label: 'Project Success Ratio' },
        { number: 1100, suffix: '+', label: 'SEO Projects Delivered' },
        { number: 571, suffix: '+', label: 'Websites Developed' },
        { number: 11, suffix: '+', label: 'Mobile Applications (Android & iOS)' },
        { number: 1557, suffix: '+', label: 'Google & Meta Ad Campaigns Managed' },
        { number: 750, suffix: '+', label: 'Social Media Campaigns (SMO)' },
        { number: 151, suffix: '+', label: 'LLM & AI Growth Implementations' }
    ];

    return (
        <section ref={sectionRef} className="relative py-24 bg-gray-950 overflow-hidden">
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-rotate-slow {
                    animation: rotate 20s linear infinite;
                }

                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }

                .animate-pulse-glow {
                    animation: pulse-glow 3s ease-in-out infinite;
                }

                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">

                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/30 to-purple-600/20 rounded-full blur-[150px] animate-pulse-glow"></div>
                <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-purple-600/30 to-pink-600/20 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '3s' }}></div>


                <div className="absolute top-20 left-[10%] w-24 h-24 border-2 border-blue-500/20 rounded-lg animate-float animate-rotate-slow"></div>
                <div className="absolute bottom-32 right-[15%] w-16 h-16 border-2 border-purple-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/3 right-[10%] w-20 h-20 border-2 border-pink-500/20 rounded-lg animate-float" style={{ animationDelay: '1s' }}></div>


                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
                        Real Numbers. <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Real Growth.</span>
                    </h2>


                    <div className="flex items-center justify-center gap-2 my-8">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {heroStats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-700 bg-gradient-to-br from-blue-900/20 to-purple-900/20"
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >

                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>

                            <div className="relative z-10 text-center">
                                <div className="text-4xl mb-4">{stat.icon}</div>
                                <div className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
                                    {stat.range}
                                </div>
                                <p className="text-gray-300 text-lg font-medium">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="text-center mb-16">
                    <p className="text-2xl md:text-3xl text-gray-300 font-light mb-2">
                        Because when <span className="font-bold text-white">AI meets strategy</span> —
                    </p>
                    <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        results follow.
                    </p>


                    <div className="flex items-center justify-center gap-2 mt-8 mb-12">
                        {[...Array(30)].map((_, i) => (
                            <div key={i} className="w-1 h-1 rounded-full bg-gray-700"></div>
                        ))}
                    </div>
                </div>


                <div className="text-center mb-12">
                    <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Our Growth in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Numbers</span>
                    </h3>
                    <p className="text-gray-400 text-lg">Scroll through our achievements</p>
                </div>


                <div className="relative overflow-hidden py-4">
                    <div className="flex animate-scroll">

                        {detailedStats.map((stat, index) => (
                            <StatCard
                                key={`first-${index}`}
                                number={stat.number}
                                suffix={stat.suffix}
                                label={stat.label}
                                delay={0}
                            />
                        ))}

                        {detailedStats.map((stat, index) => (
                            <StatCard
                                key={`second-${index}`}
                                number={stat.number}
                                suffix={stat.suffix}
                                label={stat.label}
                                delay={0}
                            />
                        ))}
                    </div>
                </div>


                <div className="mt-20 text-center">
                    <div className="inline-block relative">
                        <p className="text-gray-500 text-sm uppercase tracking-widest">
                            Trusted by Industry Leaders Worldwide
                        </p>
                        <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                    </div>
                </div>
            </div>


            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default StatsSection;
