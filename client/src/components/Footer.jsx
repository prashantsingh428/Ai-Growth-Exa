import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".footer-column",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const handleLinkHover = (e) => {
        gsap.to(e.target, { x: 5, color: "#3b82f6", duration: 0.3 });
    };

    const handleLinkLeave = (e) => {
        gsap.to(e.target, { x: 0, color: "#9ca3af", duration: 0.3 });
    };

    const socialLinks = [
        { name: "LinkedIn", url: "https://www.linkedin.com/company/ai-growthexa/about/?viewAsMember=true" },
        { name: "Instagram", url: "https://www.instagram.com/aigrowthexa/" },
        { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61586954705320" },
        { name: "YouTube", url: "https://www.youtube.com/@AIGrowthExa" },
        { name: "X (Twitter)", url: "https://x.com/aigrowthexa" },
    ];

    return (
        <footer ref={footerRef} className="bg-gray-900 text-gray-300 py-16 px-6 sm:px-12 lg:px-24 border-t border-gray-800 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Column 1: Structure */}
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2 relative inline-block">
                        Explore
                        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
                    </h3>
                    <ul className="space-y-2">
                        {["About Us", "Our Services", "Blog", "Careers", "About the Founder", "Industries We Serve", "Case Studies", "Contact Us"].map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="block transition-colors duration-300 text-gray-400"
                                    onMouseEnter={handleLinkHover}
                                    onMouseLeave={handleLinkLeave}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 2: Social Media */}
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2 relative inline-block">
                        Social Media
                        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
                    </h3>
                    <ul className="space-y-2">
                        {socialLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block transition-colors duration-300 text-gray-400 hover:text-blue-400"
                                    onMouseEnter={handleLinkHover}
                                    onMouseLeave={handleLinkLeave}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Legal */}
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2 relative inline-block">
                        Legal
                        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
                    </h3>
                    <ul className="space-y-2">
                        {["Terms & Conditions", "Privacy Policy", "Cookie Policy", "Copyright Policy"].map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="block transition-colors duration-300 text-gray-400"
                                    onMouseEnter={handleLinkHover}
                                    onMouseLeave={handleLinkLeave}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 4: Connect With Us (Lead Capture) */}
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2 relative inline-block">
                        Connect With Us
                        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
                    </h3>
                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Company Name"
                            className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                        <textarea
                            placeholder="Message"
                            rows="3"
                            className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-all duration-300 transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Ai Growth Exa. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
