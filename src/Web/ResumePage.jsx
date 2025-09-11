import React, { Suspense, useState, memo, useMemo, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdSchool } from "react-icons/io";
import { BsBriefcase, BsCodeSlash, BsPerson } from "react-icons/bs";

// Lazy loaded components with better chunking
const BackgroundElements = lazy(() => import("../features/Home/components/BackgroundElements"));
const TabButton = lazy(() => import("../features/Resume/components/TabButton"));
const SocialLinks = lazy(() => import("../features/Resume/components/SocialLinks"));
const TabContent = lazy(() => import("../features/Resume/components/TabContent"));

// ==================== Loading Skeletons ====================
const PageLoadingSkeleton = memo(() => (
    <div className="min-h-screen bg-slate-900">
        <div className="absolute inset-0 bg-slate-800/20"></div>
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="text-center mb-16 animate-pulse">
                    <div className="h-16 bg-slate-700/30 rounded-lg w-1/2 mx-auto mb-6"></div>
                    <div className="h-6 bg-slate-700/30 rounded w-2/3 mx-auto mb-2"></div>
                    <div className="h-6 bg-slate-700/30 rounded w-1/2 mx-auto"></div>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Sidebar Skeleton */}
                    <div className="xl:w-80">
                        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30 animate-pulse">
                            <div className="flex flex-row xl:flex-col gap-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-12 bg-slate-700/30 rounded-xl flex-1 xl:flex-none"></div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-700/30 hidden xl:block">
                                <div className="h-6 bg-slate-700/30 rounded w-1/2 mb-4"></div>
                                <div className="flex gap-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-12 h-12 bg-slate-700/30 rounded-xl"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="flex-1 animate-pulse">
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="h-6 bg-slate-700/30 rounded w-2/3 mb-2"></div>
                                            <div className="h-4 bg-slate-700/30 rounded w-1/2"></div>
                                        </div>
                                        <div className="w-20 h-8 bg-slate-700/30 rounded-full"></div>
                                    </div>
                                    <div className="h-4 bg-slate-700/30 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-slate-700/30 rounded w-4/5"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

const TabButtonSkeleton = memo(() => (
    <div className="h-12 bg-slate-700/30 rounded-xl animate-pulse flex-1 xl:flex-none"></div>
));

const SocialLinksSkeleton = memo(() => (
    <div className="flex gap-4 animate-pulse">
        {[1, 2, 3].map(i => (
            <div key={i} className="w-12 h-12 bg-slate-700/30 rounded-xl"></div>
        ))}
    </div>
));

const TabContentSkeleton = memo(() => (
    <div className="space-y-6 animate-pulse">
        {[1, 2, 3].map(i => (
            <div key={i} className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="h-6 bg-slate-700/30 rounded w-2/3 mb-2"></div>
                        <div className="h-4 bg-slate-700/30 rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-8 bg-slate-700/30 rounded-full"></div>
                </div>
                <div className="h-4 bg-slate-700/30 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-700/30 rounded w-4/5"></div>
            </div>
        ))}
    </div>
));

// ==================== Memoized Components ====================
const ResumeHeader = memo(() => (
    <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-16"
    >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            My <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Resume</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore my professional journey, skills, and experience in web development and design
        </p>
    </motion.div>
));

const NavigationSidebar = memo(({ activeTab, setActiveTab, TAB_CONFIG }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="xl:w-80"
    >
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-8">
            <div className="flex flex-row xl:flex-col gap-3 justify-center overflow-x-auto xl:overflow-visible pb-2 xl:pb-0">
                {TAB_CONFIG.map(({ id, label, icon }) => (
                    <Suspense key={id} fallback={<TabButtonSkeleton />}>
                        <TabButton
                            active={activeTab === id}
                            value={id}
                            onClick={setActiveTab}
                            icon={icon}
                        >
                            {label}
                        </TabButton>
                    </Suspense>
                ))}
            </div>

            {/* Social Links - Desktop */}
            <div className="mt-8 pt-6 border-t border-white/10 hidden xl:block">
                <h3 className="text-white font-semibold mb-4">Connect with me</h3>
                <Suspense fallback={<SocialLinksSkeleton />}>
                    <SocialLinks />
                </Suspense>
            </div>
        </div>
    </motion.div>
));

const MainContent = memo(({ activeTab, ANIMATION_VARIANTS }) => (
    <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex-1"
    >
        <AnimatePresence mode="wait">
            <Suspense key={`${activeTab}-content`} fallback={<TabContentSkeleton />}>
                <TabContent
                    key={activeTab}
                    activeTab={activeTab}
                    ANIMATION_VARIANTS={ANIMATION_VARIANTS}
                />
            </Suspense>
        </AnimatePresence>
    </motion.div>
));

const MobileSocialLinks = memo(() => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 xl:hidden"
    >
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <h3 className="text-white font-semibold mb-6">Connect with me</h3>
            <Suspense fallback={<SocialLinksSkeleton />}>
                <SocialLinks className="justify-center" />
            </Suspense>
        </div>
    </motion.div>
));

// ==================== Main Component ====================
const ResumePage = memo(() => {
    const [activeTab, setActiveTab] = useState("experience");

    // Memoize constants to prevent recreation
    const ANIMATION_VARIANTS = useMemo(() => ({
        tabContent: {
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 20 }
        },
        card: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
        },
        fadeIn: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }
    }), []);

    const TAB_CONFIG = useMemo(() => [
        { id: "experience", label: "Experience", icon: BsBriefcase },
        { id: "education", label: "Education", icon: IoMdSchool },
        { id: "skills", label: "Skills", icon: BsCodeSlash },
        { id: "about", label: "About Me", icon: BsPerson }
    ], []);

    return (
        <Suspense fallback={<PageLoadingSkeleton />}>
            <div className="min-h-screen bg-slate-900">
                <Suspense fallback={<div className="absolute inset-0 bg-slate-800/20"></div>}>
                    <BackgroundElements />
                </Suspense>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8"
                >
                    <div className="relative z-10 max-w-7xl mx-auto">
                        <ResumeHeader />

                        <div className="flex flex-col xl:flex-row gap-8">
                            <NavigationSidebar
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                TAB_CONFIG={TAB_CONFIG}
                            />
                            <MainContent
                                activeTab={activeTab}
                                ANIMATION_VARIANTS={ANIMATION_VARIANTS}
                            />
                        </div>

                        <MobileSocialLinks />
                    </div>
                </motion.div>
            </div>
        </Suspense>
    );
});

// Set display names for debugging
ResumePage.displayName = 'ResumePage';
PageLoadingSkeleton.displayName = 'PageLoadingSkeleton';
TabButtonSkeleton.displayName = 'TabButtonSkeleton';
SocialLinksSkeleton.displayName = 'SocialLinksSkeleton';
TabContentSkeleton.displayName = 'TabContentSkeleton';
ResumeHeader.displayName = 'ResumeHeader';
NavigationSidebar.displayName = 'NavigationSidebar';
MainContent.displayName = 'MainContent';
MobileSocialLinks.displayName = 'MobileSocialLinks';

export default ResumePage;