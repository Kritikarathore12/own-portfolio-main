import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        // Mock submission or real backend if implemented
        setTimeout(() => {
            setStatus('Message Sent! (Backend Pending)');
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    return (
        <section id="contact" className="container">
            <h2><span className="emoji">📬</span> <span className="text-gradient">Get In Touch</span></h2>
            <div className="contact-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button type="submit" className="btn">Send Message</button>
                    {status && <p style={{ marginTop: '10px', color: 'var(--accent)' }}>{status}</p>}
                </form>
                <div className="contact-social">
                    <h3>Connect with me</h3>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <a href="https://linkedin.com/in/kritika-rathore12" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                            <i className="fab fa-linkedin"></i>
                            <span>LinkedIn</span>
                        </a>
                        <a href="https://github.com/Kritikarathore12" target="_blank" rel="noopener noreferrer" className="social-link github">
                            <i className="fab fa-github"></i>
                            <span>GitHub</span>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link x">
                            <i className="fa-brands fa-x-twitter"></i>
                            <span>X</span>
                        </a>
                        <a href="mailto:kritikarathore1211@gmail.com" className="social-link email">
                            <i className="fas fa-envelope"></i>
                            <span>Email</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
