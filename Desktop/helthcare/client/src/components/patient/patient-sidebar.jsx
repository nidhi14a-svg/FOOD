import { NavLink } from "react-router-dom";

export default function PatientSidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r p-6 shadow-sm">

      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        MedFlow
      </h1>

      <div className="flex flex-col gap-4">

        <NavLink
          to="/patient-dashboard"
          className={({ isActive }) =>
            `p-3 rounded-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/prescriptions"
          className={({ isActive }) =>
            `p-3 rounded-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Prescriptions
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `p-3 rounded-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Reports
        </NavLink>

        <NavLink
          to="/bills"
          className={({ isActive }) =>
            `p-3 rounded-lg font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Bills
        </NavLink>

        <NavLink
          to="/emergency"
          className={({ isActive }) =>
            `p-3 rounded-lg font-medium ${
              isActive
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-red-100"
            }`
          }
        >
          Emergency
        </NavLink>

      </div>
    </div>
  );
}