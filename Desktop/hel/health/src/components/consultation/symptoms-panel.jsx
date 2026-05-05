import { useState } from "react";

export default function SymptomsPanel() {
  const [symptomInput, setSymptomInput] = useState("");
  const [symptoms, setSymptoms] = useState(["Headache", "Fatigue"]);
  const [notes, setNotes] = useState("");

  const handleAddSymptom = () => {
    if (symptomInput.trim() && !symptoms.includes(symptomInput.trim())) {
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput("");
    }
  };

  const handleRemoveSymptom = (symptom) => {
    setSymptoms(symptoms.filter((s) => s !== symptom));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSymptom();
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Patient Symptoms</h2>

      {/* Input */}
      <div>
        <label className="text-sm mb-2 block">Add Symptoms</label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter symptom..."
            value={symptomInput}
            onChange={(e) => setSymptomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border p-2 rounded"
          />

          <button
            onClick={handleAddSymptom}
            className="bg-blue-500 text-white px-3 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Symptoms list */}
      {symptoms.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {symptoms.map((symptom) => (
            <div
              key={symptom}
              className="bg-gray-200 px-3 py-1 rounded flex items-center"
            >
              {symptom}
              <button
                onClick={() => handleRemoveSymptom(symptom)}
                className="ml-2 text-red-500"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      <div className="mt-4">
        <label className="text-sm mb-2 block">Clinical Notes</label>
        <textarea
          placeholder="Add notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Save button */}
      <button className="mt-4 w-full border p-2 rounded hover:bg-gray-100">
        Save Notes
      </button>
    </div>
  );
}