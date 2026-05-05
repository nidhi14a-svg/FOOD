import { TrendingUp, AlertCircle } from "lucide-react";

export default function InsightCard() {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow">
      <div className="flex items-start gap-4">
        
        {/* Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
          <TrendingUp className="h-5 w-5 text-green-600" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-green-900">
              Health Trend Alert
            </h3>

            <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-700">
              Insight
            </span>
          </div>

          <p className="mt-2 text-green-800">
            Fever cases increased by 25% this week
          </p>

          <p className="mt-1 text-sm text-green-600">
            Consider reviewing preventive measures and patient outreach for seasonal illness management.
          </p>
        </div>

        {/* Button */}
        <button className="rounded-lg p-2 text-green-600 hover:bg-green-100 transition">
          <AlertCircle className="h-5 w-5" />
        </button>

      </div>
    </div>
  );
}