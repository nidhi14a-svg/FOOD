import { Users, Calendar, AlertCircle, TrendingUp, TrendingDown } from "lucide-react"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const stats = [
  {
    title: "Total Patients",
    value: "1,284",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "vs last month"
  },
  {
    title: "Appointments Today",
    value: "24",
    change: "+4",
    trend: "up",
    icon: Calendar,
    description: "scheduled visits"
  },
  {
    title: "Critical Cases",
    value: "7",
    change: "-2",
    trend: "down",
    icon: AlertCircle,
    description: "requiring attention"
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-semibold tracking-tight text-card-foreground">{stat.value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-200 group-hover:bg-primary/15">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              stat.trend === "up" && stat.title !== "Critical Cases" 
                ? "bg-success/10 text-success" 
                : stat.trend === "down" && stat.title === "Critical Cases"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
            )}>
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{stat.change}</span>
            </div>
            <span className="text-xs text-muted-foreground">{stat.description}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
