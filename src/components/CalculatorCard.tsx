import React, { useState } from 'react'
import { Calculator, ChevronDown, ChevronUp, FileText, Pill, BookOpen } from 'lucide-react'
import { Calculator as CalculatorType } from '../data/calculators'

interface Props {
  calculator: CalculatorType
  onSelect?: () => void
}

export default function CalculatorCard({ calculator, onSelect }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg mb-1">{calculator.title}</h3>
          <p className="text-sm text-gray-600">{calculator.description}</p>
        </div>
        <Calculator className="h-6 w-6 text-blue-500" />
      </div>
      <button
        className="mt-2 text-blue-500 text-sm flex items-center gap-1"
        onClick={() => setExpanded(e => !e)}
      >
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        {expanded ? 'Hide Details' : 'View More'}
      </button>
      {expanded && (
        <div className="mt-3 text-sm">
          <div className="mb-2">
            <strong>Formula:</strong> <span className="font-mono">{calculator.formula}</span>
          </div>
          {calculator.tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {calculator.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{tag}</span>
              ))}
            </div>
          )}
          <div className="mb-2 flex flex-wrap gap-2">
            {calculator.relatedProtocols.length > 0 && (
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4 text-purple-600" />
                <span className="text-xs text-purple-800">
                  {calculator.relatedProtocols.join(', ')}
                </span>
              </div>
            )}
            {calculator.relatedMedications.length > 0 && (
              <div className="flex items-center gap-1">
                <Pill className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-800">
                  {calculator.relatedMedications.join(', ')}
                </span>
              </div>
            )}
            {calculator.relatedChapters.length > 0 && (
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-blue-800">
                  {calculator.relatedChapters.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}