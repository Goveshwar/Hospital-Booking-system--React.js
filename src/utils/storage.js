export const LS_KEYS = {
  USERS: "medisync_users",
  CURRENT: "medisync_current",
  DOCS: "medisync_docs",
  APPTS: "medisync_appts",
};

export const seedDoctors = [
  { id: "d1", name: "Dr. Asha Kulkarni", specialty: "Cardiologist", location: "Pune" },
  { id: "d2", name: "Dr. Rohan Desai", specialty: "Dermatologist", location: "Mumbai" },
  { id: "d3", name: "Dr. Neha Sharma", specialty: "Pediatrician", location: "Bangalore" },
];

export const seedUsers = [
  { id: "admin1", name: "Super Admin", email: "admin@hospital.com", password: "123", role: "admin" },
  // This user links to Doctor d1
  { id: "u_doc1", name: "Dr. Asha Kulkarni", email: "dr.asha@hospital.com", password: "123", role: "doctor", linkedDocId: "d1" } 
];

export const readLS = (key, fallback) => {
  try { return JSON.parse(window.localStorage.getItem(key)) || fallback; } catch { return fallback; }
};
export const writeLS = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));