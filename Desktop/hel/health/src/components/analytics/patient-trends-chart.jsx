import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", patients: 420 },
  { month: "Feb", patients: 380 },
  { month: "Mar", patients: 510 },
  { month: "Apr", patients: 470 },
  { month: "May", patients: 590 },
  { month: "Jun", patients: 620 },
  { month: "Jul", patients: 680 },
];

export default function PatientTrendsChart() {
  return (
    <div className="rounded-2xl border p-4 shadow bg-white">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Patient Trends</h2>
        <p className="text-sm text-gray-500">
          Monthly patient visits over time
        </p>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="patients"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}