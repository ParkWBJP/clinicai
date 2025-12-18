import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Smile, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FeatureGrid = () => {
    const { t } = useLanguage();

    return (
        <section className="feature-grid-section">
            <div className="container">
                <h2 className="section-title" style={{ whiteSpace: 'pre-line' }}>
                    {t.features.title}
                </h2>

                <div className="bento-grid">
                    {/* Card 1: Visibility */}
                    <motion.div
                        className="bento-card card-large glow-hover"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="card-icon"><BarChart size={32} /></div>
                        <h3>{t.features.card1.title}</h3>
                        <div className="graph-placeholder">
                            <div className="bar-chart">
                                <div className="bar" style={{ height: '40%' }}></div>
                                <div className="bar" style={{ height: '60%' }}></div>
                                <div className="bar" style={{ height: '85%' }}></div>
                                <div className="bar active" style={{ height: '95%' }}></div>
                            </div>
                        </div>
                        <p className="card-desc" dangerouslySetInnerHTML={{ __html: t.features.card1.desc }}></p>
                    </motion.div>

                    {/* Card 2: Sentiment */}
                    <motion.div
                        className="bento-card card-medium glow-hover"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="card-icon"><Smile size={32} /></div>
                        <h3>{t.features.card2.title}</h3>
                        <div className="ring-chart">
                            <span className="ring-text">98%</span>
                            <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg"
                                    d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path className="circle"
                                    strokeDasharray="98, 100"
                                    d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                        </div>
                        <p className="card-desc">{t.features.card2.desc}</p>
                    </motion.div>

                    {/* Card 3: Optimization */}
                    <motion.div
                        className="bento-card card-medium glow-hover"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="card-icon"><Database size={32} /></div>
                        <h3>{t.features.card3.title}</h3>
                        <div className="code-snippet font-mono">
                            <span className="code-line">{"{ clinic_data }"}</span>
                            <span className="code-arrow">➜</span>
                            <span className="code-line text-neon">{"[ AI_Ready ]"}</span>
                        </div>
                        <p className="card-desc">{t.features.card3.desc}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
