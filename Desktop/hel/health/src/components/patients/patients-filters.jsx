import { Search, ChevronDown } from "lucide-react"

export function PatientsFilters({
  searchQuery,
  onSearchChange,
  ageFilter,
  onAgeFilterChange,
  conditionFilter,
  onConditionFilterChange,
  statusFilter,
  onStatusFilterChange,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">

        {/* Age */}
        <div className="relative">
          <select
            value={ageFilter}
            onChange={(e) => onAgeFilterChange(e.target.value)}
            className="h-10 appearance-none rounded-xl border border-border bg-background pl-4 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Ages</option>
            <option value="0-30">0-30 years</option>
            <option value="31-50">31-50 years</option>
            <option value="51-70">51-70 years</option>
            <option value="71+">71+ years</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Condition */}
        <div className="relative">
          <select
            value={conditionFilter}
            onChange={(e) => onConditionFilterChange(e.target.value)}
            className="h-10 appearance-none rounded-xl border border-border bg-background pl-4 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Conditions</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Heart Disease">Heart Disease</option>
            <option value="Pregnancy">Pregnancy</option>
            <option value="Anxiety">Anxiety</option>
            <option value="Migraine">Migraine</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Status */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="h-10 appearance-none rounded-xl border border-border bg-background pl-4 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Status</option>
            <option value="Stable">Stable</option>
            <option value="Critical">Critical</option>
            <option value="Monitoring">Monitoring</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

      </div>
    </div>
  )
}