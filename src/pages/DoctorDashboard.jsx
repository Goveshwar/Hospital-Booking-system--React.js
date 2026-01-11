import React, { useState } from "react";
import { useData } from "../context/DataContext";
import PrescriptionModal from "../components/PrescriptionModal";

export default function DoctorDashboard() {
  const { currentUser, appointments, updateAppointment } = useData();
  const [selectedAppt, setSelectedAppt] = useState(null);

  const myAppts = appointments.filter(a => a.doctorName === currentUser.name);

  const handleComplete = (notes) => {
    updateAppointment(selectedAppt.id, { status: "Completed", prescription: notes });
    setSelectedAppt(null);
  };

  return (
    <div className="container pt-nav">
      <div className="flex-between" style={{ marginBottom: '30px' }}>
        <h1>Doctor Dashboard</h1>
        <div className="card" style={{ padding: '10px 20px' }}>Total Patients: <strong>{myAppts.length}</strong></div>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table>
          <thead><tr><th>Patient</th><th>Date</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {myAppts.map(a => (
              <tr key={a.id}>
                <td>{a.patientName}</td>
                <td>{a.date} {a.time}</td>
                <td>{a.reason}</td>
                <td><span className={`badge badge-${a.status.toLowerCase()}`}>{a.status}</span></td>
                <td>
                  {a.status === "Approved" ? (
                    <button onClick={() => setSelectedAppt(a)} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>Consult</button>
                  ) : <span>-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PrescriptionModal isOpen={!!selectedAppt} onClose={() => setSelectedAppt(null)} onSubmit={handleComplete} patientName={selectedAppt?.patientName} />
    </div>
  );
}