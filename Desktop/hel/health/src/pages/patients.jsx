import { useState, useMemo } from "react"
import Sidebar  from "../components/dashboard/sidebar"
import  Header  from "../components/dashboard/header"
import { PatientsTable, patientsData } from "../components/patients/patients-table"
import { PatientsFilters } from "../components/patients/patients-filters"
import { PatientDetailsDrawer } from "../components/patients/patient-details-drawer"

export default function PatientsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [ageFilter, setAgeFilter] = useState("")
  const [conditionFilter, setConditionFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setTimeout(() => setSelectedPatient(null), 300)
  }

  const filteredPatients = useMemo(() => {
    return patientsData.filter((patient) => {
      const matchesSearch =
        searchQuery === "" ||
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchQuery.toLowerCase())

      let matchesAge = true
      if (ageFilter) {
        if (ageFilter === "0-30") matchesAge = patient.age <= 30
        else if (ageFilter === "31-50") matchesAge = patient.age >= 31 && patient.age <= 50
        else if (ageFilter === "51-70") matchesAge = patient.age >= 51 && patient.age <= 70
        else if (ageFilter === "71+") matchesAge = patient.age >= 71
      }

      const matchesCondition =
        conditionFilter === "" || patient.condition === conditionFilter

      const matchesStatus =
        statusFilter === "" || patient.status === statusFilter

      return matchesSearch && matchesAge && matchesCondition && matchesStatus
    })
  }, [searchQuery, ageFilter, conditionFilter, statusFilter])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Header 
  title="Patients"
  subtitle="Welcome back, Dr. Sarah"
/>

      <main
        className={`pt-0 transition-all duration-200 ${
          sidebarCollapsed ? "pl-20" : "pl-64"
        }`}
      >
        <div className="p-6">
          <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Patients</h1>
                <p className="text-sm text-muted-foreground">
                  View and manage patient records
                </p>
              </div>
            </div>

            {/* Filters */}
            <PatientsFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              ageFilter={ageFilter}
              onAgeFilterChange={setAgeFilter}
              conditionFilter={conditionFilter}
              onConditionFilterChange={setConditionFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />

            {/* Count */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredPatients.length} of {patientsData.length} patients
            </p>

            {/* Table */}
            <PatientsTable
              patients={filteredPatients}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </main>

      {/* Drawer */}
      <PatientDetailsDrawer
        patient={selectedPatient}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  )
}