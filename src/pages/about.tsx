import React from 'react'

const About: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">About EMSLEARN</h2>
      <div className="space-y-4">
        <p className="text-gray-700">
          EMSLEARN is your comprehensive EMT training platform, designed to help students 
          and professionals excel in emergency medical services.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Features</h3>
          <ul className="text-sm space-y-1">
            <li>• 14 Study Modules with 41 Chapters</li>
            <li>• Medical Calculators</li>
            <li>• Protocol Reference</li>
            <li>• Medication Database</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
