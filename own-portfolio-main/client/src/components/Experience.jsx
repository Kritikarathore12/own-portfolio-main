import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Experience = () => {
    const [exps, setExps] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/experience')
            .then(res => setExps(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="experience" className="container">
            <h2><span className="emoji">💼</span> <span className="text-gradient">Experience & Leadership</span></h2>
            {exps.length === 0 ? <p>No experience added yet.</p> : (
                <ul className="timeline">
                    {exps.map(exp => (
                        <li key={exp._id} style={{ marginBottom: '25px' }}>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{exp.role}</div>
                            <div style={{ color: 'var(--accent)', fontWeight: '600' }}>{exp.company}</div>
                            <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '5px' }}>{exp.date}</div>
                            {exp.description && <p style={{ marginTop: '5px', color: '#374151' }}>{exp.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Experience;
