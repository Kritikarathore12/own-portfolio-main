import React from 'react';

const Hackathons = () => {
    return (
        <section id="hackathons" className="container">
            <h2><span className="emoji">🏆</span> <span className="text-gradient">Achievements and Hackathons</span></h2>

            <div className="hackathon-grid">
                {/* First Card: KRIYETA 4.0 */}
                <div className="hackathon-card winner-card">
                    <div className="card-content">
                        <h3>KRIYETA 4.0</h3>
                        <span className="badge">Winner 🥇</span>
                        <p>Secured 1st position in the KRIYETA 4.0 hackathon demonstrating innovative problem solving.</p>
                        <div className="placeholder-img">Photo coming soon</div>
                    </div>
                </div>

                {/* Middle Card: Participation Stats */}
                <div className="hackathon-card stat-card">
                    <div className="card-content">
                        <h3>Hackathon Journey</h3>
                        <div className="big-stat">5+</div>
                        <p>Actively participated in more than 5 hackathons, consistently learning and building.</p>
                    </div>
                </div>

                {/* Right Card: PRAYATNA 2.0 */}
                <div className="hackathon-card winner-card">
                    <div className="card-content">
                        <h3>PRAYATNA 2.0</h3>
                        <span className="badge">Winner 🏆</span>
                        <p>Achieved top rank in the prestigious PRAYATNA 2.0 hackathon event.</p>
                        <div className="placeholder-img">Photo coming soon</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hackathons;
