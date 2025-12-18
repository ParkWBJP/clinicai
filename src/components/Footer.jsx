import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="section" style={{ paddingBottom: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <div className="container text-center">

                <div className="cta-area mb-12">
                    <h2 className="section-title mb-8" style={{ fontSize: '2rem' }}>
                        AI가 추천하는 병원, <br />지금 선점하세요.
                    </h2>

                    <div className="footer-form" style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            placeholder="Input Hospital URL"
                            style={{
                                flex: 1,
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                                background: '#F9FAFB'
                            }}
                        />
                        <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                            Get Free Report
                        </button>
                    </div>
                </div>

                <div className="footer-bottom text-secondary" style={{ fontSize: '0.9rem', marginTop: '4rem' }}>
                    <p>&copy; 2025 Clinic.ai (Based on Yukiharu AIO). All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
