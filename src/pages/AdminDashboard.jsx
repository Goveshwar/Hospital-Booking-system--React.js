import React from "react";
import { useData } from "../context/DataContext";
import { Users, Calendar, Clock, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const { appointments, updateAppointment } = useData();

  return (
    <div className="container pt-nav">
      <h1 style={{ marginBottom: '30px' }}>Admin Overview</h1>
      <div className="grid-3" style={{ marginBottom: '40px', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card"><div className="icon-box bg-blue"><Calendar /></div><div><h3>{appointments.length}</h3><p>Total</p></div></div>
        <div className="stat-card"><div className="icon-box bg-orange"><Clock /></div><div><h3>{appointments.filter(a => a.status === 'Pending').length}</h3><p>Pending</p></div></div>
        <div className="stat-card"><div className="icon-box bg-green"><CheckCircle /></div><div><h3>{appointments.filter(a => a.status === 'Completed').length}</h3><p>Done</p></div></div>
        <div className="stat-card"><div className="icon-box bg-purple"><Users /></div><div><h3>3</h3><p>Doctors</p></div></div>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <h3 style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>Manage Appointments</h3>
        <table>
          <thead><tr><th>Patient</th><th>Doctor</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id}>
                <td>{a.patientName}</td>
                <td>{a.doctorName}</td>
                <td><span className={`badge badge-${a.status.toLowerCase()}`}>{a.status}</span></td>
                <td>
                  {a.status === "Pending" && (
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button onClick={() => updateAppointment(a.id, { status: "Approved" })} className="btn btn-success" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>Approve</button>
                      <button onClick={() => updateAppointment(a.id, { status: "Cancelled" })} className="btn btn-danger" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>Cancel</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}