import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects');
                setProjects(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="container">
            <h2><span className="emoji">💻</span> <span className="text-gradient">Projects</span></h2>
            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="cards">
                    {projects.length === 0 ? (
                        <p>No projects added yet.</p>
                    ) : (
                        projects.map((project) => (
                            <article className="card" key={project._id} onClick={() => project.link && window.open(project.link, '_blank')} style={{ cursor: project.link ? 'pointer' : 'default' }}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                {project.techStack && project.techStack.length > 0 && (
                                    <div style={{ marginTop: '10px' }}>
                                        {project.techStack.map((tech, index) => (
                                            <span className="chip" key={index}>{tech}</span>
                                        ))}
                                    </div>
                                )}
                                {project.image && <img src={project.image} alt={project.title} style={{ width: '100%', marginTop: '15px', borderRadius: '10px' }} />}
                            </article>
                        ))
                    )}
                </div>
            )}
        </section>
    );
};

export default Projects;
