import React, { useState, useCallback, useMemo, Suspense, useEffect, lazy } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import { useLocation, useNavigate } from "react-router-dom";
import { BsGithub, BsEye, BsStar } from "react-icons/bs";

// Lazy load components with better splitting
const BackgroundEffects = lazy(() => import("../features/Work/components/BackgroundEffects"));
const TechStack = lazy(() => import("../features/Work/components/TechStack"));
const ProjectNavigation = lazy(() => import("../features/Work/components/ProjectNavigation"));
const OptimizedImage = lazy(() => import("../components/OptimizedImage"));
const ActionButton = lazy(() => import("../features/Work/components/ActionButton"));

// Constants - moved outside to prevent recreation
const PROJECTS_DATA = [
    {
        id: 1,
        num: "01",
        category: "Full Stack",
        title: "E-commerce Online Store and Management Dashboard",
        description: "A comprehensive e-commerce platform with customer-facing website and admin dashboard. Features secure user authentication with Google login using JWT tokens, product browsing, shopping cart, and order management system.",
        stack: ["React.js", "Tailwind CSS", "ASP.NET Core", "C#", "ADO.NET", "SQL Server", "JWT"],
        thumbnail: "/thumbnails/E-com-thumbnail.png",
        image: "/thumbnails/E-com-thumbnail.png",
        live: "#",
        github: "#",
        featured: true,
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        num: "02",
        category: "Full Stack",
        title: "Hand Note - Social Media Platform",
        description: "A Facebook-inspired social media platform enabling users to create profiles, post updates, comment and like content. Built with user authentication and state management for smooth navigation and enhanced user experience.",
        stack: ["React.js", "Material-UI", "ASP.NET Core", "C#", "RESTful APIs", "SQL Server"],
        thumbnail: "",
        image: "",
        live: "#",
        github: "#",
        featured: true,
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        num: "03",
        category: "Full Stack",
        title: "Bank Management Dashboard",
        description: "A comprehensive bank management system with features to add, update, and delete customer and account records. Built with dynamic and responsive frontend and secure backend using RESTful API architecture.",
        stack: ["HTML5", "CSS3", "JavaScript", "C#", "RESTful APIs", "ADO.NET", "SQL Server"],
        thumbnail: "",
        image: "",
        live: "#",
        github: "#",
        featured: false,
        color: "from-emerald-500 to-teal-500"
    },
    {
        id: 4,
        num: "04",
        category: "Desktop App",
        title: "Driver and Vehicle Licensing System",
        description: "A desktop application for managing driver and vehicle licenses with secure database integration. Features organized code logic into class libraries enabling easy rebuilding for web or mobile applications.",
        stack: [".NET Framework", "C#", "SQL Server", "Windows Forms", "3-Tier Architecture"],
        thumbnail: "",
        image: "",
        github: "#",
        featured: false,
        color: "from-orange-500 to-red-500"
    }
];

// Pre-calculated values
const TOTAL_PROJECTS = PROJECTS_DATA.length;
const PROJECTS_MAP = new Map(PROJECTS_DATA.map(p => [p.id, p]));

// Optimized loading components
const LoadingSpinner = React.memo(() => (
    <div className="flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
));

const BackgroundFallback = React.memo(() => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
    </div>
));

// Memoized animation variants factory
const createAnimationVariants = (prefersReducedMotion) => ({
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
                delayChildren: prefersReducedMotion ? 0 : 0.2,
            },
        },
    },
    item: {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0.2 : 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        },
    }
});

// Memoized project slide component
const ProjectSlide = React.memo(({ project, prefersReducedMotion }) => (
    <motion.div
        className="relative w-full h-full group cursor-pointer"
        whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
        transition={{ duration: 0.4 }}
    >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Featured Badge */}
        {project.featured && (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 z-20 flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-yellow-400/90 to-orange-500/90 text-white text-xs md:text-sm font-semibold rounded-full backdrop-blur-sm border border-white/20"
            >
                <BsStar className="text-xs" />
                <span className="hidden xs:inline">Featured</span>
            </motion.div>
        )}

        {/* Project Image */}
        <Suspense fallback={
            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        }>
            <OptimizedImage
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
            />
        </Suspense>

        {/* Hover Content */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <h3 className="text-white font-bold text-base sm:text-lg md:text-xl mb-1 md:mb-2">{project.title}</h3>
            <p className="text-slate-200 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                {project.description}
            </p>
        </div>
    </motion.div>
));

// Memoized pagination dots
const PaginationDots = React.memo(({ currentIndex, currentProject, onSlideClick, prefersReducedMotion }) => (
    <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-8">
        {PROJECTS_DATA.map((_, index) => (
            <motion.button
                key={index}
                onClick={() => onSlideClick(index)}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.2 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${index === currentIndex
                    ? `bg-gradient-to-r ${currentProject.color} shadow-lg shadow-blue-500/30`
                    : 'bg-white/30 hover:bg-white/50'
                    }`}
                aria-label={`Go to project ${index + 1}`}
            />
        ))}
    </div>
));

// Main WorkPage component
const WorkPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const prefersReducedMotion = useReducedMotion();

    // Optimized URL parameter parsing
    const { projectIdFromUrl, initialProject } = useMemo(() => {
        const urlParams = new URLSearchParams(location.search);
        const projectIdFromUrl = urlParams.get('project');
        const initialProject = projectIdFromUrl
            ? PROJECTS_MAP.get(parseInt(projectIdFromUrl)) || PROJECTS_DATA[0]
            : PROJECTS_DATA[0];

        return { projectIdFromUrl, initialProject };
    }, [location.search]);

    const [currentProject, setCurrentProject] = useState(initialProject);
    const [swiperRef, setSwiperRef] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Memoized animation variants
    const variants = useMemo(() => createAnimationVariants(prefersReducedMotion), [prefersReducedMotion]);

    // Optimized current index calculation
    const currentIndex = useMemo(() =>
        PROJECTS_DATA.findIndex(p => p.id === currentProject.id),
        [currentProject.id]
    );

    // Memoized motion props
    const motionProps = useMemo(() => ({
        main: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: prefersReducedMotion ? 0.2 : 0.8, ease: "easeOut" }
        },
        header: {
            initial: { opacity: 0, y: prefersReducedMotion ? 0 : -30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: prefersReducedMotion ? 0.2 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }
        },
        slider: {
            initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: prefersReducedMotion ? 0.2 : 0.8, delay: prefersReducedMotion ? 0 : 0.4 }
        }
    }), [prefersReducedMotion]);

    // Optimized handlers
    const handleSlideChange = useCallback((swiper) => {
        const currentIndex = swiper.activeIndex;
        const newProject = PROJECTS_DATA[currentIndex];

        setCurrentProject(newProject);
        navigate(`/work?project=${newProject.id}`, { replace: true });

        // Optimized loading state
        setIsLoading(true);
        requestAnimationFrame(() => {
            setTimeout(() => setIsLoading(false), 50);
        });
    }, [navigate]);

    const goToPrevSlide = useCallback(() => swiperRef?.slidePrev(), [swiperRef]);
    const goToNextSlide = useCallback(() => swiperRef?.slideNext(), [swiperRef]);
    const goToSlide = useCallback((index) => swiperRef?.slideTo(index), [swiperRef]);

    // Effect for URL parameter changes
    useEffect(() => {
        if (projectIdFromUrl && swiperRef) {
            const projectIndex = PROJECTS_DATA.findIndex(p => p.id.toString() === projectIdFromUrl);
            if (projectIndex !== -1 && projectIndex !== swiperRef.activeIndex) {
                swiperRef.slideTo(projectIndex);
            }
        }
    }, [projectIdFromUrl, swiperRef]);

    return (
        <div className="min-h-screen overflow-hidden">
            <Suspense fallback={<BackgroundFallback />}>
                <BackgroundEffects />
            </Suspense>

            <motion.main {...motionProps.main} className="relative z-10">
                {/* Header Section */}
                <header className="text-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-6 sm:pb-8 md:pb-12 px-4">
                    <motion.div {...motionProps.header}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                            My{" "}
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentProject.color} transition-all duration-500`}>
                                Work
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
                            Explore my latest projects showcasing modern web development and innovative solutions
                        </p>
                    </motion.div>
                </header>

                {/* Main Content */}
                <section className="px-4 pb-12 sm:pb-16 md:pb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">

                            {/* Project Slider */}
                            <motion.div {...motionProps.slider} className="order-1 lg:order-2 relative">
                                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-500/10 border border-white/10">

                                    {/* Loading Overlay */}
                                    <AnimatePresence>
                                        {isLoading && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 flex items-center justify-center"
                                            >
                                                <LoadingSpinner />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <Swiper
                                        onSwiper={(swiper) => {
                                            setSwiperRef(swiper);
                                            const projectIndex = PROJECTS_DATA.findIndex(p => p.id === initialProject.id);
                                            if (projectIndex !== -1) {
                                                setTimeout(() => swiper.slideTo(projectIndex, 0), 100);
                                            }
                                        }}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        modules={[Navigation, Pagination, EffectFade]}
                                        effect="fade"
                                        fadeEffect={{ crossFade: true }}
                                        lazy={{ loadPrevNext: true, loadPrevNextAmount: 1 }}
                                        onSlideChange={handleSlideChange}
                                        className="aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] lg:aspect-[4/3] xl:aspect-[3/2]"
                                        grabCursor
                                        speed={400}
                                        watchSlidesProgress
                                        preloadImages={false}
                                    >
                                        {PROJECTS_DATA.map((project) => (
                                            <SwiperSlide key={project.id}>
                                                <ProjectSlide
                                                    project={project}
                                                    prefersReducedMotion={prefersReducedMotion}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Navigation Controls */}
                                    <Suspense fallback={null}>
                                        <ProjectNavigation
                                            onPrev={goToPrevSlide}
                                            onNext={goToNextSlide}
                                            className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 z-30"
                                        />
                                    </Suspense>

                                    {/* Project Counter */}
                                    <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 z-20 px-2 py-1 md:px-3 md:py-1.5 bg-black/50 backdrop-blur-md text-white text-xs md:text-sm rounded-full border border-white/20 font-mono">
                                        {currentProject.num} / {TOTAL_PROJECTS.toString().padStart(2, '0')}
                                    </div>
                                </div>

                                {/* Pagination Dots */}
                                <PaginationDots
                                    currentIndex={currentIndex}
                                    currentProject={currentProject}
                                    onSlideClick={goToSlide}
                                    prefersReducedMotion={prefersReducedMotion}
                                />
                            </motion.div>

                            {/* Project Details */}
                            <motion.div
                                variants={variants.container}
                                initial="hidden"
                                animate="visible"
                                className="order-2 lg:order-1"
                            >
                                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl">

                                    {/* Project Number */}
                                    <motion.div
                                        key={`number-${currentProject.id}`}
                                        variants={variants.item}
                                        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${currentProject.color} mb-4 sm:mb-6 md:mb-8 transition-all duration-500`}
                                    >
                                        {currentProject.num}
                                    </motion.div>

                                    {/* Category & Title */}
                                    <motion.div
                                        key={`title-${currentProject.id}`}
                                        variants={variants.item}
                                        className="mb-4 sm:mb-6 md:mb-8"
                                    >
                                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                            <span className={`inline-flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r ${currentProject.color} bg-opacity-20 text-white text-xs sm:text-sm font-semibold rounded-full border border-white/30`}>
                                                {currentProject.featured && <BsStar className="text-yellow-400 text-xs md:text-sm" />}
                                                {currentProject.category}
                                            </span>
                                        </div>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                                            {currentProject.title}
                                        </h2>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.p
                                        key={`desc-${currentProject.id}`}
                                        variants={variants.item}
                                        className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-10"
                                    >
                                        {currentProject.description}
                                    </motion.p>

                                    {/* Tech Stack */}
                                    <motion.div
                                        key={`stack-${currentProject.id}`}
                                        variants={variants.item}
                                        className="mb-6 sm:mb-8 md:mb-10"
                                    >
                                        <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                                            Technologies Used:
                                        </h4>
                                        <Suspense fallback={<LoadingSpinner />}>
                                            <TechStack stack={currentProject.stack} projectId={currentProject.id} />
                                        </Suspense>
                                    </motion.div>

                                    {/* Divider */}
                                    <motion.div
                                        variants={variants.item}
                                        className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6 sm:mb-8 md:mb-10"
                                    />

                                    {/* Action Buttons */}
                                    <motion.div
                                        variants={variants.item}
                                        className="flex gap-3 sm:gap-4"
                                    >
                                        <Suspense fallback={<LoadingSpinner />}>
                                            <ActionButton
                                                href={currentProject.live}
                                                icon={BsEye}
                                                tooltip="View Live Project"
                                                variant="primary"
                                            />
                                            <ActionButton
                                                href={currentProject.github}
                                                icon={BsGithub}
                                                tooltip="View Source Code"
                                                variant="secondary"
                                            />
                                        </Suspense>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </motion.main>
        </div>
    );
};

WorkPage.displayName = 'WorkPage';
export default React.memo(WorkPage);
