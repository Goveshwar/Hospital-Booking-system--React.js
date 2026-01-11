import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="stat-card">
      <div className={`icon-box bg-${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: "800", margin: 0 }}>{value}</h3>
        <p style={{ color: "var(--secondary)", margin: 0 }}>{title}</p>
      </div>
    </motion.div>
  );
}