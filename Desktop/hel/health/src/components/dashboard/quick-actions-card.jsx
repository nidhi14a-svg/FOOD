import { Plus, FileText, Pill, Calendar, Video, ClipboardList } from "lucide-react";
import { cn } from "../../lib/utils"; // ⚠️ adjust path if needed

const actions = [
  {
    name: "New Patient",
    icon: Plus,
    color: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    name: "Add Record",
    icon: FileText,
    color: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  {
    name: "Prescribe",
    icon: Pill,
    color: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  {
    name: "Schedule",
    icon: Calendar,
    color: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  {
    name: "Video Call",
    icon: Video,
    color: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  {
    name: "New Task",
    icon: ClipboardList,
    color: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
];

// ✅ converted to default export (fixes your error)
export default function QuickActionsCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.name}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl p-4 transition duration-200",
              action.color
            )}
          >
            <action.icon className="h-5 w-5" />
            <span className="text-sm font-medium">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}