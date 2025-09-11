import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
const ContactCard = React.lazy(() => import("../features/Contact/components/ContactCard"));
const ContactForm = React.lazy(() => import("../features/Contact/components/ContactForm"));

const CONTACT_DATA = [
    {
        icon: FaEnvelope,
        label: "Email",
        value: "rashed.klo.dev@gmail.com",
        href: "mailto:rashed.klo.dev@gmail.com",
    },
    {
        icon: FaPhoneAlt,
        label: "Phone",
        value: "+963 947 841 958",
        href: "https://wa.me/963947841958",
    },
    {
        icon: FaMapMarkerAlt,
        label: "Location",
        value: "Aleppo, Syria",
        href: "https://maps.google.com/?q=Aleppo,Syria",
    }
];
// Animation configurations
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};


export default function ContactPage() {


    return (
        <Suspense fallback={<div>...loading</div>}>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">

                <div className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
                                  bg-clip-text text-transparent mb-6 tracking-tight">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Ready to bring your vision to life? Let's start a conversation about your next project.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Form */}
                        <ContactForm fadeInUp={fadeInUp} stagger={stagger} />

                        {/* Contact Information */}
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                            className="order-1 lg:order-2 space-y-6"
                        >
                            <motion.div variants={fadeInUp} className="mb-12">
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    Let's Connect
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    We're here to help bring your ideas to life. Reach out through any of these channels
                                    and we'll get back to you within 24 hours.
                                </p>
                            </motion.div>

                            {CONTACT_DATA.map((item, index) => (
                                <ContactCard fadeInUp={fadeInUp} key={item.label} item={item} index={index} />
                            ))}

                            <motion.div
                                variants={fadeInUp}
                                className="mt-12 p-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 
                                      backdrop-blur-xl rounded-3xl border border-cyan-400/20"
                            >
                                <h4 className="text-xl font-semibold text-white mb-3">Quick Response</h4>
                                <p className="text-gray-300">
                                    We typically respond to all inquiries within 2-4 hours during business hours.
                                    For urgent matters, please call us directly.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}