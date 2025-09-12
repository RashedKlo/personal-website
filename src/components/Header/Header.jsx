import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import PageTransition from '../Animation/PageTransition';

// Constants - moved outside component to prevent recreation
const NAVIGATION_LINKS = [
    { name: "Home", path: "/" },
    { name: "Resume", path: "/resume" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/work" },
    { name: "Contact", path: "/contact" }
];

// Animation variants - memoized to prevent recreation
const ANIMATION_VARIANTS = {
    header: {
        initial: { y: -100, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    },
    logo: {
        initial: { opacity: 0, x: -30 },
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    },
    navItem: {
        initial: { opacity: 0, y: -20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    },
    mobileMenu: {
        initial: { opacity: 0, scale: 0.95, y: -20 },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                staggerChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: -20,
            transition: { duration: 0.2, ease: "easeIn" }
        }
    }
};

// Memoized components to prevent unnecessary re-renders
const ModernNavLink = React.memo(({ link, isActive, onClick, index }) => {
    const handleClick = useCallback(() => onClick(link.path), [onClick, link.path]);

    return (
        <motion.div
            className="relative group"
            variants={ANIMATION_VARIANTS.navItem}
            custom={index}
        >
            <motion.button
                onClick={handleClick}
                className={`
                    relative px-6 py-3 text-sm font-medium transition-all duration-500 rounded-full overflow-hidden
                    ${isActive
                        ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30'
                        : 'text-slate-300 hover:text-white'
                    }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
            >
                <span className="relative z-10 flex items-center gap-2">
                    {link.name}
                    {isActive && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    )}
                </span>

                {!isActive && (
                    <motion.div
                        className="absolute inset-0 bg-slate-800/60 backdrop-blur-sm rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                )}
            </motion.button>
        </motion.div>
    );
});

const PremiumCTAButton = React.memo(({ onClick }) => (
    <motion.div
        variants={ANIMATION_VARIANTS.navItem}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <motion.button
            onClick={onClick}
            className="relative px-8 py-3 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-full overflow-hidden group shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-500"
        >
            <span className="relative z-10 flex items-center gap-2">
                Let's Talk
                <FiArrowUpRight size={14} />
            </span>

            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
            />
        </motion.button>
    </motion.div>
));

const EnhancedDesktopNavigation = React.memo(({ activeLink, onLinkClick, onCTAClick }) => (
    <motion.div
        className="hidden lg:flex items-center"
        variants={ANIMATION_VARIANTS.header}
    >
        <motion.nav
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/40 backdrop-blur-xl rounded-full border border-slate-700/30 shadow-2xl shadow-slate-900/20"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            {NAVIGATION_LINKS.map((link, index) => (
                <ModernNavLink
                    key={link.name}
                    link={link}
                    isActive={activeLink === link.path}
                    onClick={onLinkClick}
                    index={index}
                />
            ))}
        </motion.nav>

        <motion.div
            className="ml-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
        >
            <PremiumCTAButton onClick={onCTAClick} />
        </motion.div>
    </motion.div>
));

const MobileToggle = React.memo(({ isOpen, onToggle }) => (
    <motion.button
        onClick={onToggle}
        className="lg:hidden w-12 h-12 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={ANIMATION_VARIANTS.navItem}
    >
        <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
        >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </motion.div>
    </motion.button>
));

const MobileNavigation = React.memo(({ isOpen, activeLink, onLinkClick, onCTAClick, onClose }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div
                    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />

                <motion.div
                    className="fixed top-24 right-4 left-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl z-50 lg:hidden overflow-hidden"
                    variants={ANIMATION_VARIANTS.mobileMenu}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div className="p-6">
                        <nav className="space-y-2">
                            {NAVIGATION_LINKS.map((link, index) => (
                                <MobileNavItem
                                    key={link.name}
                                    link={link}
                                    isActive={activeLink === link.path}
                                    onClick={onLinkClick}
                                    onClose={onClose}
                                    index={index}
                                />
                            ))}
                        </nav>

                        <motion.div
                            className="mt-8 pt-6 border-t border-slate-700/50"
                            variants={ANIMATION_VARIANTS.navItem}
                        >
                            <motion.button
                                onClick={() => {
                                    onCTAClick();
                                    onClose();
                                }}
                                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Let's Talk
                                <FiArrowUpRight size={16} />
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
));

const MobileNavItem = React.memo(({ link, isActive, onClick, onClose, index }) => {
    const handleClick = useCallback(() => {
        onClick(link.path);
        onClose();
    }, [onClick, onClose, link.path]);

    return (
        <motion.div
            variants={ANIMATION_VARIANTS.navItem}
            custom={index}
        >
            <motion.button
                onClick={handleClick}
                className={`
                    w-full text-left px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 flex items-center justify-between group
                    ${isActive
                        ? 'bg-gradient-to-r from-blue-500/20 to-indigo-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }
                `}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
            >
                <span>{link.name}</span>
                {isActive && (
                    <motion.div
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                    />
                )}
            </motion.button>
        </motion.div>
    );
});

// Main Header Component
const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Use location.pathname instead of state for active link
    const activeLink = location.pathname;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showPageTransition, setShowPageTransition] = useState(false);

    // Optimized scroll handler with throttling
    const handleScroll = useCallback(() => {
        const scrolled = window.scrollY > 20;
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
        }
    }, [isScrolled]);

    useEffect(() => {
        let timeoutId;
        const throttledHandleScroll = () => {
            if (timeoutId) return;
            timeoutId = setTimeout(() => {
                handleScroll();
                timeoutId = null;
            }, 16); // ~60fps
        };

        window.addEventListener('scroll', throttledHandleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [handleScroll]);

    // Memoized handlers to prevent child re-renders
    const handleLinkClick = useCallback((path) => {
        if (path !== activeLink) {
            setShowPageTransition(true);
            navigate(path);

            const timer = setTimeout(() => {
                setShowPageTransition(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [navigate, activeLink]);

    const handleCTAClick = useCallback(() => {
        handleLinkClick('/contact');
    }, [handleLinkClick]);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    // Handle escape key
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen]);

    // Memoized header classes
    const headerClasses = useMemo(() => `
        fixed top-0 left-0 right-0 z-30 transition-all duration-700
        ${isScrolled
            ? 'bg-slate-900/80 backdrop-blur-2xl border-b border-slate-700/30 shadow-xl shadow-slate-900/10'
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
        }
    `, [isScrolled]);

    return (
        <div className='bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'>
            <motion.header
                className={headerClasses}
                variants={ANIMATION_VARIANTS.header}
                initial="initial"
                animate="animate"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-18 lg:h-22">
                        {/* Logo */}
                        <motion.div
                            variants={ANIMATION_VARIANTS.logo}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center justify-center lg:justify-start gap-3"
                        >
                            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-blue-400 to-transparent" />
                            <span className="text-blue-400 font-medium tracking-wider uppercase text-xs sm:text-sm">Welcome</span>
                        </motion.div>

                        {/* Enhanced Desktop Navigation */}
                        <EnhancedDesktopNavigation
                            activeLink={activeLink}
                            onLinkClick={handleLinkClick}
                            onCTAClick={handleCTAClick}
                        />

                        {/* Mobile Toggle */}
                        <MobileToggle
                            isOpen={isMobileMenuOpen}
                            onToggle={toggleMobileMenu}
                        />
                    </div>
                </div>
            </motion.header>

            {/* Mobile Navigation */}
            <MobileNavigation
                isOpen={isMobileMenuOpen}
                activeLink={activeLink}
                onLinkClick={handleLinkClick}
                onCTAClick={handleCTAClick}
                onClose={closeMobileMenu}
            />

            {/* Spacer for fixed header */}
            <div className="h-18 lg:h-22" />

            <PageTransition isVisible={showPageTransition} />
        </div>
    );
};

export default Header;