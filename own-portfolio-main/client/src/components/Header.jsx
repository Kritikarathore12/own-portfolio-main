import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header>
            <div className="container nav">
                <div className="brand"><span className="brand-accent">KRITIKA</span> RATHORE</div>
                <nav>
                    <ul id="navLinks" className={isOpen ? 'active' : ''}>
                        {/* Note: Using anchor links for single page scroll if on Home */}
                        <li><a href="/#about" onClick={() => setIsOpen(false)}>About</a></li>
                        <li><a href="/#skills" onClick={() => setIsOpen(false)}>Skills</a></li>
                        <li><a href="/#projects" onClick={() => setIsOpen(false)}>Projects</a></li>
                        <li><a href="/#achievements" onClick={() => setIsOpen(false)}>Awards</a></li>
                        <li><a href="/#certifications" onClick={() => setIsOpen(false)}>Certifications</a></li>
                        <li><a href="/#experience" onClick={() => setIsOpen(false)}>Experience</a></li>
                        <li><a href="/#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
                    </ul>
                </nav>
                <button id="menuBtn" className={isOpen ? 'active' : ''} onClick={toggleMenu}>
                    ☰
                </button>
            </div>
        </header>
    );
};

export default Header;
