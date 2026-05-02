import React, { useEffect, useRef, useState } from "react"
import QrScanner from "qr-scanner/qr-scanner.min.js"

export default function EmergencyAccess() {
  const videoRef = useRef(null)
  const [isScanning, setIsScanning] = useState(false)
  const [patientId, setPatientId] = useState("")

  useEffect(() => {
    if (!videoRef.current || !isScanning) return

    let scanner

    try {
      scanner = new QrScanner(
        videoRef.current,
        (result) => {
          setPatientId(result.data)
          alert(`Scanned: ${result.data}`)
          scanner.stop()
          setIsScanning(false)
        }
      )

      scanner.start()
    } catch (err) {
      console.error("Scanner error:", err)
    }

    return () => {
      if (scanner) scanner.stop()
    }
  }, [isScanning])

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Emergency Access
      </h2>

      <input
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        placeholder="Enter Patient ID"
        className="w-full border px-3 py-2 rounded-md mb-3"
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-md mb-3"
        onClick={() => alert(`Fetching ${patientId}`)}
      >
        Fetch Emergency Data
      </button>

      <button
        onClick={() => setIsScanning(!isScanning)}
        className="w-full bg-gray-800 text-white py-2 rounded-md"
      >
        {isScanning ? "Stop Scanner" : "Scan QR Code"}
      </button>

      {isScanning && (
        <video
          ref={videoRef}
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}
    </div>
  )
}