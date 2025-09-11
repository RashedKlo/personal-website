import { memo } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { motion } from 'framer-motion';

const CONTACT_INFO = [
    {
        icon: FiMail,
        text: "rashed.klo.dev@gmail.com",
        href: "mailto:rashed.klo.dev@gmail.com",
        className: "text-emerald-400 hover:text-emerald-300"
    },
    {
        icon: FiPhone,
        text: "+963 947 841 958",
        href: "https://wa.me/963947841958",
        className: "text-blue-400 hover:text-blue-300"
    },
    {
        icon: FiMapPin,
        text: "Aleppo, Syria",
        href: "https://maps.google.com/?q=Aleppo,Syria",
        className: "text-purple-400 hover:text-purple-300"
    }
];

const ContactInfo = memo(({ ANIMATION_VARIANTS }) => (
    <motion.div
        className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 justify-center lg:justify-start"
        variants={ANIMATION_VARIANTS.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6, delay: 1.6 }}
    >
        {CONTACT_INFO.map((contact, i) => (
            <motion.a
                key={contact.text}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 text-sm font-medium cursor-pointer ${contact.className}`}
                whileHover={{ x: 4, scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1 }}
            >
                <contact.icon size={18} className="flex-shrink-0" />
                <span className="underline md:no-underline">{contact.text}</span>
            </motion.a>

        ))}
    </motion.div>
));

export default ContactInfo;
