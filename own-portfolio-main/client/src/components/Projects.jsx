import { useState, useEffect } from 'react';
import axios from 'axios';
import { projects as localProjects } from '../data/projects';
import { getImageUrl } from '../utils/imageHelper';

const Projects = () => {
    const [projects, setProjects] = useState(localProjects);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`);
                const backendProjects = res.data.filter(project => project.isVisible !== false);

                // Merge strategies:
                // 1. Create Map from local data
                const projectMap = new Map(localProjects.map(p => [p._id, p]));

                // 2. Update/Add from backend data
                backendProjects.forEach(p => {
                    projectMap.set(p._id, p);
                });

                // 3. Convert back to array
                setProjects(Array.from(projectMap.values()));
            } catch (err) {
                console.error('Error fetching projects from backend, using local data only:', err);
            }
        };
        fetchProjects();
    }, []);

    const handleMouseMove = (e) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

    // Duplicate projects for seamless infinite scroll loop (4x to fill wide screens)
    const displayProjects = [...projects, ...projects, ...projects, ...projects];

    return (
        <section id="projects" className="container">
            <h2><span className="emoji">💻</span> <span className="text-gradient">Projects</span></h2>
            <p className="mobile-swipe-hint">Swipe left or right to view projects</p>
            {projects.length === 0 ? (
                <p>No projects added yet.</p>
            ) : (
                <div className="project-scroller">
                    <div className="project-track">
                        {displayProjects.map((project, index) => (
                            <article
                                className="card spotlight-card"
                                key={`${project._id}-${index}`}
                                onClick={() => project.link && window.open(project.link, '_blank')}
                                style={{ cursor: project.link ? 'pointer' : 'default' }}
                                onMouseMove={handleMouseMove}
                            >
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                {project.image && <img src={getImageUrl(project.image)} alt={project.title} style={{ width: '100%', marginTop: '15px', borderRadius: '10px', marginBottom: '15px' }} />}
                                {project.techStack && project.techStack.length > 0 && (
                                    <div style={{ marginTop: '0', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                                        {project.techStack.map((tech, idx) => (
                                            <span className="chip" key={idx} style={{ margin: 0, fontSize: '0.8rem' }}>{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
