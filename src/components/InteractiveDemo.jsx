import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const InteractiveDemo = () => {
    const { t } = useLanguage();
    // Scroll trigger
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = 100;
            const duration = 2000;
            const incrementTime = duration / end;

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);
        }
    }, [isInView]);

    return (
        <section className="demo-section" ref={ref}>
            <div className="container">
                <div className="demo-header">
                    <span className="badge-neon">{t.demo.badge}</span>
                    <h2 className="section-title">{t.demo.title}</h2>
                </div>

                <div className="dashboard-mockup glow-box">
                    <div className="dashboard-sidebar">
                        <div className="sidebar-item active">{t.demo.sidebar[0]}</div>
                        <div className="sidebar-item">{t.demo.sidebar[1]}</div>
                        <div className="sidebar-item">{t.demo.sidebar[2]}</div>
                    </div>
                    <div className="dashboard-content">
                        <div className="dash-header">
                            <h3>Hospital Performance</h3>
                            <div className="live-indicator">LIVE</div>
                        </div>

                        <div className="stats-row">
                            <div className="stat-card">
                                <span className="stat-label">{t.demo.stats.views}</span>
                                <span className="stat-value">
                                    {isInView ? (count * 154).toLocaleString() : '0'}
                                </span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">{t.demo.stats.rate}</span>
                                <span className="stat-value text-neon">
                                    {isInView ? count : 0}%
                                </span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">{t.demo.stats.score}</span>
                                <span className="stat-value">A+</span>
                            </div>
                        </div>

                        <div className="chart-area-mock">
                            <svg className="line-chart" viewBox="0 0 500 150">
                                <motion.path
                                    d="M0,150 Q100,100 250,50 T500,20"
                                    fill="none"
                                    stroke="var(--accent-neon)"
                                    strokeWidth="3"
                                    initial={{ pathLength: 0 }}
                                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                                <path d="M0,150 L500,150" stroke="#333" strokeWidth="1" />
                                <path d="M0,0 L0,150" stroke="#333" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveDemo;
