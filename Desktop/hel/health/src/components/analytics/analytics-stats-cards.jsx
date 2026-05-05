import { Users, Activity, Stethoscope } from "lucide-react";

const stats = [
  {
    name: "Total Patients",
    value: "2,847",
    change: "+12%",
    changeType: "positive",
    icon: Users,
  },
  {
    name: "Active Cases",
    value: "438",
    change: "+8%",
    changeType: "positive",
    icon: Activity,
  },
  {
    name: "Consultations Today",
    value: "56",
    change: "-3%",
    changeType: "negative",
    icon: Stethoscope,
  },
];

export default function AnalyticsStatsCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="overflow-hidden rounded-2xl border p-6 shadow bg-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {stat.name}
              </p>
              <p className="mt-2 text-3xl font-bold">
                {stat.value}
              </p>
              <p
                className={`mt-1 text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {stat.change} from last month
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <stat.icon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}