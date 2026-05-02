import { TrendingUp, AlertTriangle, Lightbulb, ArrowUpRight } from "lucide-react"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const insights = [
  {
    icon: AlertTriangle,
    title: "Fever Cases Alert",
    description:"fever cases increased by 25% this week compared to last week",
    type:"warning",
    action: "Review Cases",
  },
  {
    icon: TrendingUp,
    title: "Appointment Growth",
    description: "Your appointment bookings have grown by 18% this month.",
    type: "success",
    action: "View Details",
  },
]

export default function InsightCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">AI Insights</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Smart recommendations</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`group rounded-xl p-4 transition-all duration-200 ${
  insight.type === "warning"
    ? "bg-warning/10 border border-warning/20 hover:border-warning/40"
    : "bg-success/10 border border-success/20 hover:border-success/40"
}`}
          >
            <div className="flex gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                insight.type === "warning" ? "bg-warning/20" : "bg-success/20"
              }`}>
                <insight.icon className={`h-4 w-4 ${
                  insight.type === "warning" ? "text-warning-foreground" : "text-success"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm font-medium ${
                    insight.type === "warning" ? "text-warning-foreground" : "text-success"
                  }`}>
                    {insight.title}
                  </h3>
                  <button className={`flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                    insight.type === "warning" ? "text-warning-foreground" : "text-success"
                  }`}>
                    {insight.action}
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 rounded-xl bg-accent/50 p-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Pro tip:</span> Review critical cases daily for better patient outcomes.
        </p>
      </div>
    </div>
  )
}
