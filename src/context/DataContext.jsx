import React, { createContext, useState, useEffect, useContext } from "react";
import { LS_KEYS, readLS, writeLS, seedDoctors, seedUsers } from "../utils/storage";
import { toast } from "react-toastify";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(readLS(LS_KEYS.CURRENT, null));
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Initialize Data if empty
    let users = readLS(LS_KEYS.USERS, []);
    if (users.length === 0) { users = seedUsers; writeLS(LS_KEYS.USERS, users); }

    let docs = readLS(LS_KEYS.DOCS, []);
    if (docs.length === 0) { docs = seedDoctors; writeLS(LS_KEYS.DOCS, docs); }
    setDoctors(docs);

    setAppointments(readLS(LS_KEYS.APPTS, []));
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => writeLS(LS_KEYS.CURRENT, currentUser), [currentUser]);
  useEffect(() => writeLS(LS_KEYS.APPTS, appointments), [appointments]);

  const login = (email, password, role) => {
    const users = readLS(LS_KEYS.USERS, []);
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    if (user) {
      setCurrentUser(user);
      toast.success(`Welcome ${user.name}`);
      return true;
    }
    toast.error("Invalid credentials");
    return false;
  };

  const register = (name, email, password) => {
    let users = readLS(LS_KEYS.USERS, []);
    if (users.find(u => u.email === email)) return false;
    const newUser = { id: "u_" + Date.now(), name, email, password, role: "patient" };
    users.push(newUser);
    writeLS(LS_KEYS.USERS, users);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => setCurrentUser(null);

  const addAppointment = (appt) => {
    setAppointments([...appointments, appt]);
    toast.success("Appointment Booked!");
  };

  const updateAppointment = (id, updates) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    toast.info("Status Updated");
  };

  return (
    <DataContext.Provider value={{ currentUser, login, register, logout, doctors, appointments, addAppointment, updateAppointment }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);