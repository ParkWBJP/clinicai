import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        const text = t.hero.prompt; // "강남에서 코수술 잘하는 병원이 어디야?"
        let index = 0;
        setTypedText('');

        // Initial delay before typing starts
        const startDelay = setTimeout(() => {
            const interval = setInterval(() => {
                if (index <= text.length) {
                    setTypedText(text.slice(0, index));
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        }, 500);

        return () => clearTimeout(startDelay);
    }, [t.hero.prompt]);

    return (
        <section className="hero-section">
            <div className="container hero-container">

                <div className="hero-content">
                    <motion.h1
                        className="hero-headline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span dangerouslySetInnerHTML={{ __html: t.hero.headline }}></span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtext"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {t.hero.subtext}
                    </motion.p>
                </div>

                <motion.div
                    className="search-demo shadow-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="search-bar">
                        <Search className="search-icon" size={24} color="#9CA3AF" />
                        <div className="search-input">
                            {typedText}
                            <span className="blinking-cursor">|</span>
                        </div>
                    </div>
                    <div className="search-logos">
                        <span className="logo-label text-secondary">Powered by</span>
                        {/* Grayscale text logos for aesthetic simplicity */}
                        <div className="ai-logos">
                            <span>ChatGPT</span>
                            <span>Gemini</span>
                            <span>Claude</span>
                            <span>Perplexity</span>
                            <span>HyperCLOVA X</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-cta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button className="btn-outline">
                        {t.hero.cta}
                    </button>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
