import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Pill,
  Clock,
  CheckCircle2,
  Bell,
  User,
  Calendar,
} from "lucide-react";

export default function Prescriptions() {
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const prescriptions = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      doctor: "Dr. Sarah Johnson",
      status: "active",
      takenToday: false,
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      doctor: "Dr. Michael Chen",
      status: "active",
      takenToday: true,
    },
  ];

  const filtered = prescriptions.filter((rx) => {
    const matchSearch = rx.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchFilter =
      filterStatus === "all" || rx.status === filterStatus;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-4">
        <h1 className="text-xl font-bold mb-6">MedFlow</h1>

        <nav className="space-y-2">
          <Link to="/patient-dashboard" className="block p-2 hover:bg-gray-100 rounded">
            Dashboard
          </Link>
          <Link to="/prescriptions" className="block p-2 bg-blue-500 text-white rounded">
            Prescriptions
          </Link>
          <Link to="/reports" className="block p-2 hover:bg-gray-100 rounded">
            Reports
          </Link>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            Good afternoon, Patient 👋
          </h1>

          <Bell />
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-64 mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* FILTER */}
        <div className="mb-4 space-x-2">
          <button onClick={() => setFilterStatus("all")}>All</button>
          <button onClick={() => setFilterStatus("active")}>Active</button>
          <button onClick={() => setFilterStatus("completed")}>Completed</button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            Active Prescriptions
          </div>
          <div className="bg-white p-4 rounded shadow">
            Completed
          </div>
          <div className="bg-white p-4 rounded shadow">
            Pending
          </div>
        </div>

        {/* LIST */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Prescription List</h2>

          {filtered.map((rx) => (
            <div key={rx.id} className="border p-4 rounded mb-3">
              
              <div className="flex justify-between">
                
                {/* LEFT */}
                <div>
                  <h3 className="font-semibold">{rx.name}</h3>
                  <p>{rx.dosage} - {rx.frequency}</p>
                  <p className="text-sm text-gray-500">{rx.doctor}</p>
                </div>

                {/* RIGHT */}
                <div>
                  {rx.takenToday ? (
                    <button className="bg-green-100 text-green-600 px-3 py-1 rounded">
                      Taken
                    </button>
                  ) : (
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      Mark as taken
                    </button>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}