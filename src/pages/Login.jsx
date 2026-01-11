import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function Login() {
  const { login } = useData();
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(form.email, form.password, role)) {
      if (role === "admin") navigate("/admin");
      else if (role === "doctor") navigate("/doctor");
      else navigate("/patient");
    }
  };

  return (
    <div className="container flex-center" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '10px' }}>Welcome Back</h2>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>Login as {role}</p>
        
        <div style={{ display: 'flex', gap: '5px', background: '#f1f5f9', padding: '5px', borderRadius: '8px', marginBottom: '20px' }}>
          {["patient", "doctor", "admin"].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: '8px', border: 'none', background: role === r ? 'white' : 'transparent', borderRadius: '6px', cursor: 'pointer', textTransform: 'capitalize', fontWeight: '600', color: role === r ? 'var(--primary)' : '#64748b', boxShadow: role === r ? '0 2px 5px rgba(0,0,0,0.05)' : 'none' }}>{r}</button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <input className="input-field" style={{ marginBottom: '15px' }} placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} required />
          <input type="password" className="input-field" style={{ marginBottom: '20px' }} placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
          <button className="btn btn-primary btn-full">Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9rem' }}>New? <Link to="/register" style={{ color: 'var(--primary)' }}>Create Account</Link></p>
      </div>
    </div>
  );
}