import { useState } from "react"
import  Sidebar  from "../components/dashboard/sidebar"
import  Header  from "../components/dashboard/header"
import  SymptomsPanel  from "../components/consultation/symptoms-panel"
import  PrescriptionForm  from "../components/consultation/prescription-form"
import  AISuggestionsPanel  from "../components/consultation/ai-suggestions-panel"
import  DrugInteractionWarning  from "../components/consultation/drug-interaction-warning"

export default function ConsultationPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [prescriptions, setPrescriptions] = useState([])
  const handleAddPrescription = (medicine, dosage) => {
    setPrescriptions([...prescriptions, { medicine, dosage }])
  }

  const hasInteraction = prescriptions.some(
    (p) => p.medicine.toLowerCase().includes("warfarin")
  ) && prescriptions.some(
    (p) => p.medicine.toLowerCase().includes("aspirin")
  )

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"}`}>
        <Header />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Patient Consultation</h1>
            <p className="text-muted-foreground mt-1">Document symptoms, prescribe medications, and review AI-powered insights</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <SymptomsPanel />
            </div>

            {/* Center Column */}
            <div className="space-y-6">
              <PrescriptionForm 
                onAddPrescription={handleAddPrescription}
                prescriptions={prescriptions}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <AISuggestionsPanel />
              {hasInteraction && <DrugInteractionWarning />}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
