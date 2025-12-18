import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Code, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ServiceWorkflow = () => {
    const { t } = useLanguage();

    const services = [
        {
            icon: <Compass size={40} />,
            title: "Strategy & Design",
            subtitle: "전략/설계",
            items: ["Site Diagnosis (AIO Score)", "Structure Design", "Medical Compliance Check"]
        },
        {
            icon: <Code size={40} />,
            title: "Implementation",
            subtitle: "구현/운영",
            items: ["Schema Markup (Technical SEO)", "Pillar Page Creation", "Keyword & Content Generation"]
        },
        {
            icon: <BarChart3 size={40} />,
            title: "Insight & Monitoring",
            subtitle: "모니터링",
            items: ["AI Exposure Monitoring", "Competitor Benchmarking", "Live Dashboard Reports"]
        }
    ];

    return (
        <section className="section">
            <div className="container">
                <div className="section-header text-center mb-12">
                    <span className="section-label">OUR PROCESS</span>
                    <h2 className="section-title">3-Step AIO Workflow</h2>
                </div>

                <div className="workflow-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="glass-card workflow-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="workflow-icon-box">
                                {service.icon}
                            </div>
                            <h3 className="workflow-title">{service.title}</h3>
                            <span className="workflow-subtitle">{service.subtitle}</span>

                            <ul className="workflow-list">
                                {service.items.map((item, i) => (
                                    <li key={i} className="workflow-item">
                                        <span className="check-icon">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceWorkflow;
