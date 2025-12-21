import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Certifications = () => {
    const [certs, setCerts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/certifications')
            .then(res => setCerts(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="certifications" className="container">
            <h2><span className="emoji">📜</span> <span className="text-gradient">Certifications</span></h2>
            {certs.length === 0 ? <p>No certifications added yet.</p> : (
                <ul className="timeline">
                    {certs.map(cert => (
                        <li key={cert._id} style={{ marginBottom: '20px' }}>
                            {cert.link ? (
                                <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                    <strong>{cert.issuer}</strong> — <span style={{ fontWeight: 600 }}>{cert.title}</span> ({cert.date})
                                    {cert.image && <div style={{ marginTop: '10px' }}><img src={cert.image} alt="cert" style={{ maxHeight: '150px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} /></div>}
                                </a>
                            ) : (
                                <span>
                                    <strong>{cert.issuer}</strong> — {cert.title} ({cert.date})
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Certifications;
