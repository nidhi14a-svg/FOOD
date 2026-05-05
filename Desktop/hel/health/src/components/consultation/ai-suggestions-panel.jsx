export default function AISuggestionsPanel() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
      {/* Title */}
      <h2 className="text-lg font-semibold text-blue-900 mb-4">
        ✨ AI Diagnostic Suggestions
      </h2>

      {/* Suggested Diagnosis */}
      <div className="p-4 bg-white rounded-xl border border-blue-100 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            🧠
          </div>

          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <h4 className="text-sm font-semibold text-blue-900">
                Suggested Diagnosis
              </h4>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                AI Powered
              </span>
            </div>

            <p className="text-base font-medium mb-1">
              Tension-Type Headache
            </p>

            {/* Confidence Bar */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-500">Confidence:</span>

              <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: "87%" }}
                ></div>
              </div>

              <span className="text-sm font-semibold text-blue-700">
                87%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternatives */}
      <div className="p-4 bg-white rounded-xl border border-blue-100 mb-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          Alternative Considerations
        </h4>

        <ul className="space-y-2">
          <li className="flex justify-between text-sm">
            <span>Migraine without aura</span>
            <span className="text-gray-500">62%</span>
          </li>

          <li className="flex justify-between text-sm">
            <span>Chronic fatigue syndrome</span>
            <span className="text-gray-500">45%</span>
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="flex gap-2 p-3 bg-blue-100 rounded-lg">
        <span>⚠️</span>
        <p className="text-xs text-blue-800">
          <b>Disclaimer:</b> AI suggestions are for reference only and should not
          replace professional medical judgment.
        </p>
      </div>
    </div>
  );
}