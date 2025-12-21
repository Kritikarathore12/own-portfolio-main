import React from 'react';

const Skills = () => {
    const categories = [
        {
            title: "Languages",
            items: [
                { name: "C", id: "c" },
                { name: "C++", id: "cpp" },
                { name: "Python", id: "python" },
                { name: "JavaScript", id: "js" }
            ]
        },
        {
            title: "Frontend Development",
            items: [
                { name: "HTML", id: "html" },
                { name: "CSS", id: "css" },
                { name: "React", id: "react" },
                { name: "Bootstrap", id: "bootstrap" },
                { name: "Tailwind", id: "tailwind" },
                { name: "Vite", id: "vite" }
            ]
        },
        {
            title: "Backend & Database",
            items: [
                { name: "Node.js", id: "nodejs" },
                { name: "Express", id: "express" },
                { name: "MongoDB", id: "mongodb" },
                { name: "MySQL", id: "mysql" }
            ]
        },
        {
            title: "Tools & Platforms",
            items: [
                { name: "Git", id: "git" },
                { name: "GitHub", id: "github" },
                { name: "VS Code", id: "vscode" },
                { name: "Postman", id: "postman" }
            ]
        }
    ];

    return (
        <section id="skills" className="container">
            <h2 style={{ justifyContent: 'center', marginBottom: '50px' }}>
                <span className="emoji">🚀</span> <span className="text-gradient">Technical Skills</span>
            </h2>

            <div className="skills-container" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
                {categories.map((cat, index) => (
                    <div key={index} className="skill-category">
                        <h3 style={{ textAlign: 'center', fontSize: '1.4rem', color: '#f3f4f6', marginBottom: '25px', borderBottom: '2px solid #334155', paddingBottom: '10px', display: 'inline-block', width: '100%' }}>
                            {cat.title}
                        </h3>
                        <div className="skill-items-grid" style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '30px'
                        }}>
                            {cat.items.map((skill, i) => (
                                <div key={i} className="skill-item" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: '#1e293b',
                                    border: '1px solid #334155',
                                    padding: '15px',
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                                    minWidth: '100px',
                                    transition: 'transform 0.3s'
                                }}>
                                    <img
                                        src={"https://skillicons.dev/icons?i=" + skill.id + "&theme=light"}
                                        alt={skill.name}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                    <span style={{ fontWeight: '600', fontSize: '0.95rem', color: '#e2e8f0' }}>{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
