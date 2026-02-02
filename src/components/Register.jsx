import React, { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        team_name: '',
        college: '',
        leader_name: '',
        email: '',
        phone: '',
        member2: '',
        member3: '',
        member4: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        // Simulate form submission
        setTimeout(() => {
            setStatus('Registration Successful! 🎉');
            alert('Registration Successful! See you at HACKFEST 2K26!');
            setFormData({
                team_name: '', college: '', leader_name: '',
                email: '', phone: '', member2: '', member3: '', member4: ''
            });
        }, 500);
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        margin: '8px 0',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '1rem',
        outline: 'none'
    };

    return (
        <section id="register" className="container" style={{ marginBottom: '40px' }}>
            <h2 className="glow-text" style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem' }}>Team Registration</h2>

            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>

                    <div style={{ gridColumn: 'span 2' }}>
                        <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '8px', marginBottom: '15px' }}>Team Details</h3>
                    </div>

                    <div>
                        <label>Team Name *</label>
                        <input type="text" name="team_name" required style={inputStyle} value={formData.team_name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>College Name *</label>
                        <input type="text" name="college" required style={inputStyle} value={formData.college} onChange={handleChange} />
                    </div>

                    <div style={{ gridColumn: 'span 2', marginTop: '15px' }}>
                        <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '8px', marginBottom: '15px' }}>Team Leader</h3>
                    </div>

                    <div>
                        <label>Leader Name *</label>
                        <input type="text" name="leader_name" required style={inputStyle} value={formData.leader_name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Phone Number *</label>
                        <input type="tel" name="phone" required style={inputStyle} value={formData.phone} onChange={handleChange} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label>Email *</label>
                        <input type="email" name="email" required style={inputStyle} value={formData.email} onChange={handleChange} />
                    </div>

                    <div style={{ gridColumn: 'span 2', marginTop: '15px' }}>
                        <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '8px', marginBottom: '15px' }}>Team Members</h3>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <label>Member 2 Name</label>
                        <input type="text" name="member2" style={inputStyle} value={formData.member2} onChange={handleChange} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label>Member 3 Name</label>
                        <input type="text" name="member3" style={inputStyle} value={formData.member3} onChange={handleChange} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label>Member 4 Name</label>
                        <input type="text" name="member4" style={inputStyle} value={formData.member4} onChange={handleChange} />
                    </div>

                    <div style={{ gridColumn: 'span 2', marginTop: '15px', textAlign: 'center' }}>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.2rem' }}>
                            Submit Registration
                        </button>
                        {status && <p style={{ marginTop: '10px', color: status.includes('Success') ? '#4caf50' : '#f44336' }}>{status}</p>}
                    </div>

                </form>
            </div>
        </section>
    );
}
