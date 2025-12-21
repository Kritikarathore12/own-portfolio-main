import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Hackathons from '../components/Hackathons';
import Certifications from '../components/Certifications';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <main>
            <div id="home"><Hero /></div>
            <About />
            <Skills />
            <Projects />
            <Hackathons />
            <Certifications />
            <Experience />
            <Contact />
        </main>
    );
};

export default Home;
