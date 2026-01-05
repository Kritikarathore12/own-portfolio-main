import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Item Component
const SortableItem = ({ id, item, handleEdit, handleDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: 'relative',
        touchAction: 'none' // Essential for pointer events on mobile/touch
    };

    return (
        <article
            ref={setNodeRef}
            style={style}
            className="card"
        >
            <div
                {...attributes}
                {...listeners}
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    cursor: 'grab',
                    fontSize: '1.5rem',
                    color: '#aaa',
                    zIndex: 10
                }}
            >
                ☰
            </div>

            <div style={{ paddingLeft: '30px' }}>
                <h4>{item.title || item.role}</h4>
                <p>{item.description || item.issuer || item.company}</p>
            </div>

            <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
                    style={{ background: '#3498db', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Edit
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                    style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Delete
                </button>
            </div>
        </article>
    );
};

const Dashboard = () => {
    const [tab, setTab] = useState('projects'); // projects, certifications, achievements, experience, contact
    const [data, setData] = useState([]);
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [editingId, setEditingId] = useState(null);
    const [activeId, setActiveId] = useState(null); // For DragOverlay if needed

    const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Prevent accidental drags when clicking buttons
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (!token) {
            navigate('/admin');
            return;
        }
        fetchData();
        setForm({});
        setEditingId(null);
    }, [tab, token, navigate]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_URL}/${tab}`);
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (active.id !== over.id) {
            const oldIndex = data.findIndex((item) => item._id === active.id);
            const newIndex = data.findIndex((item) => item._id === over.id);

            const newData = arrayMove(data, oldIndex, newIndex);
            setData(newData); // Optimistic update

            // Send reorder request to backend
            try {
                const orderIds = newData.map(item => item._id);
                await axios.put(`${API_URL}/${tab}/reorder`, { order: orderIds }, { headers: { 'x-auth-token': token } });
            } catch (err) {
                console.error('Reorder failed', err);
                fetchData(); // Revert on failure
            }
        }
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let payload = { ...form };
            if (tab === 'projects' || tab === 'achievements') {
                if (payload.techStack && typeof payload.techStack === 'string') {
                    payload.techStack = payload.techStack.split(',').map(item => item.trim());
                } else if (Array.isArray(payload.techStack)) {
                    // Already an array, no need to split
                }

                if (payload.tags && typeof payload.tags === 'string') {
                    payload.tags = payload.tags.split(',').map(item => item.trim());
                } else if (Array.isArray(payload.tags)) {
                    // Already an array
                }
            }

            if (editingId) {
                await axios.put(`${API_URL}/${tab}/${editingId}`, payload, { headers: { 'x-auth-token': token } });
                alert(`${tab} updated!`);
            } else {
                await axios.post(`${API_URL}/${tab}`, payload, { headers: { 'x-auth-token': token } });
                alert(`${tab} added!`);
            }

            setForm({});
            setEditingId(null);
            fetchData();
        } catch (err) {
            alert('Error adding/updating item');
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        // Deep copy and format arrays back to comma-separated strings for inputs
        let editForm = { ...item };
        if (editForm.techStack && Array.isArray(editForm.techStack)) {
            editForm.techStack = editForm.techStack.join(', ');
        }
        if (editForm.tags && Array.isArray(editForm.tags)) {
            editForm.tags = editForm.tags.join(', ');
        }
        setForm(editForm);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setForm({});
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

            if (tab === 'achievements') {
                const currentImages = form.images || [];
                setForm({ ...form, images: [...currentImages, res.data.filePath] });
            } else {
                setForm({ ...form, image: res.data.filePath });
            }
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
                {['projects', 'achievements', 'certifications', 'experience', 'contact'].map(t => (
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3>{editingId ? `Edit ${tab.slice(0, -1)}` : `Add New ${tab.slice(0, -1)}`}</h3>
                    {editingId && (
                        <button onClick={handleCancelEdit} style={{ background: '#95a5a6', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                            Cancel Edit
                        </button>
                    )}
                </div>

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

                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Images (Upload Multiple)</label>
                                <input type="file" onChange={handleFileChange} style={{ marginBottom: '10px' }} />
                                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                    {form.images && form.images.map((img, i) => (
                                        <div key={i} style={{ position: 'relative' }}>
                                            <img src={img} alt="uploaded" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newImages = form.images.filter((_, idx) => idx !== i);
                                                    setForm({ ...form, images: newImages });
                                                }}
                                                style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                x
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

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

                    <button type="submit" className="btn">{editingId ? 'Update' : 'Add'}</button>
                </form>
            </div>

            <div className="cards-wrapper">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                >
                    <SortableContext
                        items={data.map(item => item._id)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="cards">
                            {data.map((item) => (
                                <SortableItem
                                    key={item._id}
                                    id={item._id}
                                    item={item}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            {tab === 'contact' && (
                <div className="messages-grid" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {data.map(msg => (
                        <div key={msg._id} style={{ background: '#1e293b', padding: '20px', borderRadius: '15px', border: '1px solid #334155' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <h4 style={{ margin: 0 }}>{msg.name}</h4>
                                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{new Date(msg.date).toLocaleDateString()}</span>
                            </div>
                            <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '10px' }}>{msg.email}</div>
                            <p style={{ color: '#e2e8f0', background: '#0f172a', padding: '10px', borderRadius: '8px' }}>{msg.message}</p>
                            <button
                                onClick={() => handleDelete(msg._id)}
                                style={{ marginTop: '10px', background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
