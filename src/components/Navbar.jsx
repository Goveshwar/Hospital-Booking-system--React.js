import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { Heart, LogOut } from "lucide-react";

export default function Navbar() {
  const { currentUser, logout } = useData();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="brand"><Heart fill="currentColor" /> MediSync</Link>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {currentUser ? (
            <>
              <span style={{ fontWeight: 600 }}>Hi, {currentUser.name} ({currentUser.role})</span>
              <button onClick={() => { logout(); navigate("/"); }} className="btn btn-outline"><LogOut size={16}/> Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}