import React from 'react';

const About = () => {
    return (
        <section id="about" className="container">
            <h2><span className="emoji">👨‍💻</span> <span className="text-gradient">About Me</span></h2>
            <div className="card" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                <p>
                    I’m <strong>Kritika Rathore</strong>, a full-stack developer with hands-on experience in <strong>React.js, Node.js, MongoDB</strong>, and modern frontend technologies. I specialize in building responsive, scalable web applications and integrating RESTful APIs with clean, maintainable code.
                </p>
                <p style={{ marginTop: '20px' }}>
                    I’ve worked on real-world projects and hackathon solutions, where I focus on <strong>performance optimization, reusable UI components, and user-centric design</strong>. I enjoy collaborating in team environments and solving complex problems under real constraints.
                </p>
                <p style={{ marginTop: '20px' }}>
                    Currently, I’m pursuing a <strong>B.Tech in Computer Science</strong>, and I’m continuously strengthening my skills in <strong>Data Structures, Full-stack Development, and emerging AI/ML technologies</strong> to build impactful digital products.
                </p>
            </div>
        </section>
    );
};

export default About;
