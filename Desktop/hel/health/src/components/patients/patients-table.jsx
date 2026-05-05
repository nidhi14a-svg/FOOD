import { Eye } from "lucide-react"

// Dummy data
export const patientsData = [
  {
    id: "P001",
    name: "John Anderson",
    age: 45,
    condition: "Hypertension",
    status: "Stable",
    lastVisit: "2024-01-15",
    bloodGroup: "A+",
    allergies: ["Penicillin"],
    medicalHistory: ["Diabetes"],
    currentDiseases: ["Hypertension"],
    pastPrescriptions: [],
    visitHistory: [],
  },
  {
    id: "P002",
    name: "Maria Garcia",
    age: 32,
    condition: "Pregnancy",
    status: "Monitoring",
    lastVisit: "2024-01-20",
    bloodGroup: "B+",
    allergies: ["None"],
    medicalHistory: ["Anemia"],
    currentDiseases: ["Pregnancy"],
    pastPrescriptions: [],
    visitHistory: [],
  },
  {
    id: "P003",
    name: "Rahul Sharma",
    age: 50,
    condition: "Diabetes",
    status: "Stable",
    lastVisit: "2024-02-10",
    bloodGroup: "O+",
    allergies: ["Insulin sensitivity"],
    medicalHistory: ["Type 2 Diabetes"],
    currentDiseases: ["Diabetes"],
    pastPrescriptions: [],
    visitHistory: [],
  },
  {
    id: "P004",
    name: "Anita Verma",
    age: 28,
    condition: "Asthma",
    status: "Monitoring",
    lastVisit: "2024-02-05",
    bloodGroup: "AB+",
    allergies: ["Dust"],
    medicalHistory: ["Chronic asthma"],
    currentDiseases: ["Asthma"],
    pastPrescriptions: [],
    visitHistory: [],
  },
  {
    id: "P005",
    name: "Karan Mehta",
    age: 60,
    condition: "Cardiac Arrhythmia",
    status: "Critical",
    lastVisit: "2024-01-28",
    bloodGroup: "O-",
    allergies: ["Aspirin"],
    medicalHistory: ["Heart disease", "High BP"],
    currentDiseases: ["Arrhythmia"],
    pastPrescriptions: [],
    visitHistory: [],
  },
  {
    id: "P006",
    name: "Priya Singh",
    age: 35,
    condition: "Migraine",
    status: "Stable",
    lastVisit: "2024-02-01",
    bloodGroup: "A-",
    allergies: ["Strong smells"],
    medicalHistory: ["Chronic migraine"],
    currentDiseases: ["Migraine"],
    pastPrescriptions: [],
    visitHistory: [],
  },
  {
    id: "P007",
    name: "Amit Patel",
    age: 40,
    condition: "Allergy",
    status: "Stable",
    lastVisit: "2024-02-12",
    bloodGroup: "B-",
    allergies: ["Pollen", "Dust"],
    medicalHistory: ["Seasonal allergies"],
    currentDiseases: ["Allergic Rhinitis"],
    pastPrescriptions: [],
    visitHistory: [],
  },
  {
    id: "P008",
    name: "Neha Kapoor",
    age: 30,
    condition: "Thyroid Disorder",
    status: "Monitoring",
    lastVisit: "2024-02-08",
    bloodGroup: "AB-",
    allergies: ["None"],
    medicalHistory: ["Hypothyroidism"],
    currentDiseases: ["Thyroid Disorder"],
    pastPrescriptions: [],
    visitHistory: [],
  }
];
// Table
export function PatientsTable({ patients, onViewDetails }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="px-6 py-4 text-left text-sm font-semibold">Patient</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Age</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Condition</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Last Visit</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b hover:bg-gray-50">
                
                {/* Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                      {patient.name[0]}
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">{patient.id}</p>
                    </div>
                  </div>
                </td>

                {/* Age */}
                <td className="px-6 py-4">{patient.age}</td>

                {/* Condition */}
                <td className="px-6 py-4">{patient.condition}</td>

                {/* ✅ FIXED Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      patient.status === "Stable"
                        ? "bg-green-100 text-green-700"
                        : patient.status === "Critical"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </td>

                {/* Button */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewDetails(patient)}
                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {patients.length === 0 && (
        <div className="p-6 text-center">
          <p>No patients found</p>
        </div>
      )}
    </div>
  )
}