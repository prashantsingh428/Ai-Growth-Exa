import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import gsap from 'gsap';

const Navbar = () => {
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef([]);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
        )
            .fromTo(logoRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5 },
                "-=0.4"
            )
            .fromTo(linksRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
                "-=0.3"
            );
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
    ];

    const addToRefs = (el) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800"
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
                {/* Left Section: Logo + Nav Links */}
                <div className="flex items-center gap-12">
                    {/* Logo */}
                    <Link to="/" ref={logoRef} className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent shrink-0">
                        AiGrowthExa
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={index}
                                to={link.path}
                                ref={addToRefs}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-gray-300'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Right Section: Search + CTA */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Search Bar */}
                    <div ref={addToRefs} className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-blue-400 transition-colors">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full p-2 pl-10 text-sm text-white bg-gray-800 border border-gray-700 rounded-full focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all w-32 focus:w-48"
                            placeholder="Search..."
                        />
                    </div>

                    {/* CTA Button */}
                    <div ref={addToRefs}>
                        <Link
                            to="/contact"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 whitespace-nowrap"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-300 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
