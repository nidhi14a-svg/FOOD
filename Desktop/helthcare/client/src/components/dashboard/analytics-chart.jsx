import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
const data = [
  { day: "Mon", patients: 24 },
  { day: "Tue", patients: 18 },
  { day: "Wed", patients: 32 },
  { day: "Thu", patients: 28 },
  { day: "Fri", patients: 22 },
  { day: "Sat", patients: 15 },
  { day: "Sun", patients: 10 },
]

const total = data.reduce((acc, item) => acc + item.patients, 0)

export default function AnalyticsChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Weekly Overview</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Patient visits this week</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-card-foreground">{total}</p>
          <div className="mt-0.5 flex items-center justify-end gap-1 text-xs text-success">
            <TrendingUp className="h-3 w-3" />
            <span>+8% vs last week</span>
          </div>
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              dy={8}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: "hsl(var(--accent))", radius: 8 }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                fontSize: "12px"
              }}
              labelStyle={{ fontWeight: 600 }}
            />
            <Bar 
              dataKey="patients" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
