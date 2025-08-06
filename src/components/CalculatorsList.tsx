import React, { useState } from 'react'
import { calculators, searchCalculators } from '../data/calculators'
import CalculatorCard from './CalculatorCard'
import { Search } from 'lucide-react'

export default function CalculatorsList() {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = searchTerm
    ? searchCalculators(searchTerm)
    : calculators

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Medical Calculators</h2>
      <div className="mb-6 flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Search calculators by name, tag, or description..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(calc => (
          <CalculatorCard key={calc.id} calculator={calc} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No calculators found matching your criteria.
        </div>
      )}
    </div>
  )
}