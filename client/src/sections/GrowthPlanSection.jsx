import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GrowthPlanSection = () => {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        industry: '',
        services: '',
        budget: '',
        message: ''
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left side animation
            gsap.fromTo(leftRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: leftRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Form animation
            gsap.fromTo(formRef.current,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 py-20">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-gray-950 to-purple-950/10"></div>
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-[128px]"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Heading & Tagline */}
                    <div ref={leftRef} className="space-y-6">
                        <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
                            <span className="text-blue-400 text-sm font-semibold">PERSONALIZED GROWTH PLAN</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                            Every brand is different.
                        </h2>

                        <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 leading-tight">
                            Your growth plan should be too.
                        </p>

                        <p className="text-xl text-gray-300 leading-relaxed max-w-xl pt-4">
                            Share your goals and challenges with us. We'll create a personalized AI-powered marketing plan
                            tailored to your brand's unique needs and objectives.
                        </p>

                        <div className="space-y-4 pt-6">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-gray-400">Free 30-minute strategy consultation</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-gray-400">Custom AI solution recommendation</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-gray-400">No commitment required</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Lead Form */}
                    <div ref={formRef}>
                        <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 shadow-xl">
                            <div className="space-y-5">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        placeholder="john@company.com"
                                    />
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label htmlFor="company" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        placeholder="Your Company Inc."
                                    />
                                </div>

                                {/* Industry */}
                                <div>
                                    <label htmlFor="industry" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Industry
                                    </label>
                                    <select
                                        id="industry"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    >
                                        <option value="">Select your industry</option>
                                        <option value="ecommerce">E-commerce</option>
                                        <option value="saas">SaaS / Technology</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="finance">Finance</option>
                                        <option value="realestate">Real Estate</option>
                                        <option value="education">Education</option>
                                        <option value="retail">Retail</option>
                                        <option value="consulting">Consulting</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Services You're Looking For */}
                                <div>
                                    <label htmlFor="services" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Services You're Looking For
                                    </label>
                                    <select
                                        id="services"
                                        name="services"
                                        value={formData.services}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    >
                                        <option value="">Select service</option>
                                        <option value="brand-identity">Brand Identity & Design</option>
                                        <option value="ai-marketing">AI-Powered Marketing</option>
                                        <option value="content-creation">Content Creation</option>
                                        <option value="social-media">Social Media Management</option>
                                        <option value="seo">SEO & Performance Marketing</option>
                                        <option value="automation">Marketing Automation</option>
                                        <option value="full-service">Full-Service Growth</option>
                                    </select>
                                </div>

                                {/* Monthly Marketing Budget */}
                                <div>
                                    <label htmlFor="budget" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Monthly Marketing Budget
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    >
                                        <option value="">Select your budget range</option>
                                        <option value="<5k">Less than $5,000</option>
                                        <option value="5k-10k">$5,000 - $10,000</option>
                                        <option value="10k-25k">$10,000 - $25,000</option>
                                        <option value="25k-50k">$25,000 - $50,000</option>
                                        <option value="50k+">$50,000+</option>
                                    </select>
                                </div>

                                {/* Query / Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Query / Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                                        placeholder="What are your biggest marketing challenges?"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50"
                                >
                                    Get My Personalized Growth Plan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default GrowthPlanSection;
