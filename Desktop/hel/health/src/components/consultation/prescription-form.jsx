import { useState } from "react";

export default function PrescriptionForm({ onAddPrescription, prescriptions }) {
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (medicine.trim() && dosage.trim()) {
      onAddPrescription(medicine.trim(), dosage.trim());
      setMedicine("");
      setDosage("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Prescription</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Medicine Input */}
        <div>
          <label className="block text-sm mb-1">Medicine Name</label>
          <input
            type="text"
            placeholder="Enter medicine name..."
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Dosage Input */}
        <div>
          <label className="block text-sm mb-1">Dosage</label>
          <input
            type="text"
            placeholder="Enter dosage..."
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Prescription
        </button>
      </form>

      {/* List of prescriptions */}
      <div className="mt-4">
        {prescriptions.length === 0 ? (
          <p className="text-sm text-gray-500">No prescriptions added</p>
        ) : (
          prescriptions.map((item, index) => (
            <div
              key={index}
              className="border p-2 rounded mt-2 flex justify-between"
            >
              <span>
                {item.medicine} - {item.dosage}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}