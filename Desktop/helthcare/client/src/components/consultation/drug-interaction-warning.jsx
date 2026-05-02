export default function DrugInteractionWarning() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
      {/* Title */}
      <h2 className="text-lg font-semibold text-red-900 mb-4">
        🚨 Drug Interaction Alert
      </h2>

      {/* Main Warning */}
      <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-red-200 mb-4">
        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
          ⚠️
        </div>

        <div className="flex-1">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            High Risk
          </span>

          <p className="text-sm font-medium text-red-900 mt-2 mb-1">
            Drug interaction detected
          </p>

          <p className="text-sm text-red-700">
            <b>Warfarin + Aspirin:</b> Concurrent use may significantly increase
            bleeding risk. Consider alternative therapy or adjust dosing.
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-3 bg-red-100 rounded-lg">
        <h4 className="text-sm font-semibold text-red-900 mb-2">
          Recommended Actions
        </h4>

        <ul className="space-y-2 text-sm text-red-800">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            Review patient bleeding history
          </li>

          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            Consider INR monitoring frequency
          </li>

          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            Evaluate alternative medications
          </li>
        </ul>
      </div>
    </div>
  );
}