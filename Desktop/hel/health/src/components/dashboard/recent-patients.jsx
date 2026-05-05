import { ChevronRight, AlertCircle } from "lucide-react"

const patients = [
  {
    id: 1,
    name: "James Wilson",
    age: 67,
    condition: "Atrial Fibrillation",
    lastVisit: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    risk: "high",
  },
  {
    id: 2,
    name: "Linda Martinez",
    age: 54,
    condition: "Hypertension",
    lastVisit: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    risk: "medium",
  },
  {
    id: 3,
    name: "David Brown",
    age: 45,
    condition: "Post-CABG",
    lastVisit: "3 days ago",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    risk: "low",
  },
  {
    id: 4,
    name: "Patricia Anderson",
    age: 71,
    condition: "Heart Failure",
    lastVisit: "Yesterday",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    risk: "high",
  },
  {
    id: 5,
    name: "Christopher Lee",
    age: 58,
    condition: "Coronary Artery Disease",
    lastVisit: "5 days ago",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face",
    risk: "medium",
  },
]

export default function RecentPatients() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Recent Patients</h2>
          <p className="text-sm text-muted-foreground">Latest patient activity</p>
        </div>
        <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-primary transition duration-200 hover:bg-primary/10">
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Condition</th>
                <th className="pb-3 font-medium">Last Visit</th>
                <th className="pb-3 font-medium">Risk Level</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {patients.map((patient) => (
                <tr key={patient.id} className="group transition duration-200 hover:bg-secondary/30">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.age} years old</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-foreground">{patient.condition}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-muted-foreground">{patient.lastVisit}</span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        patient.risk === "high"
                          ? "bg-destructive/10 text-destructive"
                          : patient.risk === "medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-success/10 text-success"
                      }`}
                    >
                      {patient.risk === "high" && <AlertCircle className="h-3 w-3" />}
                      {patient.risk.charAt(0).toUpperCase() + patient.risk.slice(1)}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="rounded-lg p-2 text-muted-foreground opacity-0 transition duration-200 hover:bg-background hover:text-primary group-hover:opacity-100">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
