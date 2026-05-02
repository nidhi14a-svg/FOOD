import { AlertTriangle, Clock } from "lucide-react"

// ✅ Added local cn function (replaces "@/lib/utils")
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

const criticalPatients = [
  {
    id: "P-1001",
    name: "Robert Williams",
    condition: "Cardiac Arrest",
    status: "Critical",
    lastUpdated: "2 mins ago",
    room: "ICU-01",
  },
  {
    id: "P-1042",
    name: "Maria Santos",
    condition: "Severe Asthma Attack",
    status: "Critical",
    lastUpdated: "5 mins ago",
    room: "ER-03",
  },
  {
    id: "P-1087",
    name: "James Thompson",
    condition: "Diabetic Ketoacidosis",
    status: "High Risk",
    lastUpdated: "12 mins ago",
    room: "ICU-04",
  },
  {
    id: "P-1023",
    name: "Emily Chen",
    condition: "Anaphylactic Shock",
    status: "Critical",
    lastUpdated: "18 mins ago",
    room: "ER-01",
  },
  {
    id: "P-1056",
    name: "Michael Brown",
    condition: "Stroke Symptoms",
    status: "High Risk",
    lastUpdated: "25 mins ago",
    room: "ICU-02",
  },
]

export default function CriticalAlerts() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Critical Alerts
            </h2>
            <p className="text-sm text-muted-foreground">
              {criticalPatients.length} patients requiring immediate attention
            </p>
          </div>
        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
          {criticalPatients.length}
        </span>
      </div>

      <div className="space-y-3">
        {criticalPatients.map((patient) => (
          <div
            key={patient.id}
            className={cn(
              "group cursor-pointer rounded-xl border p-4 transition duration-200 hover:shadow-md",
              patient.status === "Critical"
                ? "border-red-200 bg-red-50 hover:border-red-300"
                : "border-amber-200 bg-amber-50 hover:border-amber-300"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">
                    {patient.name}
                  </h3>

                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      patient.status === "Critical"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    )}
                  >
                    {patient.status}
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-1 text-sm font-medium",
                    patient.status === "Critical"
                      ? "text-red-600"
                      : "text-amber-600"
                  )}
                >
                  {patient.condition}
                </p>

                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>ID: {patient.id}</span>
                  <span>Room: {patient.room}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{patient.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}