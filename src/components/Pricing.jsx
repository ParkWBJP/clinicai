import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Pricing = () => {
    const { t } = useLanguage();

    return (
        <section className="section">
            <div className="container">
                <div className="section-header text-center mb-12">
                    <span className="section-label">PRICING</span>
                    <h2 className="section-title">Monthly Managed Service</h2>
                    <p className="section-desc mx-auto">
                        Everything you need to dominate AI search results.
                    </p>
                </div>

                <div className="pricing-card glass-card">
                    <div className="pricing-header">
                        <h3 className="plan-name">Standard Plan</h3>
                        <div className="price-tag">
                            <span className="currency">₩</span>
                            <span className="amount">2,000,000</span>
                            <span className="period">/ month</span>
                        </div>
                        <p className="plan-desc">SEO + AIO + Global Team in one package.</p>
                    </div>

                    <div className="pricing-body">
                        <ul className="feature-list">
                            <li><Check size={20} className="text-accent" /> AIO Strategy & Design</li>
                            <li><Check size={20} className="text-accent" /> Technical Implementation</li>
                            <li><Check size={20} className="text-accent" /> Monthly Performance Report</li>
                            <li><Check size={20} className="text-accent" /> Live Dashboard Access</li>
                        </ul>
                    </div>

                    <div className="pricing-footer">
                        <div className="outcome-box">
                            <span className="font-bold text-accent">Expected Outcome:</span> 20+ High-quality leads / mo
                        </div>
                        <button className="btn-primary w-full">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
