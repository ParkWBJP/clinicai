import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GlobalTrend = () => {
    const { t } = useLanguage();

    const cards = [
        {
            icon: <Search className="text-accent" size={32} />,
            title: "Gartner Predicts 25% Drop",
            desc: "Traditional search traffic is declining as users switch to AI answers.",
            highlight: "Search ➔ Answer"
        },
        {
            icon: <TrendingUp className="text-accent" size={32} />,
            title: "3x Increase in Appts",
            desc: "US Case Study: Hospitals optimizing for AI saw 300% more appointments.",
            highlight: "High Quality Leads"
        },
        {
            icon: <Users className="text-accent" size={32} />,
            title: "Golden Time is Now",
            desc: "AI only recommends top 3 results. Secure your spot before competitors.",
            highlight: "Top 3 Only"
        }
    ];

    return (
        <section className="section bg-secondary">
            <div className="container">
                <div className="section-header text-center mb-12">
                    <span className="section-label">GLOBAL TREND</span>
                    <h2 className="section-title">
                        From <span className="text-highlight">Search</span> to <span className="text-highlight">Answer</span>
                    </h2>
                    <p className="section-desc mx-auto">
                        Patients no longer search through links. They ask AI for the "Answer".
                    </p>
                </div>

                <div className="trend-grid">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="glass-card trend-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="card-header">
                                {card.icon}
                                <span className="card-badge">{card.highlight}</span>
                            </div>
                            <h3 className="card-title">{card.title}</h3>
                            <p className="card-text">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalTrend;
