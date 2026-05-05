import { TrendingUp } from "lucide-react"

const data = [
  { day: "Mon", appointments: 18, patients: 12 },
  { day: "Tue", appointments: 24, patients: 16 },
  { day: "Wed", appointments: 20, patients: 14 },
  { day: "Thu", appointments: 28, patients: 19 },
  { day: "Fri", appointments: 22, patients: 15 },
  { day: "Sat", appointments: 8, patients: 6 },
  { day: "Sun", appointments: 4, patients: 3 },
]

const maxValue = Math.max(...data.map((d) => d.appointments))

export default function ActivityChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Weekly Activity</h2>
          <p className="text-sm text-muted-foreground">Appointments & patient visits</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Appointments</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-chart-2" />
            <span className="text-sm text-muted-foreground">Patients</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between gap-2 h-[200px]" >
          {data.map((item) => (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-col items-center gap-1">
                <div
                  className="w-full max-w-[32px] rounded-t-lg bg-primary transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(item.appointments / maxValue) * 100}px` }}
                />
                <div
                  className="w-full max-w-[32px] rounded-t-lg bg-chart-2 transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(item.patients / maxValue) * 150}px` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl bg-success/10 p-3">
        <TrendingUp className="h-5 w-5 text-success" />
        <p className="text-sm text-foreground">
          <span className="font-medium text-success">+15%</span> increase in appointments this week
        </p>
      </div>
    </div>
  )
}
