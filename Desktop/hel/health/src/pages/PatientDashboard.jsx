import React from "react";
import { Bell, Calendar, FileText, Pill, Receipt } from "lucide-react";
import PatientSidebar from "../components/patient/patient-sidebar";
export default function PatientDashboard() {
  return (
    
    <div className="flex min-h-screen bg-[#f6f8fb]">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-600 mb-8">MedFlow</h1>

          
        </div>

        <div className="text-sm text-gray-500">
          <p>⚙ Settings</p>
          <p>↩ Logout</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Good afternoon, John Doe 👋
            </h2>
            <p className="text-gray-500 text-sm">
              Here's your health overview
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="text-gray-500" />
            <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
              JD
            </div>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-4 gap-5 mb-6">

          <Card icon={<Calendar />} title="Appointments" value="3" color="blue" />
          <Card icon={<Pill />} title="Prescriptions" value="5" color="green" />
          <Card icon={<FileText />} title="Reports" value="8" color="purple" />
          <Card icon={<Receipt />} title="Pending Bills" value="2" color="orange" />

        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-3 gap-6">

          {/* APPOINTMENTS */}
          <div className="col-span-2 bg-white p-5 rounded-xl shadow-sm border">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-gray-700">
                Upcoming Appointments
              </h3>
              <span className="text-blue-500 text-sm cursor-pointer">View all</span>
            </div>

            <Appointment name="Dr. Sarah Johnson" time="Today • 2:30 PM" status="Confirmed" initials="DSJ" />
            <Appointment name="Dr. Michael Chen" time="Tomorrow • 10:00 AM" status="Pending" initials="DMC" />
            <Appointment name="Dr. Emily White" time="May 8 • 3:00 PM" status="Confirmed" initials="DEW" />
          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-700 mb-4">
              Notifications
            </h3>

            <Notification text="Prescription refill due in 3 days" color="blue" />
            <Notification text="Upcoming appointment tomorrow" color="yellow" />
            <Notification text="New lab report available" color="green" />
          </div>

        </div>
      </div>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ icon, title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4">
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-lg font-bold">{value}</h3>
      </div>
    </div>
  );
}

/* APPOINTMENT */
function Appointment({ name, time, status, initials }) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
          {initials}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">Specialist</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-500">{time}</p>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            status === "Confirmed"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

/* NOTIFICATION */
function Notification({ text, color }) {
  return (
    <div className={`p-3 mb-3 rounded border-l-4 bg-${color}-50 border-${color}-500`}>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}