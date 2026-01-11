import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { Shield, Activity, Clock } from "lucide-react";

export default function Home() {
  const { currentUser } = useData();

  return (
    <div className="container pt-nav">
      <div className="grid-2" style={{ alignItems: 'center', minHeight: '80vh' }}>
        <div>
          <span className="badge badge-approved" style={{ marginBottom: '15px', display: 'inline-block' }}>New: Video Consultations 🎥</span>
          <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '20px' }}>Modern Healthcare <br/><span style={{ color: 'var(--primary)' }}>Simplified.</span></h1>
          <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '30px' }}>Book appointments and connect with specialists instantly.</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            {!currentUser ? (
              <>
                <Link to="/register" className="btn btn-primary">Book Appointment</Link>
                <Link to="/login" className="btn btn-outline">Provider Login</Link>
              </>
            ) : (
              <Link to="/patient" className="btn btn-primary">Go to Dashboard</Link>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="stat-card"><div className="icon-box bg-blue"><Shield /></div><div><h3>Secure Data</h3></div></div>
          <div className="stat-card"><div className="icon-box bg-green"><Activity /></div><div><h3>Live Status</h3></div></div>
          <div className="stat-card"><div className="icon-box bg-purple"><Clock /></div><div><h3>24/7 Support</h3></div></div>
        </div>
      </div>
    </div>
  );
}