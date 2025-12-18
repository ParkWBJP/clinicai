import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GlobalTrend from './components/GlobalTrend';
import ServiceWorkflow from './components/ServiceWorkflow';
import ServiceStructureSection from './components/ServiceStructureSection';
import WhyUs from './components/WhyUs';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
    return (
        <div className="app">
            <Header />
            <Hero />
            <GlobalTrend />
            <ServiceWorkflow />
            <ServiceStructureSection />
            <WhyUs />
            <Pricing />
            <Footer />
        </div>
    )
}

export default App
