import { Bell, Search, ChevronDown } from "lucide-react"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex flex-col ">
        
  <h1 className="text-lg font-semibold">Dashboard</h1>
  <p className="text-sm text-muted-foreground">
    Welcome back, Dr. sarah
  </p>
</div>
    
      
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search patients..."
            className="h-9 w-56 rounded-lg border border-border bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
  + New Appointment
</button>
        </div>
        
        {/* Notification */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all duration-200 hover:bg-accent hover:border-accent">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
            3
          </span>
        </button>
        
        {/* Divider */}
        <div className="hidden h-6 w-px bg-border md:block" />
        
        {/* Profile */}
        <button className="flex items-center gap-2 rounded-lg p-1 transition-all duration-200 hover:bg-accent">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-xs font-medium text-primary-foreground">SW</span>
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-foreground">Dr. Sarah Wilson</p>
            <p className="text-xs text-muted-foreground">Cardiologist</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
        </button>
      </div>
    </header>
  )
}
