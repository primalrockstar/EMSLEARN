import React from 'react'

export default function Calculators() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Medical Calculators</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">APGAR Score</h3>
          <p className="text-sm text-gray-600">Newborn assessment calculator</p>
          <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">
            Coming Soon
          </button>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Glasgow Coma Scale</h3>
          <p className="text-sm text-gray-600">Neurological assessment</p>
          <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">
            Coming Soon
          </button>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Pediatric Dosing</h3>
          <p className="text-sm text-gray-600">Weight-based calculations</p>
          <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">
            Coming Soon
          </button>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">IV Flow Rate</h3>
          <p className="text-sm text-gray-600">Drip rate calculator</p>
          <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  )
}
