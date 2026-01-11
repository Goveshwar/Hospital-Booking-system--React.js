import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function Register() {
  const { register } = useData();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(form.name, form.email, form.password)) navigate("/patient");
    else alert("Email already exists");
  };

  return (
    <div className="container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2>Create Account</h2>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>Join MediSync today.</p>
        <form onSubmit={handleSubmit}>
          <input className="input-field" style={{ marginBottom: '15px' }} placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="input-field" style={{ marginBottom: '15px' }} placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} required />
          <input type="password" className="input-field" style={{ marginBottom: '20px' }} placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
          <button className="btn btn-primary btn-full">Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>Already a member? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link></p>
      </div>
    </div>
  );
}