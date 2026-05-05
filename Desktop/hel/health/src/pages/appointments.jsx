import { Plus, Search } from "lucide-react";
import { useState } from "react";
/* ------------------ DUMMY DATA ------------------ */
import Sidebar from "../components/dashboard/sidebar";
import Header from "../components/dashboard/header";
const todayAppointments = [
  {
    time: "09:00 AM",
    name: "John Anderson",
    reason: "Hypertension Checkup",
    status: "completed",
  },
  {
    time: "10:30 AM",
    name: "Maria Garcia",
    reason: "Diabetes Follow-up",
    status: "pending",
  },
  {
    time: "11:45 AM",
    name: "Rahul Sharma",
    reason: "Annual Physical",
    status: "missed",
  },
  {
    time: "02:00 PM",
    name: "Emily Chen",
    reason: "Post-Surgery Review",
    status: "pending",
  },
];

const upcomingAppointments = [
  {
    section: "Tomorrow",
    data: [
      {
        time: "09:30 AM",
        name: "Anita Verma",
        reason: "Cardiac Assessment",
        status: "pending",
      },
      {
        time: "11:00 AM",
        name: "James Wilson",
        reason: "Medication Review",
        status: "pending",
      },
    ],
  },
  {
    section: "This Week",
    data: [
      {
        time: "10:00 AM",
        name: "Sophie Taylor",
        reason: "Respiratory Checkup",
        status: "pending",
      },
      {
        time: "03:30 PM",
        name: "Robert Martinez",
        reason: "Lab Results Discussion",
        status: "pending",
      },
    ],
  },
];

/* ------------------ STATUS BADGE ------------------ */

function StatusBadge({ status }) {
  const styles = {
    completed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    missed: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

/* ------------------ ROW ------------------ */

function AppointmentRow({ item }) {
  return (
    <div className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50 transition">
      <div className="flex gap-4 items-center">
        <div className="text-sm text-gray-500 w-20">{item.time}</div>

        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-500">{item.reason}</p>
        </div>
      </div>

      <StatusBadge status={item.status} />
    </div>
  );
}

/* ------------------ MAIN PAGE ------------------ */

export default function AppointmentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Header */}
      <Header sidebarCollapsed={sidebarCollapsed} />

      {/* Main Content */}
      <main
        className={`pt-0 transition-all duration-200 ${
          sidebarCollapsed ? "pl-20" : "pl-64"
        }`}
      >
        <div className="p-6 space-y-6">

          {/* Page Header */}
          <div className="flex justify-between items-center">

  {/* LEFT SIDE */}
  <div>
    <h1 className="text-2xl font-semibold">Appointments</h1>
    <p className="text-sm text-gray-500">
      Manage your daily and upcoming patient visits
    </p>
  </div>

  {/* RIGHT SIDE (SEARCH BAR) */}
  <div className="flex items-center gap-2 border px-3 py-2 rounded-xl w-72">
    <Search className="h-4 w-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search appointments..."
      className="outline-none w-full text-sm"
    />
  </div>

</div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* TODAY */}
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h2 className="font-semibold mb-1">Today's Schedule</h2>
            <p className="text-sm text-gray-500 mb-4">
              {todayAppointments.length} appointments scheduled
            </p>

            <div className="space-y-3">
              {todayAppointments.map((item, i) => (
                <AppointmentRow key={i} item={item} />
              ))}
            </div>
          </div>

          {/* UPCOMING */}
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h2 className="font-semibold mb-4">Upcoming Appointments</h2>

            {upcomingAppointments.map((section, i) => (
              <div key={i} className="mb-6">
                <p className="text-sm text-gray-500 mb-2">
                  {section.section}
                </p>

                <div className="space-y-3">
                  {section.data.map((item, j) => (
                    <AppointmentRow key={j} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (STATS) */}
        <div className="space-y-6">

          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h3 className="font-semibold mb-4">Quick Stats</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Total Today</span>
                <span className="font-medium">4</span>
              </div>

              <div className="flex justify-between">
                <span>Completed</span>
                <span className="text-green-600 font-medium">1</span>
              </div>

              <div className="flex justify-between">
                <span>Pending</span>
                <span className="text-yellow-600 font-medium">3</span>
              </div>

              <div className="flex justify-between">
                <span>Missed</span>
                <span className="text-red-600 font-medium">1</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
      </main>
    </div>
  );
}