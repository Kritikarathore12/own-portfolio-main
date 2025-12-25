import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const Projects = () => {
    // const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false); // Set loading to false initially

    // Hardcoded projects for display
    const projects = [
        {
            _id: '1',
            title: 'AI Analytics Dashboard',
            description: 'A comprehensive dashboard for visualizing AI model performance metrics in real-time.',
            techStack: ['React', 'Python', 'TensorFlow', 'D3.js'],
            link: 'https://github.com',
            github: 'https://github.com',
            image: 'https://placehold.co/600x400?text=AI+Dashboard'
        },
        {
            _id: '2',
            title: 'E-commerce Platform',
            description: 'Full-featured online store with cart, user authentication, and payment gateway integration.',
            techStack: ['MERN Stack', 'Redux', 'Stripe'],
            link: 'https://github.com',
            github: 'https://github.com',
            image: 'https://placehold.co/600x400?text=E-commerce'
        },
        {
            _id: '3',
            title: 'Real-time Chat App',
            description: 'Instant messaging application supporting private and group chats with multimedia sharing.',
            techStack: ['Socket.io', 'Node.js', 'React', 'MongoDB'],
            link: 'https://github.com',
            github: 'https://github.com',
            image: 'https://placehold.co/600x400?text=Chat+App'
        },
        {
            _id: '4',
            title: 'Portfolio Website',
            description: 'Personal portfolio website showcasing skills, projects, and professional experience.',
            techStack: ['React', 'Framer Motion', 'CSS3'],
            link: 'https://github.com',
            github: 'https://github.com',
            image: 'https://placehold.co/600x400?text=Portfolio'
        },
        {
            _id: '5',
            title: 'Task Manager Pro',
            description: 'Productivity tool for team collaboration, task assignment, and progress tracking.',
            techStack: ['Vue.js', 'Firebase', 'Tailwind'],
            link: 'https://github.com',
            github: 'https://github.com',
            image: 'https://placehold.co/600x400?text=Task+Manager'
        }
    ];

    /* 
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
    */

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
            {loading ? (
                <p>Loading projects...</p>
            ) : (
                projects.length === 0 ? (
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
                                    {project.techStack && project.techStack.length > 0 && (
                                        <div style={{ marginTop: '10px' }}>
                                            {project.techStack.map((tech, idx) => (
                                                <span className="chip" key={idx}>{tech}</span>
                                            ))}
                                        </div>
                                    )}
                                    {project.image && <img src={project.image} alt={project.title} style={{ width: '100%', marginTop: '15px', borderRadius: '10px' }} />}
                                </article>
                            ))}
                        </div>
                    </div>
                )
            )}
        </section>
    );
};

export default Projects;
