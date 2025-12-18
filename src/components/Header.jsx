import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
    const { lang, setLang } = useLanguage();

    return (
        <header className="header">
            <div className="logo-container">
                <h1 className="logo-text">Clinic<span className="text-neon">.ai</span></h1>
            </div>

            <nav className="nav">
                <button
                    className={`lang-btn ${lang === 'KO' ? 'active' : ''}`}
                    onClick={() => setLang('KO')}
                >KO</button>
                <span className="divider">/</span>
                <button
                    className={`lang-btn ${lang === 'EN' ? 'active' : ''}`}
                    onClick={() => setLang('EN')}
                >EN</button>
                <span className="divider">/</span>
                <button
                    className={`lang-btn ${lang === 'JP' ? 'active' : ''}`}
                    onClick={() => setLang('JP')}
                >JP</button>
            </nav>
        </header>
    );
};

export default Header;
