import React, { useState, useEffect } from 'react'
import { medications } from './data/medications'
import { calculators } from './data/calculators'

function App() {
  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [currentPage, setCurrentPage] = useState('notes')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadChapters = async () => {
      try {
        const response = await fetch('/emt-chapters-final.json')
        const data = await response.json()
        setChapters(data.chapters)
        console.log(`✅ Loaded ${data.chapters.length} chapters automatically!`)
      } catch (error) {
        console.error('Error loading chapters:', error)
      }
      setLoading(false)
    }
    loadChapters()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🚑</div>
          <h1 className="text-2xl font-bold">Loading Your Complete EMT Platform...</h1>
          <p className="text-gray-600">Study Notes, Medications & Calculators</p>
        </div>
      </div>
    )
  }

  const NotesPage = () => {
    const currentChapter = chapters.find(ch => ch.id === selectedChapter)

    return (
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 Study Notes</h1>
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-800 font-medium">
              📖 These study notes are from <strong>THE EMERGENCY CARE AND TRANSPORTATION OF THE SICK AND INJURED 12th EDITION</strong>
            </p>
            <p className="text-blue-700 text-sm mt-1">
              Complete EMT training materials covering all {chapters.length} chapters.
            </p>
          </div>
        </div>

        <div className="flex h-[600px]">
          <div className="w-1/3 border-r border-gray-200 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">All Chapters ({chapters.length})</h2>
            <div className="space-y-1">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => setSelectedChapter(chapter.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedChapter === chapter.id
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-sm">Chapter {chapter.id}</span>
                      <div className="text-sm text-gray-600 mt-1">{chapter.title}</div>
                    </div>
                    <div className="text-xs">
                      <div className="text-green-600">✅</div>
                      <div className={`px-2 py-1 rounded text-xs mt-1 ${
                        chapter.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        chapter.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {chapter.difficulty}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="w-2/3 p-6 overflow-y-auto">
            {currentChapter ? (
              <>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Chapter {currentChapter.id}: {currentChapter.title}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>⏱️ {currentChapter.estimatedTime}</span>
                    <span className={`px-2 py-1 rounded ${
                      currentChapter.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      currentChapter.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {currentChapter.difficulty}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-sm">
                      {currentChapter.content}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 mt-20">
                <div className="text-4xl mb-4">📚</div>
                <p>Select a chapter to view content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const MedicationsPage = () => {
    const [selectedScope, setSelectedScope] = useState('EMT-B')
    const [searchTerm, setSearchTerm] = useState('')
    const [expandedCard, setExpandedCard] = useState(null)
    const [favorites, setFavorites] = useState(new Set())

    // Group EMT-B and EMT-B* together for display
    const filteredMeds = medications.filter(med => {
      const scopeMatch = selectedScope === 'EMT-B' ? 
        (med.scope === 'EMT-B' || med.scope === 'EMT-B*') : 
        med.scope === selectedScope
      
      const searchMatch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.indications.toLowerCase().includes(searchTerm.toLowerCase())
      
      return scopeMatch && searchMatch
    })

    const toggleCard = (medId) => {
      setExpandedCard(expandedCard === medId ? null : medId)
    }

    const toggleFavorite = (medId) => {
      const newFavorites = new Set(favorites)
      if (newFavorites.has(medId)) {
        newFavorites.delete(medId)
      } else {
        newFavorites.add(medId)
      }
      setFavorites(newFavorites)
    }

    const getScopeColor = (scope) => {
      switch(scope) {
        case 'EMT-B': return 'bg-green-500 text-white'
        case 'EMT-B*': return 'bg-green-600 text-white'
        case 'AEMT': return 'bg-yellow-500 text-white'
        case 'Paramedic': return 'bg-red-500 text-white'
        default: return 'bg-gray-500 text-white'
      }
    }

    const getClassIcon = (medClass) => {
      if (medClass.includes('Analgesic') || medClass.includes('Opioid')) return '💊'
      if (medClass.includes('Antidote')) return '🛡️'
      if (medClass.includes('Bronchodilator') || medClass.includes('Beta-2')) return '🫁'
      if (medClass.includes('Vasodilator') || medClass.includes('Cardiac')) return '❤️'
      if (medClass.includes('Antihistamine')) return '🌿'
      if (medClass.includes('Corticosteroid')) return '💉'
      if (medClass.includes('Benzodiazepine')) return '🧠'
      if (medClass.includes('Antiemetic')) return '🤢'
      return '💊'
    }

    return (
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💊 Medications Reference</h1>
          <p className="text-gray-600">Comprehensive EMT medication guide with detailed information</p>
          
          <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
            <div className="bg-green-100 p-3 rounded-lg border border-green-200">
              <div className="font-bold text-green-800 flex items-center gap-2">
                <span className="text-lg">🟢</span> EMT-B/EMT-B*
              </div>
              <div className="text-green-700">{medications.filter(m => m.scope === 'EMT-B' || m.scope === 'EMT-B*').length} medications</div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-200">
              <div className="font-bold text-yellow-800 flex items-center gap-2">
                <span className="text-lg">🟡</span> AEMT
              </div>
              <div className="text-yellow-700">{medications.filter(m => m.scope === 'AEMT').length} medications</div>
            </div>
            <div className="bg-red-100 p-3 rounded-lg border border-red-200">
              <div className="font-bold text-red-800 flex items-center gap-2">
                <span className="text-lg">🔴</span> Paramedic
              </div>
              <div className="text-red-700">{medications.filter(m => m.scope === 'Paramedic').length} medications</div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
              <div className="font-bold text-blue-800 flex items-center gap-2">
                <span className="text-lg">📊</span> Total
              </div>
              <div className="text-blue-700">{medications.length} medications</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex gap-2">
              {['EMT-B', 'AEMT', 'Paramedic'].map(scope => (
                <button
                  key={scope}
                  onClick={() => setSelectedScope(scope)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedScope === scope 
                      ? 'bg-green-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {scope} {scope === 'EMT-B' && '(+EMT-B*)'}
                </button>
              ))}
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, class, or indication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredMeds.map(med => (
              <div key={med.id} className="border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors rounded-t-xl"
                  onClick={() => toggleCard(med.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{getClassIcon(med.class)}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{med.name}</h3>
                          {med.genericName && (
                            <p className="text-sm text-gray-600">Generic: {med.genericName}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(med.id)
                            }}
                            className={`p-2 rounded-full transition-colors ${
                              favorites.has(med.id) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
                            }`}
                          >
                            {favorites.has(med.id) ? '❤️' : '🤍'}
                          </button>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScopeColor(med.scope)}`}>
                            {med.scope}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Drug Class</div>
                          <div className="text-sm text-blue-800 font-medium">{med.class}</div>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">Primary Indication</div>
                          <div className="text-sm text-green-800">{med.indications}</div>
                        </div>
                        
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Routes</div>
                          <div className="text-sm text-purple-800">{med.routes.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-6 flex flex-col items-center">
                      <span className="text-2xl text-gray-400 mb-2">
                        {expandedCard === med.id ? '🔽' : '▶️'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {expandedCard === med.id ? 'Collapse' : 'Expand'}
                      </span>
                    </div>
                  </div>
                </div>

                {expandedCard === med.id && (
                  <div className="border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-b-xl">
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Safety Information */}
                        <div className="bg-white rounded-lg p-4 border border-red-200">
                          <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                            <span>⚠️</span> Safety Information
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <div className="text-sm font-semibold text-red-700 mb-1">Contraindications:</div>
                              <ul className="text-sm text-red-600 space-y-1">
                                {med.contraindications.map((contra, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-red-400 mt-1">•</span>
                                    <span>{contra}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {med.warnings && (
                              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
                                <div className="text-sm font-semibold text-yellow-800 mb-1 flex items-center gap-1">
                                  <span>⚠️</span> Special Warnings:
                                </div>
                                <div className="text-sm text-yellow-700">{med.warnings}</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Quick Reference */}
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <span>📋</span> Quick Reference
                          </h4>
                          <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded">
                              <div className="text-xs font-semibold text-blue-600 uppercase">Scope of Practice</div>
                              <div className={`inline-block px-2 py-1 rounded text-sm font-bold mt-1 ${getScopeColor(med.scope)}`}>
                                {med.scope}
                              </div>
                            </div>
                            
                            <div className="bg-green-50 p-3 rounded">
                              <div className="text-xs font-semibold text-green-600 uppercase">Administration Routes</div>
                              <div className="text-sm text-green-800 mt-1">
                                {med.routes.map((route, index) => (
                                  <span key={index} className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded text-xs mr-1 mt-1">
                                    {route}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded">
                              <div className="text-xs font-semibold text-gray-600 uppercase">Drug Classification</div>
                              <div className="text-sm text-gray-800 mt-1 font-medium">{med.class}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {med.relatedChapters.length > 0 && (
                        <div className="mt-6 bg-white rounded-lg p-4 border border-indigo-200">
                          <h4 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                            <span>📚</span> Related Study Chapters
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {med.relatedChapters.map(chapterId => {
                              const chapter = chapters.find(ch => ch.id === chapterId)
                              return chapter ? (
                                <button
                                  key={chapterId}
                                  onClick={() => {
                                    setCurrentPage('notes')
                                    setSelectedChapter(chapterId)
                                  }}
                                  className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm hover:bg-indigo-200 transition-colors font-medium border border-indigo-300"
                                >
                                  <span className="text-indigo-500">📖</span> Ch {chapterId}: {chapter.title}
                                </button>
                              ) : null
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredMeds.length === 0 && (
            <div className="text-center text-gray-500 mt-12 bg-gray-50 rounded-xl p-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No medications found</h3>
              <p>No medications found for <span className="font-semibold">{selectedScope}</span> with search "<span className="font-semibold">{searchTerm}</span>"</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const CalculatorsPage = () => {
    const [selectedCalc, setSelectedCalc] = useState(null)
    const [inputs, setInputs] = useState({})
    const [result, setResult] = useState(null)

    const calculateResult = (calc) => {
      // Implementation for each calculator
      if (calc.id === 1) { // Pediatric Weight
        const age = parseFloat(inputs.age) || 0
        return (age * 2) + 8
      }
      if (calc.id === 2) { // Glasgow Coma Scale
        const eye = parseInt(inputs.eyeOpening) || 0
        const verbal = parseInt(inputs.verbalResponse) || 0
        const motor = parseInt(inputs.motorResponse) || 0
        return eye + verbal + motor
      }
      if (calc.id === 3) { // BSA Burns
        const areas = ['head', 'armLeft', 'armRight', 'chestFront', 'backUpper', 'legLeft', 'legRight']
        return areas.reduce((sum, area) => sum + (parseFloat(inputs[area]) || 0), 0)
      }
      return 0
    }

    const handleCalculate = () => {
      if (selectedCalc) {
        const calcResult = calculateResult(selectedCalc)
        setResult(calcResult)
      }
    }

    return (
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🧮 Medical Calculators</h1>
          <p className="text-gray-600">Essential calculations for EMT practice</p>
        </div>

        <div className="flex h-[600px]">
          <div className="w-1/3 border-r border-gray-200 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Calculators</h2>
            <div className="space-y-2">
              {calculators.map(calc => (
                <button
                  key={calc.id}
                  onClick={() => {
                    setSelectedCalc(calc)
                    setInputs({})
                    setResult(null)
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedCalc?.id === calc.id
                      ? 'bg-purple-100 border-purple-500'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{calc.name}</div>
                  <div className="text-sm text-gray-600">{calc.category}</div>
                  <div className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                    calc.scope === 'EMT-B' ? 'bg-green-100 text-green-700' :
                    calc.scope === 'AEMT' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {calc.scope}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="w-2/3 p-6">
            {selectedCalc ? (
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedCalc.name}</h2>
                <p className="text-gray-600 mb-4">{selectedCalc.description}</p>

                <div className="space-y-4 mb-6">
                  {selectedCalc.inputs.map(input => (
                    <div key={input.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {input.label} {input.unit && `(${input.unit})`}
                      </label>
                      {input.type === 'number' ? (
                        <input
                          type="number"
                          value={inputs[input.id] || ''}
                          onChange={(e) => setInputs(prev => ({...prev, [input.id]: e.target.value}))}
                          min={input.min}
                          max={input.max}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <select
                          value={inputs[input.id] || ''}
                          onChange={(e) => setInputs(prev => ({...prev, [input.id]: e.target.value}))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select...</option>
                          {input.options?.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleCalculate}
                  className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 mb-4"
                >
                  Calculate
                </button>

                {result !== null && (
                  <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
                    <h3 className="font-bold text-green-800">Result: {result}</h3>
                    <p className="text-green-700 text-sm mt-1">{selectedCalc.interpretation}</p>
                  </div>
                )}

                <div className="bg-gray-50 border border-gray-200 rounded p-4">
                  <h4 className="font-medium mb-2">Formula:</h4>
                  <p className="text-sm text-gray-700">{selectedCalc.formula}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-20">
                <div className="text-4xl mb-4">🧮</div>
                <p>Select a calculator to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🚑</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">EMSLEARN</h1>
                <p className="text-gray-600">Complete EMT Training Platform</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">{chapters.length} Chapters • {medications.length} Medications • {calculators.length} Calculators</div>
              <div className="text-lg font-bold text-green-600">✅ COMPLETE PLATFORM!</div>
            </div>
          </div>
        </header>

        <main className="mb-20">
          {currentPage === 'notes' && <NotesPage />}
          {currentPage === 'medications' && <MedicationsPage />}
          {currentPage === 'calculators' && <CalculatorsPage />}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around max-w-lg mx-auto">
            <button
              onClick={() => setCurrentPage('notes')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors text-xs ${
                currentPage === 'notes' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <span className="text-lg mb-1">📚</span>
              <span>Notes</span>
            </button>
            <button
              onClick={() => setCurrentPage('medications')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors text-xs ${
                currentPage === 'medications' ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <span className="text-lg mb-1">💊</span>
              <span>Medications</span>
            </button>
            <button
              onClick={() => setCurrentPage('calculators')}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors text-xs ${
                currentPage === 'calculators' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <span className="text-lg mb-1">🧮</span>
              <span>Calculators</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default App
