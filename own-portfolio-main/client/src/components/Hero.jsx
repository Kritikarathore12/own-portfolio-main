import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const roles = ["Software Developer", "Problem Solver", "Creator", "Tech Enthusiast"];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, roles, typingSpeed]);

    return (
        <section id="about" className="container hero">
            <div className="hero-text">
                <h1>
                    <span className="hero-greeting">Hi, I'm</span> <br />
                    <span className="text-gradient">Kritika Rathore</span>
                </h1>
                <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', minHeight: '60px', lineHeight: '1.2' }}>
                    Aspiring <span style={{ color: 'var(--accent)' }}>{text}</span><span className="cursor">|</span>
                </h2>
                <p>
                    Passionate about building scalable web applications and solving complex problems with code.
                    Exploring new technologies to create impactful digital experiences.
                </p>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <a href="https://drive.google.com/file/d/1IkBhM63TZVRrwKbopS-lk4dVs0SAoFPZ/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn">Download CV</a>
                </div>
            </div>
            <div className="avatar">
                {/* Using a reliable placeholder since the LinkedIn link might be expired. Replace 'src' with your local image path if available. */}
                <img src="/assets/profile.jpg" alt="Profile" />
            </div>
        </section>
    );
};

export default Hero;
