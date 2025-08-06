import React from 'react'

const Protocols: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">EMS Protocols</h2>
      <div className="space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Cardiac Arrest</h3>
          <p className="text-sm text-gray-600">Adult cardiac arrest protocol</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Chest Pain</h3>
          <p className="text-sm text-gray-600">Acute coronary syndrome protocol</p>
        </div>
      </div>
    </div>
  )
}

export default Protocols
