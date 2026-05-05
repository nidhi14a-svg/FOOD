import { Brain, AlertTriangle, TrendingUp, Lightbulb, ChevronRight } from "lucide-react"

const insights = [
  {
    type: "warning",
    icon: AlertTriangle,
    title: "High-Risk Patient Alert",
    description: "3 patients show elevated cardiovascular risk markers requiring immediate attention.",
    action: "Review Patients",
    urgent: true,
  },
  {
    type: "trend",
    icon: TrendingUp,
    title: "Treatment Effectiveness",
    description: "Beta-blocker therapy showing 23% better outcomes in your patient cohort.",
    action: "View Analysis",
    urgent: false,
  },
  {
    type: "suggestion",
    icon: Lightbulb,
    title: "Schedule Optimization",
    description: "AI suggests rescheduling 4 follow-ups to reduce wait times by 18%.",
    action: "Optimize Schedule",
    urgent: false,
  },
]

export default function AIInsights() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI Insights</h2>
          <p className="text-sm text-muted-foreground">Powered by MedFlow AI</p>
        </div>
        <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          3 New
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`group flex items-start gap-4 rounded-xl p-4 transition duration-200 ${
              insight.urgent
                ? "border border-warning/30 bg-warning/5 hover:bg-warning/10"
                : "border border-border bg-secondary/30 hover:bg-secondary/50"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                insight.urgent ? "bg-warning/20" : "bg-primary/10"
              }`}
            >
              <insight.icon
                className={`h-5 w-5 ${insight.urgent ? "text-warning" : "text-primary"}`}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{insight.title}</h3>
                {insight.urgent && (
                  <span className="rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning">
                    Urgent
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
            </div>
            <button className="flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-primary transition duration-200 hover:bg-primary/10">
              {insight.action}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
