
import { MoreHorizontal, ArrowRight } from "lucide-react"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const patients = [
  { id: 1, name: "John Anderson", age: 45, disease: "Hypertension", status: "stable", lastVisit: "Today" },
  { id: 2, name: "Emma Thompson", age: 32, disease: "Diabetes Type 2", status: "monitoring", lastVisit: "Yesterday" },
  { id: 3, name: "Michael Chen", age: 58, disease: "Cardiac Arrhythmia", status: "critical", lastVisit: "2 days ago" },
  { id: 4, name: "Sarah Williams", age: 29, disease: "Asthma", status: "stable", lastVisit: "3 days ago" },
  { id: 5, name: "Robert Davis", age: 67, disease: "COPD", status: "monitoring", lastVisit: "1 week ago" },
]

const statusConfig = {
  stable: { 
    bg: "bg-success/10", 
    text: "text-success",
    dot: "bg-success"
  },
  monitoring: { 
    bg: "bg-warning/10", 
    text: "text-warning-foreground",
    dot: "bg-warning"
  },
  critical: { 
    bg: "bg-destructive/10", 
    text: "text-destructive",
    dot: "bg-destructive"
  },
}

export default function PatientTable() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Recent Patients</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">View and manage patient records</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90">
            View All
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Condition</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Last Visit</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patients.map((patient) => {
              const status = statusConfig[patient.status]
              return (
                <tr 
                  key={patient.id}
                  className="transition-colors duration-200 hover:bg-muted/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-medium text-primary">
                          {patient.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <span className="font-medium text-card-foreground">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{patient.age} yrs</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{patient.disease}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                      status.bg,
                      status.text
                    )}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{patient.lastVisit}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:bg-accent ml-auto">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
