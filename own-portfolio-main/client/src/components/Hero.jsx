import React from 'react';

const Hero = () => {
    // Helper to wrap words for animation
    const renderDroppingText = (text, delayStart = 0) => {
        return text.split(' ').map((word, index) => (
            <span
                key={index}
                className="drop-in"
                style={{
                    animationDelay: (delayStart + (index * 0.15)) + 's',
                    display: 'inline-block',
                    marginRight: '12px'
                }}
            >
                {word}
            </span>
        ));
    };

    return (
        <section className="hero container">
            <div className="hero-text">
                <h1>
                    {renderDroppingText("Hi, I’m", 0)}
                    <br /> {/* Optional: user mash might be due to line wrapping perception? */}
                    <span className="accent">
                        {renderDroppingText("Kritika Rathore", 0.3)}
                    </span>
                    <span
                        className="drop-in"
                        style={{ animationDelay: '0.8s', display: 'inline-block' }}
                    >
                        👋
                    </span>
                </h1>
                <p>
                    Aspiring <strong>Software Developer</strong> passionate about creating
                    user-friendly applications, solving real-world problems, and
                    continuously improving my skills through hackathons, projects, and teamwork.
                </p>
                <div className="actions">
                    <a className="btn" href="https://drive.google.com/file/d/1IkBhM63TZVRrwKbopS-lk4dVs0SAoFPZ/view?usp=sharing" target="_blank" rel="noopener noreferrer">Download CV</a>
                </div>
            </div>
            <div className="avatar">
                <img src="/assets/profile.jpg" alt="Kritika Rathore" />
            </div>
        </section>
    );
};

export default Hero;
