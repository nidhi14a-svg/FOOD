import { X, AlertTriangle, Calendar, History, Heart, Droplets } from "lucide-react"

export function PatientDetailsDrawer({ patient, isOpen, onClose }) {
  if (!patient) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-lg transform overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 bg-white">
          <div>
            <h2 className="text-xl font-semibold">Patient Details</h2>
            <p className="text-sm text-gray-500">ID: {patient.id}</p>
          </div>

          {/* ✅ FIXED BUTTON */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-6">

          {/* Basic Info */}
          <div className="rounded-xl border p-4 bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                {patient.name.split(" ").map((n) => n[0]).join("")}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{patient.name}</h3>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {patient.age} years
                  </span>

                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4" />
                    {patient.bloodGroup}
                  </span>
                </div>
              </div>

              {/* ✅ FIXED STATUS WITHOUT cn */}
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  patient.status === "Stable"
                    ? "bg-green-100 text-green-700"
                    : patient.status === "Critical"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {patient.status}
              </span>
            </div>
          </div>

          {/* Allergies */}
          <div className="rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h4 className="font-semibold">Allergies</h4>
            </div>

            {patient.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No known allergies</p>
            )}
          </div>

          {/* Current Conditions */}
          <div className="rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-blue-500" />
              <h4 className="font-semibold">Current Conditions</h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {patient.currentDiseases.map((disease, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600"
                >
                  {disease}
                </span>
              ))}
            </div>
          </div>

          {/* Medical History */}
          <div className="rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-2">
              <History className="h-5 w-5 text-gray-500" />
              <h4 className="font-semibold">Medical History</h4>
            </div>

            <ul className="space-y-2">
              {patient.medicalHistory.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </>
  )
}