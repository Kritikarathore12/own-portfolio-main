import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hackathons = () => {
    // Hardcoded data as per user request to be independent of server for now
    const [hackathons] = useState([
        {
            "_id": "6948f3d02669f21ed7e50ed0",
            "title": "KRIYETA 4.0",
            "description": "Secured 1st position in the KRIYETA 4.0 hackathon demonstrating innovative problem solving.",
            "badge": "Winner 🥇",
            "isStat": false
        },
        {
            "_id": "6948f3d02669f21ed7e50ed1",
            "title": "Hackathon Journey",
            "description": "Actively participated in more than 5 hackathons, consistently learning and building.",
            "isStat": true,
            "statValue": "5+"
        },
        {
            "_id": "6948f3d02669f21ed7e50ed2",
            "title": "PRAYATNA 2.0",
            "description": "Achieved top rank in the prestigious PRAYATNA 2.0 hackathon event.",
            "badge": "Winner 🏆",
            "isStat": false
        }
    ]);

    // useEffect(() => {
    //     const fetchHackathons = async () => {
    //         try {
    //             const res = await axios.get('http://localhost:5000/api/hackathons');
    //             setHackathons(res.data);
    //         } catch (err) {
    //             console.error('Error fetching hackathons:', err);
    //         }
    //     };
    //     fetchHackathons();
    // }, []);

    const handleMouseMove = (e) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <section id="hackathons" className="container">
            <h2><span className="emoji">🏆</span> <span className="text-gradient">Achievements & Hackathons</span></h2>

            <div className="hackathon-grid">
                {hackathons.length === 0 ? <p>Loading...</p> : hackathons.map((hack) => (
                    <div
                        key={hack._id}
                        className={`hackathon-card spotlight-card ${hack.isStat ? 'stat-card' : 'winner-card'}`}
                        onMouseMove={handleMouseMove}
                    >
                        <div className="card-content">
                            <h3>{hack.title}</h3>
                            {hack.badge && <span className="badge">{hack.badge}</span>}
                            {hack.isStat && <div className="big-stat">{hack.statValue}</div>}
                            <p>{hack.description}</p>

                            {!hack.isStat && (
                                hack.image ? (
                                    <img src={hack.image} alt={hack.title} className="hack-image" style={{ width: '100%', borderRadius: '10px', marginTop: '15px' }} />
                                ) : (
                                    <div className="placeholder-img">Photo coming soon</div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Hackathons;
