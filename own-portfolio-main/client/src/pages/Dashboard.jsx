import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tab, setTab] = useState('projects'); // projects, certifications, achievements, experience
    const [data, setData] = useState([]);
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        if (!token) {
            navigate('/admin');
            return;
        }
        fetchData();
        setForm({});
    }, [tab, token, navigate]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_URL}/${tab}`);
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let payload = { ...form };
            if (tab === 'projects' || tab === 'achievements') {
                if (payload.techStack) payload.techStack = payload.techStack.split(',').map(item => item.trim());
                if (payload.tags) payload.tags = payload.tags.split(',').map(item => item.trim());
            }

            await axios.post(`${API_URL}/${tab}`, payload, { headers: { 'x-auth-token': token } });
            setForm({});
            fetchData();
            alert(`${tab} added!`);
        } catch (err) {
            alert('Error adding item');
            console.error(err);
        }
    };


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setForm({ ...form, image: res.data.filePath });
        } catch (err) {
            console.error(err);
            alert('File upload failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`${API_URL}/${tab}/${id}`, { headers: { 'x-auth-token': token } });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Dashboard - {tab.charAt(0).toUpperCase() + tab.slice(1)}</h2>
                <button onClick={handleLogout} className="btn" style={{ background: '#e74c3c' }}>Logout</button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {['projects', 'achievements', 'certifications', 'experience'].map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`btn ${tab === t ? 'primary' : ''}`}
                        style={{ opacity: tab === t ? 1 : 0.6 }}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            <div className="contact-card" style={{ marginBottom: '40px' }}>
                <h3>Add New {tab}</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    {/* Common / Specific Fields */}
                    {tab === 'projects' && (
                        <>
                            <input name="title" placeholder="Title" value={form.title || ''} onChange={handleChange} required style={{ padding: '10px' }} />
                            <textarea name="description" placeholder="Description" value={form.description || ''} onChange={handleChange} required style={{ padding: '10px' }} />
                            <input name="techStack" placeholder="Tech Stack (comma separated)" value={form.techStack || ''} onChange={handleChange} style={{ padding: '10px' }} />
                            <input type="file" onChange={handleFileChange} style={{ padding: '10px' }} />
                            <input name="image" placeholder="Image URL" value={form.image || ''} onChange={handleChange} style={{ padding: '10px' }} />
                            <input name="link" placeholder="Project Link" value={form.link || ''} onChange={handleChange} style={{ padding: '10px' }} />
                        </>
                    )}

                    {tab === 'achievements' && (
                        <>
                            <input name="title" placeholder="Title" value={form.title || ''} onChange={handleChange} required style={{ padding: '10px' }} />
                            <textarea name="description" placeholder="Description" value={form.description || ''} onChange={handleChange} style={{ padding: '10px' }} />
                            <input name="tags" placeholder="Tags (comma separated)" value={form.tags || ''} onChange={handleChange} style={{ padding: '10px' }} />
                            <input type="file" onChange={handleFileChange} style={{ padding: '10px' }} />
                            <input name="image" placeholder="Image URL" value={form.image || ''} onChange={handleChange} style={{ padding: '10px' }} />
                            <input name="link" placeholder="Link" value={form.link || ''} onChange={handleChange} style={{ padding: '10px' }} />
                        </>
                    )}

                    {tab === 'certifications' && (
                        <>
                            <input name="title" placeholder="Title" value={form.title || ''} onChange={handleChange} required style={{ padding: '10px' }} />
                            <input name="issuer" placeholder="Issuer" value={form.issuer || ''} onChange={handleChange} style={{ padding: '10px' }} />
                            <input name="date" placeholder="Date" value={form.date || ''} onChange={handleChange} style={{ padding: '10px' }} />
                            <input type="file" onChange={handleFileChange} style={{ padding: '10px' }} />
                            <input name="image" placeholder="Image URL" value={form.image || ''} onChange={handleChange} style={{ padding: '10px' }} />
                            <input name="link" placeholder="Link" value={form.link || ''} onChange={handleChange} style={{ padding: '10px' }} />
                        </>
                    )}

                    {tab === 'experience' && (
                        <>
                            <input name="role" placeholder="Role (e.g. Lead)" value={form.role || ''} onChange={handleChange} required style={{ padding: '10px' }} />
                            <input name="company" placeholder="Company/Project" value={form.company || ''} onChange={handleChange} style={{ padding: '10px' }} />
                            <input name="date" placeholder="Date (e.g. Feb 2025)" value={form.date || ''} onChange={handleChange} style={{ padding: '10px' }} />
                            <textarea name="description" placeholder="Description" value={form.description || ''} onChange={handleChange} style={{ padding: '10px' }} />
                        </>
                    )}

                    <button type="submit" className="btn">Add</button>
                </form>
            </div>

            <div className="cards">
                {data.map((item) => (
                    <article className="card" key={item._id} style={{ position: 'relative' }}>
                        <h4>{item.title || item.role}</h4>
                        <p>{item.description || item.issuer || item.company}</p>
                        <button
                            onClick={() => handleDelete(item._id)}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Delete
                        </button>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
