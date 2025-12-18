import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Database } from 'lucide-react';

const WhyUs = () => {
    return (
        <section className="section bg-secondary">
            <div className="container">
                <div className="why-us-grid">
                    <div className="why-content">
                        <span className="section-label">WHY US</span>
                        <h2 className="section-title">Technologists &<br />Medical Experts</h2>
                        <p className="section-desc">
                            We combine 20 years of digital marketing expertise with exclusive medical data to ensure your hospital dominates AI search results safely and effectively.
                        </p>

                        <div className="trust-points">
                            <div className="trust-point">
                                <ShieldCheck className="trust-icon" size={28} />
                                <div>
                                    <h4>Medical Compliance</h4>
                                    <p>Zero legal risk with Human-in-the-loop verification.</p>
                                </div>
                            </div>
                            <div className="trust-point">
                                <Database className="trust-icon" size={28} />
                                <div>
                                    <h4>Exclusive Data</h4>
                                    <p>Proprietary database for Gangnam plastic surgery & dermatology.</p>
                                </div>
                            </div>
                            <div className="trust-point">
                                <Award className="trust-icon" size={28} />
                                <div>
                                    <h4>Proven Expertise</h4>
                                    <p>Top-tier engineering team from Google & Naver backgrounds.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        className="why-image-wrapper glass-card"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Placeholder for professional team photo */}
                        <div className="team-photo-placeholder">
                            <span>Professional Team Photo</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
