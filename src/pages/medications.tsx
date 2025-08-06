import React, { useState, useMemo } from 'react'
import { Search, Filter, Pill, AlertTriangle, Clock, Route, BookOpen, FileText, Calculator } from 'lucide-react'
import { 
  medications, 
  getMedicationsByScope, 
  searchMedications, 
  getMedicationStats,
  CLINICAL_DISCLAIMER 
} from '../data/medications'

const Medications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedScope, setSelectedScope] = useState<'All' | 'EMT-B' | 'AEMT' | 'Paramedic'>('All')
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null)
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  const stats = getMedicationStats()

  const filteredMedications = useMemo(() => {
    let meds = selectedScope === 'All' ? medications : getMedicationsByScope(selectedScope)
    
    if (searchTerm) {
      meds = searchMedications(searchTerm).filter(med => 
        selectedScope === 'All' || med.scope === selectedScope
      )
    }
    
    return meds.sort((a, b) => a.name.localeCompare(b.name))
  }, [searchTerm, selectedScope])

  const selectedMed = selectedMedication ? medications.find(med => med.id === selectedMedication) : null

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'EMT-B': return 'bg-green-100 text-green-800'
      case 'AEMT': return 'bg-blue-100 text-blue-800'
      case 'Paramedic': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Sympathomimetic': 'bg-red-50 border-red-200',
      'Beta-2 Agonist': 'bg-orange-50 border-orange-200',
      'Opioid Analgesic': 'bg-purple-50 border-purple-200',
      'Antidysrhythmic': 'bg-blue-50 border-blue-200',
      'Vasodilator': 'bg-green-50 border-green-200',
      'Antiemetic': 'bg-yellow-50 border-yellow-200',
      'Corticosteroid': 'bg-pink-50 border-pink-200',
      'Benzodiazepine': 'bg-indigo-50 border-indigo-200'
    }
    return colors[category] || 'bg-gray-50 border-gray-200'
  }

  if (selectedMed) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-4">
          <button
            onClick={() => setSelectedMedication(null)}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Medications
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{selectedMed.name}</h1>
                {selectedMed.genericName && (
                  <p className="text-blue-100">({selectedMed.genericName})</p>
                )}
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getScopeColor(selectedMed.scope)}`}>
                    {selectedMed.scope}
                  </span>
                  <span className="text-blue-100 text-sm">{selectedMed.category}</span>
                </div>
              </div>
              <Pill className="h-12 w-12 text-blue-200" />
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Route className="h-4 w-4 mr-2 text-blue-600" />
                  Dosing & Administration
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Adult Dose:</strong> {selectedMed.adultDose}
                  </div>
                  {selectedMed.pediatricDose && (
                    <div>
                      <strong>Pediatric Dose:</strong> {selectedMed.pediatricDose}
                    </div>
                  )}
                  <div>
                    <strong>Route(s):</strong> {selectedMed.route.join(', ')}
                  </div>
                  {selectedMed.onsetTime && (
                    <div>
                      <strong>Onset:</strong> {selectedMed.onsetTime}
                    </div>
                  )}
                  {selectedMed.duration && (
                    <div>
                      <strong>Duration:</strong> {selectedMed.duration}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-green-600" />
                  Clinical Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Category:</strong> {selectedMed.category}
                  </div>
                  <div>
                    <strong>Scope:</strong> {selectedMed.scope}
                  </div>
                  {selectedMed.relatedChapters.length > 0 && (
                    <div>
                      <strong>Related Chapters:</strong> {selectedMed.relatedChapters.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Indications</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {selectedMed.indications.map((indication, index) => (
                  <li key={index}>{indication}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                Contraindications
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {selectedMed.contraindications.map((contraindication, index) => (
                  <li key={index}>{contraindication}</li>
                ))}
              </ul>
            </div>

            {(selectedMed.sideEffects || selectedMed.precautions) && (
              <div className="grid md:grid-cols-2 gap-6">
                {selectedMed.sideEffects && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Side Effects</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {selectedMed.sideEffects.map((effect, index) => (
                        <li key={index}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedMed.precautions && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Precautions</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {selectedMed.precautions.map((precaution, index) => (
                        <li key={index}>{precaution}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {(selectedMed.relatedProtocols && selectedMed.relatedProtocols.length > 0) && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-purple-600" />
                  Related Protocols
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMed.relatedProtocols.map((protocol, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {protocol}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedMed.notes && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Clinical Notes</h3>
                <p className="text-sm text-gray-700">{selectedMed.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <Pill className="mr-2 h-6 w-6 text-blue-600" />
          EMS Medication Reference
        </h2>
        <p className="text-gray-600">Complete database of {stats.Total} medications organized by scope of practice</p>
      </div>

      {showDisclaimer && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-yellow-800">Clinical Disclaimer</h3>
              <div className="text-sm text-yellow-700 mt-1 whitespace-pre-line">
                {CLINICAL_DISCLAIMER.trim()}
              </div>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="text-yellow-800 hover:text-yellow-900 text-sm underline mt-2"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-green-600">{stats['EMT-B']}</div>
          <div className="text-sm text-gray-600">EMT-Basic</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-blue-600">{stats['AEMT']}</div>
          <div className="text-sm text-gray-600">AEMT</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-purple-600">{stats['Paramedic']}</div>
          <div className="text-sm text-gray-600">Paramedic</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <div className="text-2xl font-bold text-gray-600">{stats['Total']}</div>
          <div className="text-sm text-gray-600">Total Medications</div>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search medications by name, category, or indication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedScope}
            onChange={(e) => setSelectedScope(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Scopes ({stats.Total})</option>
            <option value="EMT-B">EMT-Basic ({stats['EMT-B']})</option>
            <option value="AEMT">AEMT ({stats['AEMT']})</option>
            <option value="Paramedic">Paramedic ({stats['Paramedic']})</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMedications.map((medication) => (
          <div
            key={medication.id}
            onClick={() => setSelectedMedication(medication.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-lg transition-all ${getCategoryColor(medication.category)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{medication.name}</h3>
                {medication.genericName && (
                  <p className="text-sm text-gray-600 line-clamp-1">({medication.genericName})</p>
                )}
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ml-2 ${getScopeColor(medication.scope)}`}>
                {medication.scope}
              </span>
            </div>

            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-1">{medication.category}</p>
              <p className="text-xs text-gray-600 line-clamp-2">
                {medication.indications.slice(0, 2).join(', ')}
                {medication.indications.length > 2 && '...'}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                {medication.relatedChapters.length > 0 && (
                  <div className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    <span>{medication.relatedChapters.length} ch</span>
                  </div>
                )}
                {medication.relatedProtocols && medication.relatedProtocols.length > 0 && (
                  <div className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    <span>{medication.relatedProtocols.length} prot</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Route className="h-3 w-3" />
                <span>{medication.route.length > 1 ? `${medication.route.length} routes` : medication.route[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedications.length === 0 && (
        <div className="text-center py-12">
          <Pill className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No medications found matching your criteria.</p>
          <p className="text-gray-400 text-sm">Try adjusting your search or filter settings.</p>
        </div>
      )}
    </div>
  )
}

export default Medications
