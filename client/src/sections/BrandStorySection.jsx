import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import FloatingParticles from '../components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

const BrandStorySection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom center",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(contentRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
            )
                .fromTo(cardRef.current,
                    { x: 50, opacity: 0, scale: 0.95 },
                    { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
                    "-=0.8"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden bg-white text-gray-900">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <FloatingParticles theme="light" />
            </div>

            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/60 blur-[120px] rounded-full pointer-events-none -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50/60 blur-[120px] rounded-full pointer-events-none -ml-32 -mb-32"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">

                    {/* Left Column: Narrative */}
                    <div ref={contentRef} className="space-y-8">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                Brand Story
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                                Capturing the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    Soul of Your Business
                                </span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                            <p>
                                At <span className="font-bold text-gray-900">AI Growth Exa</span>, we believe that a brand is more than just a logo or a color palette. It is the voice that speaks when you’re not in the room, the feeling you leave behind, and the promise you keep to your customers.
                            </p>
                            <p>
                                In a digital landscape drowned in noise, we help you find your frequency. We blend <span className="text-blue-700 font-bold">data-driven strategy</span> with <span className="text-purple-700 font-bold">creative brilliance</span> to build identities that don’t just fit in—they stand out and lead.
                            </p>
                        </div>

                        <div className="pt-6">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                                <Link to="/careers" className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    Start Your Transformation
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Feature Card */}
                    <div ref={cardRef} className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] opacity-30 blur-xl"></div>
                        <div className="relative bg-gray-900 text-white p-8 md:p-12 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-800">

                            {/* Card Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                            <h3 className="text-3xl font-bold mb-8 relative z-10">We don't just <br /> design logos.</h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">We Create Meaning</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Every pixel, every word, and every interaction is crafted to communicate your core values and vision.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">We Build Consistency</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            A unified brand experience across all channels that builds recognition and loyalty instantly.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">We Establish Trust</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Professional, polished, and purposeful design that makes your audience confident in choosing you.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <p className="text-gray-300 font-medium mb-3">
                                    Ready to grow with confidence?
                                </p>
                                <div className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    This is your next chapter.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BrandStorySection;
