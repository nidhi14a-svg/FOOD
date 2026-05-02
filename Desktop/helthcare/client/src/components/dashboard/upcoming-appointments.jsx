import { Clock, Video, MapPin, MoreVertical, ChevronRight } from "lucide-react"

const appointments = [
  {
    id: 1,
    patient: "Michael Johnson",
    type: "Follow-up",
    time: "9:00 AM",
    duration: "30 min",
    mode: "in-person",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "Emily Williams",
    type: "Consultation",
    time: "10:00 AM",
    duration: "45 min",
    mode: "video",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    status: "confirmed",
  },
  {
    id: 3,
    patient: "Robert Davis",
    type: "Check-up",
    time: "11:30 AM",
    duration: "30 min",
    mode: "in-person",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    status: "pending",
  },
  {
    id: 4,
    patient: "Sarah Thompson",
    type: "ECG Review",
    time: "2:00 PM",
    duration: "20 min",
    mode: "video",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    status: "confirmed",
  },
]

export default function UpcomingAppointments() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{"Today's Appointments"}</h2>
          <p className="text-sm text-muted-foreground">Tuesday, April 29, 2026</p>
        </div>
        <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-primary transition duration-200 hover:bg-primary/10">
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="group flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4 transition duration-200 hover:bg-secondary/50"
          >
            <img
              src={appointment.avatar}
              alt={appointment.patient}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{appointment.patient}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    appointment.status === "confirmed"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{appointment.type}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {appointment.mode === "video" ? (
                  <Video className="h-4 w-4 text-primary" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                <span className="capitalize">{appointment.mode}</span>
              </div>
            </div>
            <button className="rounded-lg p-2 text-muted-foreground opacity-0 transition duration-200 hover:bg-background group-hover:opacity-100">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
