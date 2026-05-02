import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  BarChart3, 
  AlertTriangle,
  Activity,
  Settings,
  Calendar,
  HelpCircle
} from "lucide-react"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { Link } from "react-router-dom";
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Calendar, label: "Appointments", path: "/appointments" },
  { icon: Users, label: "Patients", path: "/patients" },
  { icon: Stethoscope, label: "Consultation", path: "/consultation" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: AlertTriangle, label: "Emergency", path: "/emergency" },
];

const bottomNavItems = [
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help & Support" },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
          <Activity className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-foreground">MedCare</span>
      </div>
      
      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Menu
        </p>
        {navItems.map((item) => {
  const isEmergency = item.label === "Emergency"

  return (
    <Link
      key={item.label}
      to={item.path}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-md text-sm transition",
        isEmergency
          ? "text-red-600 bg-red-50 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      <item.icon
        className={cn(
          "h-5 w-5",
          isEmergency ? "text-red-600" : "text-gray-500"
        )}
      />
      {item.label}
    </Link>
  )
})}
      </nav>
      
      {/* Bottom Navigation */}
      <div className="border-t border-border px-3 py-4">
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>
        
        {/* Help Card */}
        <div className="mt-4 rounded-xl border border-border bg-accent/50 p-4">
          <p className="text-sm font-medium text-foreground">Need Help?</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Contact support for assistance with your dashboard.
          </p>
          <button className="mt-3 w-full rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-all duration-200 hover:opacity-90">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  )
}
