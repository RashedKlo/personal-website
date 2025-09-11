import { memo } from "react";

// Service Card Skeleton Loader
const ServiceCardSkeleton = memo(() => (
    <div className="group relative flex flex-col justify-between bg-slate-900/30 backdrop-blur-md rounded-2xl p-8 
                   border border-white/10 overflow-hidden shadow-md animate-pulse">

        {/* Header Section: Number and Action Icon */}
        <div className="flex justify-between items-start mb-8">
            <div className="w-16 h-20 bg-slate-700/30 rounded-lg"></div>
            <div className="w-12 h-12 rounded-full bg-slate-700/30"></div>
        </div>

        {/* Content Section: Icon, Title, and Description */}
        <div className="space-y-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-slate-700/30"></div>

            {/* Title */}
            <div className="space-y-2">
                <div className="h-8 bg-slate-700/30 rounded-lg w-3/4"></div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <div className="h-4 bg-slate-700/30 rounded w-full"></div>
                <div className="h-4 bg-slate-700/30 rounded w-5/6"></div>
                <div className="h-4 bg-slate-700/30 rounded w-4/5"></div>
            </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="relative mt-8">
            <div className="h-px bg-slate-700/20"></div>
        </div>
    </div>
));

// Services Grid Skeleton
const ServicesGridSkeleton = memo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((index) => (
            <ServiceCardSkeleton key={index} />
        ))}
    </div>
));

// Page Header Skeleton
const ServicesHeaderSkeleton = memo(() => (
    <div className="text-center mb-16 animate-pulse">
        <div className="space-y-4 mb-6">
            <div className="h-12 md:h-16 lg:h-20 bg-slate-700/30 rounded-lg w-2/3 mx-auto"></div>
        </div>
        <div className="space-y-2 max-w-3xl mx-auto">
            <div className="h-6 bg-slate-700/30 rounded w-full"></div>
            <div className="h-6 bg-slate-700/30 rounded w-4/5 mx-auto"></div>
        </div>
    </div>
));

// CTA Button Skeleton
const CTAButtonSkeleton = memo(() => (
    <div className="text-center mt-20 animate-pulse">
        <div className="w-48 h-12 bg-slate-700/30 rounded-full mx-auto"></div>
    </div>
));

// Full Page Loading Component
const ServicesPageSkeleton = memo(() => (
    <section className="min-h-screen w-full flex flex-col justify-center py-20 px-4 md:px-8 bg-slate-900">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.4)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
            <ServicesHeaderSkeleton />
            <ServicesGridSkeleton />
            <CTAButtonSkeleton />
        </div>
    </section>
));

// Export individual components for granular loading
export {
    ServiceCardSkeleton,
    ServicesGridSkeleton,
    ServicesHeaderSkeleton,
    CTAButtonSkeleton,
    ServicesPageSkeleton
};

// Default export for full page loading
export default ServicesPageSkeleton;