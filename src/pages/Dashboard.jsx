import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/api';
import { Trash2, Edit3, Plus, CheckCircle, Circle } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            const { data } = await fetchTasks();
            setTasks(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createTask(newTask);
            setNewTask({ title: '', description: '' });
            getTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleStatus = async (task) => {
        try {
            const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
            await updateTask(task._id, { status: newStatus });
            getTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            getTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Add New Task</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'start' }}>
                    <input
                        type="text"
                        placeholder="Task Title"
                        required
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description (Optional)"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary"><Plus size={20} /> Add</button>
                </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {tasks.map((task) => (
                    <div key={task._id} className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h4 style={{ textDecoration: task.status === 'Completed' ? 'line-through' : 'none', color: task.status === 'Completed' ? 'var(--text-muted)' : 'var(--text)' }}>
                                {task.title}
                            </h4>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => handleToggleStatus(task)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: task.status === 'Completed' ? '#10b981' : 'var(--text-muted)' }}>
                                    {task.status === 'Completed' ? <CheckCircle size={20} /> : <Circle size={20} />}
                                </button>
                                <button onClick={() => handleDelete(task._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{task.description}</p>
                        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: task.status === 'Completed' ? '#10b981' : '#f59e0b' }}>
                            ● {task.status}
                        </div>
                    </div>
                ))}
            </div>
            {tasks.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>
                    <p>No tasks found. Start by adding one!</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
