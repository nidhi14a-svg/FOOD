import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { disease: "Fever", cases: 245 },
  { disease: "Diabetes", cases: 189 },
  { disease: "Hypertension", cases: 167 },
  { disease: "Respiratory", cases: 142 },
  { disease: "Cardiac", cases: 98 },
  { disease: "Allergies", cases: 76 },
];

export default function DiseasesChart() {
  return (
    <div className="rounded-2xl border p-4 shadow bg-white">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Disease Distribution</h2>
        <p className="text-sm text-gray-500">
          Cases by condition this month
        </p>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />

            <XAxis type="number" />

            <YAxis
              type="category"
              dataKey="disease"
              width={100}
            />

            <Tooltip />

            <Bar
              dataKey="cases"
              fill="#2563eb"
              radius={[0, 6, 6, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}