import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/achievements')
            .then(res => setAchievements(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="achievements" className="container">
            <h2><span className="emoji">🏆</span> <span className="text-gradient">Achievements</span></h2>
            {achievements.length === 0 ? <p>No achievements added yet.</p> : (
                <div className="cards cards-row">
                    {achievements.map(ach => (
                        <article className="card" key={ach._id} onClick={() => ach.link && window.open(ach.link, '_blank')} style={{ cursor: ach.link ? 'pointer' : 'default' }}>
                            <h3>{ach.title}</h3>
                            <p>{ach.description}</p>
                            {ach.image && <img src={ach.image} alt={ach.title} style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
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
