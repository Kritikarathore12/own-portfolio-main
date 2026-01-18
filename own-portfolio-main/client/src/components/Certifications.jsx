import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImageUrl } from '../utils/imageHelper';

const Certifications = () => {
    const [certs, setCerts] = useState([]);
    const [selectedCert, setSelectedCert] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/certifications`)
            .then(res => setCerts(res.data))
            .catch(err => console.error(err));
    }, []);

    const openModal = (cert) => {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        setSelectedCert(cert);
    };

    const closeModal = () => {
        document.body.style.overflow = 'unset';
        setSelectedCert(null);
    };

    return (
        <section id="certifications" className="container" style={{ paddingBottom: '5rem' }}>
            <h2><span className="emoji">📜</span> <span className="text-gradient">Certifications</span></h2>

            {certs.length === 0 ? <p>No certifications added yet.</p> : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '2rem',
                    marginTop: '2rem'
                }}>
                    {certs.slice(0, showAll ? certs.length : 3).map(cert => (
                        <div
                            key={cert._id}
                            className="cert-card"
                            onClick={() => openModal(cert)}
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '15px',
                                padding: '15px',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: '200px',
                                overflow: 'hidden',
                                borderRadius: '10px',
                                marginBottom: '1rem',
                                backgroundColor: '#000'
                            }}>
                                {cert.image ? (
                                    <img
                                        src={getImageUrl(cert.image)}
                                        alt={cert.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                        No Image
                                    </div>
                                )}
                            </div>

                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>{cert.title}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#aaa' }}>
                                <span>{cert.issuer}</span>
                                <span>{cert.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }

            {
                certs.length > 3 && (
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button
                            onClick={() => setShowAll(!showAll)}
                            style={{
                                background: 'transparent',
                                border: '1px solid #3498db',
                                color: '#3498db',
                                padding: '10px 30px',
                                borderRadius: '30px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = '#3498db';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#3498db';
                            }}
                        >
                            {showAll ? 'Show Less' : 'View All Certifications'}
                        </button>
                    </div>
                )
            }

            {/* Modal */}
            {
                selectedCert && (
                    <div
                        onClick={closeModal}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px',
                            backdropFilter: 'blur(5px)'
                        }}
                    >
                        <div
                            onClick={e => e.stopPropagation()}
                            style={{
                                position: 'relative',
                                maxWidth: '90%',
                                maxHeight: '90%',
                                animation: 'fadeIn 0.3s ease'
                            }}
                        >
                            <button
                                onClick={closeModal}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '-40px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '2rem',
                                    cursor: 'pointer'
                                }}
                            >
                                &times;
                            </button>

                            {selectedCert.image && (
                                <img
                                    src={getImageUrl(selectedCert.image)}
                                    alt={selectedCert.title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '85vh',
                                        boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                                        borderRadius: '4px'
                                    }}
                                />
                            )}

                            <div style={{ marginTop: '1rem', textAlign: 'center', color: 'white' }}>
                                <h3>{selectedCert.title}</h3>
                                <p>{selectedCert.issuer} | {selectedCert.date}</p>
                                {selectedCert.link && (
                                    <a
                                        href={selectedCert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-block',
                                            marginTop: '10px',
                                            color: '#3498db',
                                            textDecoration: 'none',
                                            border: '1px solid #3498db',
                                            padding: '5px 15px',
                                            borderRadius: '20px'
                                        }}
                                    >
                                        Verify Credential
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </section >
    );
};

export default Certifications;
