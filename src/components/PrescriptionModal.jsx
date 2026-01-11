import React, { useState } from "react";
import { X } from "lucide-react";

export default function PrescriptionModal({ isOpen, onClose, onSubmit, patientName }) {
  const [notes, setNotes] = useState("");
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex-between" style={{ marginBottom: '20px' }}>
          <h3>Write Prescription</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X /></button>
        </div>
        <p style={{ marginBottom: '10px', color: '#64748b' }}>Patient: <strong>{patientName}</strong></p>
        <textarea 
          className="input-field" style={{ minHeight: '120px', resize: 'none' }}
          placeholder="Rx: Medicines, Dosage, Instructions..."
          value={notes} onChange={(e) => setNotes(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={onClose} className="btn btn-outline btn-full">Cancel</button>
          <button onClick={() => { onSubmit(notes); setNotes(""); }} className="btn btn-primary btn-full">Issue Rx</button>
        </div>
      </div>
    </div>
  );
}