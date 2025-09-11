import React, { memo, Suspense, useCallback, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
const FormInput = React.lazy(() => import("./FormInput"));
import { motion } from 'framer-motion'
const ServiceSelect = React.lazy(() => import("./ServiceSelect"));

const ContactForm = memo(({ fadeInUp, stagger }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(() => {
        // Handle form submission
        console.log('Form submitted:', formData);
    }, [formData]);

    return <Suspense fallback={<div>...loading</div>}>
        <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
        >
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-white/10 
                                       shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
                <motion.h2
                    variants={fadeInUp}
                    className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
                >
                    <FaPaperPlane className="text-cyan-400" />
                    Send Message
                </motion.h2>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            fadeInUp={fadeInUp}
                        />
                        <FormInput
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            fadeInUp={fadeInUp}

                        />
                    </div>

                    <FormInput
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        fadeInUp={fadeInUp}

                    />

                    <FormInput
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        fadeInUp={fadeInUp}
                    />

                    <ServiceSelect fadeInUp={fadeInUp} />

                    <motion.textarea
                        variants={fadeInUp}
                        name="message"
                        placeholder="Tell us about your project..."
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white 
                                              placeholder-gray-400 focus:border-cyan-400 focus:bg-white/10 focus:outline-none 
                                              focus:ring-2 focus:ring-cyan-400/30 hover:border-white/20 transition-all 
                                              duration-300 backdrop-blur-sm resize-none"
                    />

                    <motion.button
                        variants={fadeInUp}
                        onClick={handleSubmit}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-purple-600 
                                              hover:from-cyan-400 hover:to-purple-500 text-white font-semibold 
                                              rounded-2xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 
                                              flex items-center justify-center gap-3"
                    >
                        <FaPaperPlane />
                        Send Message
                    </motion.button>
                </div>
            </div>
        </motion.div>
    </Suspense>
});
export default ContactForm;