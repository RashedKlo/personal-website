import { memo, useCallback, useState } from "react";
import { motion } from 'framer-motion'
import { FaChevronDown } from "react-icons/fa";

const SERVICES = [
    { value: "web", label: "Web Development" },
    { value: "mobile", label: "Mobile App Development" },
    { value: "design", label: "UI/UX Design" },
    { value: "branding", label: "Brand Identity" },
    { value: "consulting", label: "Tech Consulting" },
];

const ServiceSelect = memo(({ fadeInUp }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    const handleSelect = useCallback((service) => {
        setSelected(service.value);
        setIsOpen(false);
    }, []);

    return (
        <motion.div variants={fadeInUp} className="relative">
            <button
                type="button"
                onClick={toggle}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-left
                          focus:border-cyan-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/30
                          hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex items-center justify-between"
            >
                <span className={selected ? "text-white" : "text-gray-400"}>
                    {selected ? SERVICES.find(s => s.value === selected)?.label : "Select a service"}
                </span>
                <FaChevronDown className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-xl border border-white/10 
                              rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                    {SERVICES.map((service) => (
                        <button
                            key={service.value}
                            onClick={() => handleSelect(service)}
                            className="w-full px-6 py-3 text-left text-gray-300 hover:text-white hover:bg-cyan-500/10 
                                      transition-colors duration-200 first:pt-4 last:pb-4"
                        >
                            {service.label}
                        </button>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
});
export default ServiceSelect;