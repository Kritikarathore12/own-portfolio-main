import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/achievements`)
            .then(res => setAchievements(res.data))
            .catch(err => console.error(err));
    }, []);

    // Carousel sub-component
    const ImageCarousel = ({ images, title }) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            if (!images || images.length <= 1) return;
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }, 3000); // Change every 3 seconds
            return () => clearInterval(interval);
        }, [images]);

        if (!images || images.length === 0) return null;

        return (
            <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '10px', marginTop: '10px' }}>
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`${title} ${idx}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            opacity: idx === currentIndex ? 1 : 0,
                            transition: 'opacity 1s ease-in-out'
                        }}
                    />
                ))}
            </div>
        );
    };

    return (
        <section id="achievements" className="container">
            <h2><span className="emoji">🏆</span> <span className="text-gradient">Achievements & Hackathons</span></h2>
            {achievements.length === 0 ? <p>No achievements added yet.</p> : (
                <div className="cards cards-row">
                    {achievements.map(ach => (
                        <article className="card" key={ach._id} onClick={() => ach.link && window.open(ach.link, '_blank')} style={{ cursor: ach.link ? 'pointer' : 'default' }}>
                            <h3>{ach.title}</h3>
                            <p>{ach.description}</p>

                            {/* Handle new array images or fallback to old single image */}
                            {(ach.images && ach.images.length > 0) ? (
                                <ImageCarousel images={ach.images} title={ach.title} />
                            ) : (
                                ach.image && <img src={ach.image} alt={ach.title} style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />
                            )}

                            <div style={{ marginTop: '10px' }}>
                                {ach.tags && ach.tags.map((tag, i) => (
                                    <span className="chip" key={i}>{tag}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Achievements;
