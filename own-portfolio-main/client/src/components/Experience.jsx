import { useState, useEffect } from 'react';
import axios from 'axios';
import { experience as localExps } from '../data/experience';

const Experience = () => {
    const [exps, setExps] = useState(localExps);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/experience`)
            .then(res => {
                const backendExps = res.data;
                const expMap = new Map(localExps.map(e => [e._id, e]));
                backendExps.forEach(e => expMap.set(e._id, e));
                setExps(Array.from(expMap.values()));
            })
            .catch(err => console.error('Using local experience only:', err));
    }, []);

    return (
        <section id="experience" className="container">
            <h2><span className="emoji">💼</span> <span className="text-gradient">Work & Leadership</span></h2>
            {exps.length === 0 ? <p>No experience added yet.</p> : (
                <ul className="timeline">
                    {exps.map(exp => (
                        <li key={exp._id} style={{ marginBottom: '25px' }}>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{exp.role}</div>
                            <div style={{ color: 'var(--accent)', fontWeight: '600' }}>{exp.company}</div>
                            <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '5px' }}>{exp.date}</div>
                            {exp.description && <p style={{ marginTop: '5px', color: '#e2e8f0' }}>{exp.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Experience;
