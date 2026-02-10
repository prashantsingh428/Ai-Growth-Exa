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
    };

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-10 transition-colors duration-500">
            {/* Background effects - Softened for Light Theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-transparent to-purple-50/10"></div>
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-400/5 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-400/5 rounded-full blur-[128px]"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left Side - Heading & Tagline */}
                    <div ref={leftRef} className="space-y-4">
                        <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-2">
                            <span className="text-blue-600 text-xs font-semibold uppercase">PERSONALIZED GROWTH PLAN</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Every brand is different.
                        </h2>

                        <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
                            Your growth plan should be too.
                        </p>

                        <p className="text-base text-gray-600 leading-relaxed max-w-xl pt-2">
                            Share your goals and challenges with us. We'll create a personalized AI-powered marketing plan
                            tailored to your brand's unique needs and objectives.
                        </p>

                        <div className="space-y-2 pt-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-gray-600">Free 30-minute strategy consultation</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-gray-600">Custom AI solution recommendation</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <p className="text-gray-600">No commitment required</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Lead Form */}
                    <div ref={formRef}>
                        <form onSubmit={handleSubmit} className="bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-xl">
                            <div className="space-y-3">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label htmlFor="phone" className="block text-xs font-bold text-gray-700 mb-1">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
                                        placeholder="john@company.com"
                                    />
                                </div>

                                {/* Company Name */}
                                <div>
                                    <label htmlFor="company" className="block text-xs font-bold text-gray-700 mb-1">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
                                        placeholder="Your Company Inc."
                                    />
                                </div>

                                {/* Industry */}
                                <div>
                                    <label htmlFor="industry" className="block text-xs font-bold text-gray-700 mb-1">
                                        Industry
                                    </label>
                                    <select
                                        id="industry"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
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
                                    <label htmlFor="services" className="block text-xs font-bold text-gray-700 mb-1">
                                        Services You're Looking For
                                    </label>
                                    <select
                                        id="services"
                                        name="services"
                                        value={formData.services}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
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
                                    <label htmlFor="budget" className="block text-xs font-bold text-gray-700 mb-1">
                                        Monthly Marketing Budget
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
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
                                    <label htmlFor="message" className="block text-xs font-bold text-gray-700 mb-1">
                                        Query / Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-medium text-sm"
                                        placeholder="What are your biggest marketing challenges?"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-base rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
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
