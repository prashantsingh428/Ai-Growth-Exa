import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import api from '../api/api';
import logo from '../assets/images/site/AI_Growth_Exa_logo_designs22-removebg-preview.png';
import { FaTimes, FaBars } from 'react-icons/fa';
import AuthModal from './Modals/AuthModal';

const Navbar = () => {
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef([]);
    const mobileMenuRef = useRef(null);
    const mobileLinksRef = useRef([]);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [navbarSearch, setNavbarSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalView, setAuthModalView] = useState('login');
    const location = useLocation();

    const openAuthModal = (view) => {
        setAuthModalView(view);
        setIsAuthModalOpen(true);
        setIsMenuOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Live search logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (navbarSearch.trim().length > 1) {
                try {
                    setIsSearching(true);
                    const response = await api.get(`/services/search?q=${navbarSearch}`);
                    if (response.data.success) {
                        setSearchResults(response.data.data);
                        setShowDropdown(true);
                    }
                } catch (error) {
                    console.error("Navbar search error:", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [navbarSearch]);

    const handleResultClick = (service) => {
        navigate(`/services?q=${encodeURIComponent(service.title)}`);
        setNavbarSearch('');
        setShowDropdown(false);
    };

    // Close menu when route changes
    useEffect(() => {
        if (isMenuOpen) {
            toggleMenu();
        }
    }, [location]);

    useEffect(() => {
        if (!navRef.current || !logoRef.current || linksRef.current.length === 0) return;

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

    useEffect(() => {
        if (isMenuOpen) {
            // Animate menu in
            gsap.fromTo(mobileMenuRef.current,
                { height: 0, opacity: 0 },
                { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        if (isMenuOpen) {
            // Animate out before setting state is tricky with simple state,
            // but for a snappy feel we can just toggle.
            // If we really want exit animation we need to keep it mounted.
            // For now, let's keep it simple as requested.
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        {
            name: 'About',
            path: '/about',
            dropdown: [
                { name: 'About Us', path: '/about' },
                { name: 'About The Founder', path: '/founder' },
                { name: 'Awards & Recognition', path: '/awards' }
            ]
        },
        { name: 'Services', path: '/services' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
    ];

    const [openDropdown, setOpenDropdown] = useState(null);

    const addToRefs = (el) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">

                <div className="flex items-center gap-12">
                    {/* Logo */}
                    <Link to="/" ref={logoRef} className="shrink-0">
                        <img src={logo} alt="Ai Growth Exa" className="h-10 md:h-12 w-auto object-contain" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {link.dropdown ? (
                                    <button
                                        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname.startsWith('/about') || location.pathname === '/awards' ? 'text-blue-400' : 'text-gray-300'
                                            }`}
                                    >
                                        {link.name}
                                        <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                ) : (
                                    <NavLink
                                        to={link.path}
                                        ref={addToRefs}
                                        className={({ isActive }) =>
                                            `text-sm font-medium transition-colors hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-gray-300'}`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                )}

                                {link.dropdown && (
                                    <div className={`absolute top-full left-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 transition-all duration-200 ${openDropdown === link.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                        }`}>
                                        {link.dropdown.map((subItem, subIdx) => (
                                            <Link
                                                key={subIdx}
                                                to={subItem.path}
                                                className={`block px-4 py-2 text-sm transition-colors hover:bg-blue-600/10 hover:text-blue-400 ${location.pathname === subItem.path ? 'text-blue-400 bg-blue-600/5' : 'text-gray-300'
                                                    }`}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div ref={addToRefs} className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-blue-400 transition-colors">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={navbarSearch}
                            onChange={(e) => setNavbarSearch(e.target.value)}
                            onFocus={() => navbarSearch.trim().length > 1 && setShowDropdown(true)}
                            className="block w-full p-2 pl-10 text-sm text-white bg-gray-800 border border-gray-700 rounded-full focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all w-32 focus:w-48"
                            placeholder="Search services..."
                        />

                        {/* Search Results Dropdown */}
                        {showDropdown && (
                            <div
                                ref={dropdownRef}
                                className="absolute top-full right-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-[60]"
                            >
                                {isSearching ? (
                                    <div className="p-4 text-center text-gray-400 text-sm">
                                        Searching...
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="max-h-80 overflow-y-auto">
                                        {searchResults.map((service, index) => (
                                            <button
                                                key={service._id || index}
                                                onClick={() => handleResultClick(service)}
                                                className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors border-b border-gray-800 last:border-0"
                                            >
                                                <div className="text-sm font-semibold text-white truncate">
                                                    {service.title}
                                                </div>
                                                <div className="text-xs text-blue-400 font-medium">
                                                    {service.category}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-gray-400 text-sm">
                                        No results found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">


                        <div ref={addToRefs}>
                            <button
                                onClick={() => openAuthModal('register')}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-500/20"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-300 focus:outline-none p-2"
                >
                    {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </button>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="absolute top-full left-0 w-full bg-gray-900 border-b border-gray-800 shadow-xl md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-1">
                            {navLinks.map((link, index) => (
                                <div key={index}>
                                    {link.dropdown ? (
                                        <>
                                            <button
                                                onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg text-base font-medium transition-colors"
                                            >
                                                {link.name}
                                                <svg className={`w-4 h-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {openDropdown === link.name && (
                                                <div className="bg-gray-800/50 rounded-lg mt-1 space-y-1">
                                                    {link.dropdown.map((subItem, subIdx) => (
                                                        <Link
                                                            key={subIdx}
                                                            to={subItem.path}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className={`block px-8 py-2.5 text-sm transition-colors ${location.pathname === subItem.path ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                                                                }`}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <NavLink
                                            to={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={({ isActive }) =>
                                                `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive
                                                    ? 'bg-blue-600/10 text-blue-400'
                                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                }`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    )}
                                </div>
                            ))}

                            <div className="pt-2 mt-2 border-t border-gray-800">

                                <button
                                    onClick={() => openAuthModal('register')}
                                    className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-base font-medium transition-colors"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialView={authModalView}
            />
        </nav>
    );
};

export default Navbar;
