import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Plus } from "lucide-react";

export default function PatientDashboard() {
  const { currentUser, doctors, appointments, addAppointment } = useData();
  const [form, setForm] = useState({ doctorId: "", date: "", time: "", reason: "" });

  const myAppts = appointments.filter(a => a.patientId === currentUser.id);

  const handleBook = (e) => {
    e.preventDefault();
    const doc = doctors.find(d => d.id === form.doctorId);
    addAppointment({
      id: "apt_" + Date.now(),
      patientId: currentUser.id,
      patientName: currentUser.name,
      doctorId: doc.id,
      doctorName: doc.name,
      specialty: doc.specialty,
      date: form.date, time: form.time, reason: form.reason, status: "Pending"
    });
    setForm({ doctorId: "", date: "", time: "", reason: "" });
  };

  return (
    <div className="container pt-nav grid-3" style={{ gridTemplateColumns: '1fr 2fr' }}>
      <div className="card" style={{ height: 'fit-content' }}>
        <h3><Plus size={18} /> New Appointment</h3>
        <form onSubmit={handleBook} style={{ marginTop: '20px' }}>
          <select className="input-field" style={{ marginBottom: '15px' }} value={form.doctorId} onChange={e => setForm({...form, doctorId: e.target.value})} required>
            <option value="">Select Doctor</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>)}
          </select>
          <input type="date" className="input-field" style={{ marginBottom: '15px' }} value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
          <input type="time" className="input-field" style={{ marginBottom: '15px' }} value={form.time} onChange={e => setForm({...form, time: e.target.value})} required />
          <textarea className="input-field" style={{ marginBottom: '20px' }} placeholder="Reason" value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} />
          <button className="btn btn-primary btn-full">Book Now</button>
        </form>
      </div>

      <div className="flex-col">
        <h2>Your Appointments</h2>
        {myAppts.length === 0 && <p style={{ color: '#64748b' }}>No history found.</p>}
        {myAppts.map(a => (
          <div key={a.id} className="card flex-between">
            <div>
              <h3>{a.doctorName}</h3>
              <p style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>{a.specialty}</p>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '5px' }}>{a.date} at {a.time}</p>
              {a.prescription && <div style={{ background: '#f0fdf4', color: '#166534', padding: '10px', marginTop: '10px', borderRadius: '8px', fontSize: '0.9rem' }}><strong>Rx:</strong> {a.prescription}</div>}
            </div>
            <span className={`badge badge-${a.status.toLowerCase()}`}>{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}