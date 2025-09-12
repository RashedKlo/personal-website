import { memo, useMemo, lazy, Suspense } from "react";
import { motion } from 'framer-motion';
import {
    FaReact, FaNodeJs, FaGitAlt,
    FaCalendar, FaMapMarker, FaEnvelope, FaPhone,
    FaLanguage, FaHeart
} from "react-icons/fa";
import {
    SiDotnet, SiJavascript,
    SiTypescript, SiTailwindcss,
    SiSqlite,
    SiPostman
} from "react-icons/si";

// Lazy load individual card components
const ExperienceCard = lazy(() => import('./ExperienceCard'));
const EducationCard = lazy(() => import('./EducationCard'));
const SkillBar = lazy(() => import('./SkillBar'));
const InfoCard = lazy(() => import('./InfoCard'));

// Card skeleton loaders
const CardSkeleton = memo(() => (
    <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30 animate-pulse">
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
));

const SkillSkeleton = memo(() => (
    <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 animate-pulse">
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-slate-700/30 rounded-lg"></div>
                <div className="h-5 bg-slate-700/30 rounded w-1/3"></div>
            </div>
            <div className="w-12 h-4 bg-slate-700/30 rounded"></div>
        </div>
        <div className="w-full bg-slate-700/30 rounded-full h-2"></div>
    </div>
));

const InfoSkeleton = memo(() => (
    <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 animate-pulse">
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-700/30 rounded-xl"></div>
            <div className="flex-1">
                <div className="h-4 bg-slate-700/30 rounded w-1/3 mb-2"></div>
                <div className="h-5 bg-slate-700/30 rounded w-2/3"></div>
            </div>
        </div>
    </div>
));

const TabContent = memo(({ activeTab, ANIMATION_VARIANTS }) => {
    // Memoize all data to prevent recreation on re-renders
    const experienceData = useMemo(() => [
        {
            position: "Full Stack Developer",
            company: "Tech Solutions Inc.",
            duration: "2022 - Present",
            description: "Developing and maintaining web applications using React.js, ASP.NET Core, and SQL Server. Leading frontend architecture decisions and implementing responsive user interfaces."
        },
        {
            position: "Frontend Developer",
            company: "Digital Agency",
            duration: "2021 - 2022",
            description: "Created modern, responsive websites using React, Tailwind CSS, and JavaScript. Collaborated with design teams to implement pixel-perfect user interfaces."
        },
        {
            position: "Junior Developer",
            company: "StartUp Hub",
            duration: "2020 - 2021",
            description: "Gained experience in web development fundamentals, worked on various client projects, and contributed to both frontend and backend development tasks."
        }
    ], []);

    const educationData = useMemo(() => [
        {
            degree: "Bachelor of Computer Science",
            institution: "University of Technology",
            duration: "2018 - 2022",
            description: "Focused on software engineering principles, data structures, algorithms, and web development technologies. Graduated with honors."
        },
        {
            degree: "Web Development Bootcamp",
            institution: "Code Academy",
            duration: "2020",
            description: "Intensive 6-month program covering modern web technologies including React, Node.js, and database management."
        }
    ], []);

    const skillsData = useMemo(() => [
        { name: "React.js", level: 90, color: "from-blue-500 to-cyan-500", icon: FaReact },
        { name: "ASP.NET Core", level: 85, color: "from-purple-500 to-indigo-500", icon: SiDotnet },
        { name: "PostMan", level: 88, color: "from-green-500 to-teal-500", icon: SiPostman },
        { name: "SQL Server", level: 82, color: "from-orange-500 to-red-500", icon: SiSqlite },
        { name: "JavaScript", level: 85, color: "from-yellow-500 to-orange-500", icon: SiJavascript },
        { name: "TypeScript", level: 78, color: "from-blue-600 to-blue-800", icon: SiTypescript },
        { name: "Tailwind CSS", level: 80, color: "from-cyan-500 to-blue-500", icon: SiTailwindcss },
        { name: "Node.js", level: 75, color: "from-green-600 to-green-800", icon: FaNodeJs },
        { name: "Git", level: 85, color: "from-orange-600 to-red-600", icon: FaGitAlt }
    ], []);

    const aboutData = useMemo(() => [
        { icon: FaCalendar, field: "Age", value: "21 years", color: "text-blue-400" },
        { icon: FaMapMarker, field: "Location", value: "Aleppo, Syria", color: "text-green-400" },
        { icon: FaEnvelope, field: "Email", value: "rashed.klo.dev@gmail.com", color: "text-purple-400" },
        { icon: FaPhone, field: "Phone", value: "+963 947 841 958", color: "text-orange-400" },
        { icon: FaLanguage, field: "Languages", value: "Arabic, English", color: "text-cyan-400" },
        { icon: FaHeart, field: "Interests", value: "Web Development, Gaming", color: "text-red-400" }
    ], []);

    // Memoize motion variants
    const motionVariants = useMemo(() => ANIMATION_VARIANTS.tabContent, [ANIMATION_VARIANTS]);

    const renderExperience = () => (
        <motion.div
            key="experience"
            variants={motionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {experienceData.map((item, index) => (
                <Suspense key={index} fallback={<CardSkeleton />}>
                    <ExperienceCard
                        item={item}
                        index={index}
                        ANIMATION_VARIANTS={ANIMATION_VARIANTS}
                    />
                </Suspense>
            ))}
        </motion.div>
    );

    const renderEducation = () => (
        <motion.div
            key="education"
            variants={motionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {educationData.map((item, index) => (
                <Suspense key={index} fallback={<CardSkeleton />}>
                    <EducationCard
                        item={item}
                        index={index}
                        ANIMATION_VARIANTS={ANIMATION_VARIANTS}
                    />
                </Suspense>
            ))}
        </motion.div>
    );

    const renderSkills = () => (
        <motion.div
            key="skills"
            variants={motionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >
            {skillsData.map((skill, index) => (
                <Suspense key={skill.name} fallback={<SkillSkeleton />}>
                    <SkillBar skill={skill} index={index} />
                </Suspense>
            ))}
        </motion.div>
    );

    const renderAbout = () => (
        <motion.div
            key="about"
            variants={motionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">About Me</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                    I'm a passionate Full Stack Developer with 3+ years of experience in creating modern web applications.
                    I specialize in React.js, ASP.NET Core, and SQL Server, always striving to deliver high-quality,
                    scalable solutions that provide exceptional user experiences.
                </p>
                <p className="text-slate-300 leading-relaxed">
                    When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects,
                    and sharing knowledge with the developer community.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aboutData.map((item, index) => (
                    <Suspense key={item.field} fallback={<InfoSkeleton />}>
                        <InfoCard item={item} index={index} />
                    </Suspense>
                ))}
            </div>
        </motion.div>
    );

    // Memoize render functions to prevent recreation
    const contentRenderers = useMemo(() => ({
        experience: renderExperience,
        education: renderEducation,
        skills: renderSkills,
        about: renderAbout
    }), [experienceData, educationData, skillsData, aboutData, motionVariants, ANIMATION_VARIANTS]);

    return contentRenderers[activeTab]?.() || null;
});

// Set display names
TabContent.displayName = 'TabContent';
CardSkeleton.displayName = 'CardSkeleton';
SkillSkeleton.displayName = 'SkillSkeleton';
InfoSkeleton.displayName = 'InfoSkeleton';

export default TabContent;