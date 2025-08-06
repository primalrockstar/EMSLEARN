import React, { useState, useEffect } from 'react'
import { Home, Calculator, FileText, Pill, BookOpen, ChevronRight, ArrowLeft, Clock, AlertCircle, Search, Filter } from 'lucide-react'

function Application() {
  const [currentPage, setCurrentPage] = useState('home')
  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [selectedMedication, setSelectedMedication] = useState(null)
  const [loading, setLoading] = useState(false)
  const [medicationSearch, setMedicationSearch] = useState('')
  const [medicationFilter, setMedicationFilter] = useState('all')

  const navigationItems = [
    { id: 'home', name: 'Dashboard', icon: Home },
    { id: 'notes', name: 'Study Notes', icon: BookOpen },
    { id: 'calculators', name: 'Calculators', icon: Calculator },
    { id: 'protocols', name: 'Protocols', icon: FileText },
    { id: 'medications', name: 'Medications', icon: Pill }
  ]

  // Comprehensive medications database
  const medications = [
    {
      id: 1,
      name: "Epinephrine",
      genericName: "Epinephrine",
      brandNames: ["EpiPen", "Adrenalin"],
      classification: "Sympathomimetic",
      scope: "EMT-B",
      mechanism: "Alpha and beta adrenergic agonist",
      indications: ["Anaphylaxis", "Severe asthma", "Cardiac arrest"],
      contraindications: ["Hypertensive crisis", "Coronary artery disease (relative)"],
      dosage: {
        adult: "0.3-0.5 mg IM (1:1000) or 1 mg IV (1:10,000)",
        pediatric: "0.01 mg/kg IM (1:1000) or 0.01 mg/kg IV (1:10,000)"
      },
      route: ["IM", "IV", "Endotracheal"],
      onsetDuration: "Onset: 1-2 min IM, immediate IV. Duration: 5-10 min",
      sideEffects: ["Tachycardia", "Hypertension", "Anxiety", "Tremor"],
      considerations: "Monitor for arrhythmias. May repeat every 3-5 minutes."
    },
    {
      id: 2,
      name: "Albuterol",
      genericName: "Albuterol Sulfate",
      brandNames: ["Proventil", "Ventolin"],
      classification: "Beta-2 Agonist Bronchodilator",
      scope: "EMT-B",
      mechanism: "Selective beta-2 adrenergic receptor agonist causing bronchodilation",
      indications: ["Asthma", "COPD exacerbation", "Bronchospasm"],
      contraindications: ["Hypersensitivity to albuterol"],
      dosage: {
        adult: "2.5 mg in 3 mL normal saline via nebulizer",
        pediatric: "2.5 mg in 3 mL normal saline via nebulizer"
      },
      route: ["Inhalation", "Nebulizer"],
      onsetDuration: "Onset: 5-15 min. Duration: 3-6 hours",
      sideEffects: ["Tachycardia", "Tremor", "Nervousness", "Headache"],
      considerations: "Monitor heart rate. May cause paradoxical bronchospasm."
    },
    {
      id: 3,
      name: "Nitroglycerin",
      genericName: "Nitroglycerin",
      brandNames: ["Nitrostat", "Nitrolingual"],
      classification: "Nitrate Vasodilator",
      scope: "EMT-B",
      mechanism: "Venous and arterial vasodilation, reduces preload and afterload",
      indications: ["Chest pain", "Angina", "CHF with pulmonary edema"],
      contraindications: ["Hypotension", "Head injury", "Viagra/Cialis use within 24-48 hours"],
      dosage: {
        adult: "0.4 mg SL, may repeat every 3-5 minutes up to 3 doses",
        pediatric: "Not typically used in pediatric patients"
      },
      route: ["Sublingual", "Spray"],
      onsetDuration: "Onset: 1-3 min. Duration: 30-60 min",
      sideEffects: ["Hypotension", "Headache", "Dizziness", "Flushing"],
      considerations: "Check BP before each dose. Patient must be sitting or lying down."
    },
    {
      id: 4,
      name: "Aspirin",
      genericName: "Acetylsalicylic Acid",
      brandNames: ["Bayer", "Ecotrin"],
      classification: "Antiplatelet Agent/NSAID",
      scope: "EMT-B",
      mechanism: "Irreversibly inhibits platelet aggregation and cyclooxygenase",
      indications: ["Chest pain (suspected MI)", "Stroke prevention"],
      contraindications: ["Allergy to aspirin", "Active bleeding", "Severe asthma"],
      dosage: {
        adult: "160-325 mg PO (chewed)",
        pediatric: "Not recommended for children due to Reye's syndrome risk"
      },
      route: ["Oral"],
      onsetDuration: "Onset: 15-30 min. Duration: 4-6 hours (antiplatelet effect lasts days)",
      sideEffects: ["GI bleeding", "Tinnitus", "Allergic reactions"],
      considerations: "Have patient chew for faster absorption. Contraindicated in children."
    },
    {
      id: 5,
      name: "Oral Glucose",
      genericName: "Glucose",
      brandNames: ["Glutose", "Insta-Glucose"],
      classification: "Carbohydrate/Antihypoglycemic",
      scope: "EMT-B",
      mechanism: "Rapidly absorbed simple carbohydrate that raises blood glucose",
      indications: ["Hypoglycemia in conscious patients"],
      contraindications: ["Unconscious patient", "Unable to swallow"],
      dosage: {
        adult: "15-20 grams PO",
        pediatric: "15-20 grams PO"
      },
      route: ["Oral"],
      onsetDuration: "Onset: 10-15 min. Duration: Variable",
      sideEffects: ["Nausea", "Vomiting"],
      considerations: "Patient must be conscious and able to swallow. Monitor blood glucose."
    },
    {
      id: 6,
      name: "Activated Charcoal",
      genericName: "Activated Charcoal",
      brandNames: ["Actidose", "CharcoAid"],
      classification: "Antidote/Adsorbent",
      scope: "EMT-B",
      mechanism: "Adsorbs toxins in the GI tract preventing absorption",
      indications: ["Poisoning/overdose (specific substances)"],
      contraindications: ["Altered mental status", "Caustic ingestion", "Hydrocarbon ingestion"],
      dosage: {
        adult: "25-50 grams PO",
        pediatric: "1 gram/kg PO"
      },
      route: ["Oral"],
      onsetDuration: "Onset: Immediate in GI tract. Duration: Until eliminated",
      sideEffects: ["Constipation", "Black stools", "Vomiting"],
      considerations: "Most effective within 1 hour of ingestion. May require multiple doses."
    },
    {
      id: 7,
      name: "Oxygen",
      genericName: "Oxygen",
      brandNames: ["Medical Oxygen"],
      classification: "Gas/Respiratory Therapy",
      scope: "EMT-B",
      mechanism: "Increases oxygen content in blood and tissues",
      indications: ["Hypoxia", "Respiratory distress", "Chest pain", "Shock"],
      contraindications: ["None in emergency settings"],
      dosage: {
        adult: "2-15 LPM depending on delivery device",
        pediatric: "2-15 LPM depending on delivery device"
      },
      route: ["Inhalation"],
      onsetDuration: "Onset: Immediate. Duration: As long as administered",
      sideEffects: ["Oxygen toxicity (prolonged high concentrations)", "Drying of mucous membranes"],
      considerations: "Use pulse oximetry to guide therapy. Humidify for prolonged use."
    },
    {
      id: 8,
      name: "Naloxone",
      genericName: "Naloxone HCl",
      brandNames: ["Narcan", "Evzio"],
      classification: "Opioid Antagonist",
      scope: "EMT-B",
      mechanism: "Competitive opioid receptor antagonist",
      indications: ["Opioid overdose", "Respiratory depression from opioids"],
      contraindications: ["Hypersensitivity to naloxone"],
      dosage: {
        adult: "0.4-2 mg IV/IM/IN, may repeat every 2-3 minutes",
        pediatric: "0.1 mg/kg IV/IM/IN, may repeat every 2-3 minutes"
      },
      route: ["IV", "IM", "Intranasal", "Endotracheal"],
      onsetDuration: "Onset: 1-2 min IV, 2-5 min IM/IN. Duration: 30-90 min",
      sideEffects: ["Withdrawal symptoms", "Agitation", "Nausea", "Vomiting"],
      considerations: "May precipitate withdrawal in opioid-dependent patients. Effects may wear off before opioid."
    },
    {
      id: 9,
      name: "Diphenhydramine",
      genericName: "Diphenhydramine HCl",
      brandNames: ["Benadryl"],
      classification: "Antihistamine",
      scope: "AEMT",
      mechanism: "H1 receptor antagonist with anticholinergic effects",
      indications: ["Allergic reactions", "Anaphylaxis (adjunct)", "Extrapyramidal reactions"],
      contraindications: ["Acute asthma", "MAO inhibitor use", "Narrow-angle glaucoma"],
      dosage: {
        adult: "25-50 mg IV/IM",
        pediatric: "1 mg/kg IV/IM (max 50 mg)"
      },
      route: ["IV", "IM", "PO"],
      onsetDuration: "Onset: 15-30 min. Duration: 4-6 hours",
      sideEffects: ["Sedation", "Dry mouth", "Urinary retention", "Confusion"],
      considerations: "May cause significant sedation in elderly. Use caution with anticholinergic drugs."
    },
    {
      id: 10,
      name: "Dextrose 50%",
      genericName: "Dextrose",
      brandNames: ["D50W"],
      classification: "Carbohydrate/Antihypoglycemic",
      scope: "AEMT",
      mechanism: "Rapidly increases blood glucose concentration",
      indications: ["Severe hypoglycemia", "Altered mental status with hypoglycemia"],
      contraindications: ["Intracranial hemorrhage (relative)"],
      dosage: {
        adult: "25 grams (50 mL of 50% solution) IV",
        pediatric: "0.5-1 gram/kg IV (2-4 mL/kg of 25% solution in children)"
      },
      route: ["IV"],
      onsetDuration: "Onset: 1-3 min. Duration: Variable",
      sideEffects: ["Tissue necrosis if extravasated", "Hyperglycemia"],
      considerations: "Ensure IV patency. May use D25 or D10 in children. Monitor blood glucose."
    }
  ]

  useEffect(() => {
    const loadChapters = async () => {
      setLoading(true)
      try {
        const response = await fetch('/emt-chapters-final.json')
        if (response.ok) {
          const data = await response.json()
          
          if (Array.isArray(data)) {
            setChapters(data)
          } else if (data.chapters && Array.isArray(data.chapters)) {
            setChapters(data.chapters)
          } else if (data.modules && Array.isArray(data.modules)) {
            const allChapters = data.modules.flatMap(module => 
              module.chapters ? module.chapters.map(chapter => ({
                ...chapter,
                moduleName: module.name
              })) : []
            )
            setChapters(allChapters)
          } else {
            setChapters([data])
          }
        }
      } catch (error) {
        console.error('Error loading chapters:', error)
      } finally {
        setLoading(false)
      }
    }
    loadChapters()
  }, [])

  // Filter medications based on search and scope
  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(medicationSearch.toLowerCase()) ||
                         med.classification.toLowerCase().includes(medicationSearch.toLowerCase()) ||
                         med.indications.some(indication => indication.toLowerCase().includes(medicationSearch.toLowerCase()))
    
    const matchesFilter = medicationFilter === 'all' || med.scope === medicationFilter
    
    return matchesSearch && matchesFilter
  })

  // Extract key terms from content
  const extractKeyTerms = (content) => {
    if (!content || typeof content !== 'string') return []
    
    const keyTerms = new Set()
    const medicalTerms = content.match(/\b(EMT|EMS|EMR|AEMT|Paramedic|BLS|ALS|CPR|AED|ADA|HIPAA|medical director|protocols|standing orders|quality improvement|patient safety|certification|licensure|emergency medical dispatch|continuous quality improvement|evidence-based medicine|mobile integrated healthcare|community paramedicine)\b/gi)
    
    if (medicalTerms) {
      medicalTerms.forEach(term => keyTerms.add(term.toUpperCase()))
    }
    
    return Array.from(keyTerms).sort()
  }

  // Content formatting function
  const formatChapterContent = (content) => {
    if (!content || typeof content !== 'string') return null
    
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\s+/g, ' ')
      .trim()
    
    const sections = cleanContent.split(/(\d+\.\s+[A-Z][^.]*(?:\s[A-Z][^.]*)*)/g).filter(Boolean)
    
    return sections.map((section, index) => {
      const trimmedSection = section.trim()
      
      if (trimmedSection.match(/^\d+\.\s+[A-Z]/)) {
        return (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2" style={{ 
              color: '#007BFF', 
              borderColor: '#007BFF' 
            }}>
              {trimmedSection}
            </h2>
          </div>
        )
      }
      
      if (trimmedSection.length > 100) {
        const sentences = trimmedSection.split(/\.\s+/).filter(s => s.trim().length > 0)
        
        return (
          <div key={index} className="mb-8 space-y-4">
            {sentences.map((sentence, sIndex) => {
              const cleanSentence = sentence.trim()
              if (!cleanSentence || cleanSentence.length < 10) return null
              
              const finalSentence = cleanSentence.endsWith('.') ? cleanSentence : cleanSentence + '.'
              
              const highlightedSentence = finalSentence
                .replace(/\b(EMT|EMS|EMR|AEMT|Paramedic|BLS|ALS|CPR|AED|ADA|HIPAA)\b/g, 
                  '<span class="font-semibold" style="color: #007BFF; background-color: #E3F2FD; padding: 2px 4px; border-radius: 4px;">$1</span>')
                .replace(/\b(medical director|protocols|standing orders|quality improvement|patient safety|certification|licensure|emergency medical dispatch|continuous quality improvement|evidence-based medicine|mobile integrated healthcare|community paramedicine)\b/gi, 
                  '<span class="font-semibold" style="color: #28A745; background-color: #E8F5E8; padding: 2px 4px; border-radius: 4px;">$1</span>')
                .replace(/\[(\d+)\]/g, '<sup style="color: #007BFF; font-weight: 600;">[$1]</sup>')
              
              return (
                <p 
                  key={sIndex} 
                  className="text-base leading-relaxed mb-3" 
                  style={{ color: '#212529', lineHeight: '1.8' }}
                  dangerouslySetInnerHTML={{ __html: highlightedSentence }}
                />
              )
            })}
          </div>
        )
      }
      
      return null
    }).filter(Boolean)
  }

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold mb-4" style={{ color: '#212529' }}>Welcome to ProMedixEMS</h1>
              <p className="text-lg" style={{ color: '#6C757D' }}>Your professional EMT education platform</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E9ECEF',
                  boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                }}
                onClick={() => setCurrentPage('notes')}
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: '#007BFF' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212529' }}>Study Notes</h3>
                <p style={{ color: '#6C757D' }}>Access your chapter content</p>
                <p className="text-sm mt-2" style={{ color: '#007BFF' }}>{chapters.length} chapters available</p>
              </div>
              <div 
                className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E9ECEF',
                  boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                }}
                onClick={() => setCurrentPage('calculators')}
              >
                <Calculator className="w-12 h-12 mx-auto mb-4" style={{ color: '#28A745' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212529' }}>Calculators</h3>
                <p style={{ color: '#6C757D' }}>15 field-ready tools</p>
              </div>
              <div 
                className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E9ECEF',
                  boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                }}
                onClick={() => setCurrentPage('medications')}
              >
                <Pill className="w-12 h-12 mx-auto mb-4" style={{ color: '#6F42C1' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212529' }}>Medications</h3>
                <p style={{ color: '#6C757D' }}>{medications.length} EMS medications</p>
              </div>
              <div 
                className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E9ECEF',
                  boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                }}
                onClick={() => setCurrentPage('protocols')}
              >
                <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: '#DC3545' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212529' }}>Protocols</h3>
                <p style={{ color: '#6C757D' }}>Emergency procedures</p>
              </div>
            </div>
          </div>
        )
      case 'medications':
        if (selectedMedication) {
          return (
            <div className="max-w-5xl mx-auto">
              {/* Navigation */}
              <div className="mb-6">
                <button 
                  onClick={() => setSelectedMedication(null)}
                  className="text-sm font-medium mb-6 flex items-center hover:underline transition-colors"
                  style={{ color: '#6F42C1' }}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Medications List
                </button>
              </div>

              {/* Medication Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#6F42C1' }}>
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold" style={{ color: '#212529' }}>
                      {selectedMedication.name}
                    </h1>
                    <p className="text-lg italic" style={{ color: '#6C757D' }}>
                      {selectedMedication.classification} • {selectedMedication.scope}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medication Details */}
              <div className="space-y-6">
                {/* Basic Information */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E9ECEF',
                    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                  }}
                >
                  <h2 className="text-xl font-bold mb-4" style={{ color: '#6F42C1' }}>Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold" style={{ color: '#212529' }}>Generic Name:</p>
                      <p style={{ color: '#6C757D' }}>{selectedMedication.genericName}</p>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: '#212529' }}>Brand Names:</p>
                      <p style={{ color: '#6C757D' }}>{selectedMedication.brandNames.join(', ')}</p>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: '#212529' }}>Classification:</p>
                      <p style={{ color: '#6C757D' }}>{selectedMedication.classification}</p>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: '#212529' }}>Scope of Practice:</p>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ 
                        backgroundColor: selectedMedication.scope === 'EMT-B' ? '#007BFF' : '#6F42C1', 
                        color: '#FFFFFF' 
                      }}>
                        {selectedMedication.scope}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Mechanism of Action */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#E3F2FD', 
                    border: '1px solid #007BFF'
                  }}
                >
                  <h2 className="text-xl font-bold mb-4" style={{ color: '#1565C0' }}>Mechanism of Action</h2>
                  <p style={{ color: '#1565C0', lineHeight: '1.7' }}>{selectedMedication.mechanism}</p>
                </section>

                {/* Indications & Contraindications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#E8F5E8', 
                      border: '1px solid #28A745'
                    }}
                  >
                    <h2 className="text-xl font-bold mb-4" style={{ color: '#155724' }}>Indications</h2>
                    <ul className="space-y-2">
                      {selectedMedication.indications.map((indication, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: '#28A745' }}></div>
                          <span style={{ color: '#155724' }}>{indication}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#FFEBEE', 
                      border: '1px solid #F44336'
                    }}
                  >
                    <h2 className="text-xl font-bold mb-4" style={{ color: '#C62828' }}>Contraindications</h2>
                    <ul className="space-y-2">
                      {selectedMedication.contraindications.map((contraindication, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: '#F44336' }}></div>
                          <span style={{ color: '#C62828' }}>{contraindication}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Dosage Information */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFF8E1', 
                    border: '1px solid #FFC107'
                  }}
                >
                  <h2 className="text-xl font-bold mb-4" style={{ color: '#F57F17' }}>Dosage & Administration</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-semibold mb-2" style={{ color: '#F57F17' }}>Adult Dose:</p>
                      <p style={{ color: '#F57F17' }}>{selectedMedication.dosage.adult}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2" style={{ color: '#F57F17' }}>Pediatric Dose:</p>
                      <p style={{ color: '#F57F17' }}>{selectedMedication.dosage.pediatric}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2" style={{ color: '#F57F17' }}>Route:</p>
                      <p style={{ color: '#F57F17' }}>{selectedMedication.route.join(', ')}</p>
                    </div>
                  </div>
                </section>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                    }}
                  >
                    <h2 className="text-xl font-bold mb-4" style={{ color: '#212529' }}>Onset & Duration</h2>
                    <p style={{ color: '#212529', lineHeight: '1.7' }}>{selectedMedication.onsetDuration}</p>
                  </section>

                  <section 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                    }}
                  >
                    <h2 className="text-xl font-bold mb-4" style={{ color: '#212529' }}>Side Effects</h2>
                    <ul className="space-y-1">
                      {selectedMedication.sideEffects.map((effect, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: '#6C757D' }}></div>
                          <span style={{ color: '#212529' }}>{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Special Considerations */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#F3E5F5', 
                    border: '1px solid #9C27B0'
                  }}
                >
                  <h2 className="text-xl font-bold mb-4" style={{ color: '#6A1B9A' }}>Special Considerations</h2>
                  <p style={{ color: '#6A1B9A', lineHeight: '1.7' }}>{selectedMedication.considerations}</p>
                </section>

                {/* Clinical Disclaimer */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFEBEE', 
                    border: '1px solid #F44336'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <AlertCircle className="w-6 h-6 mr-3" style={{ color: '#D32F2F' }} />
                    <h3 className="text-lg font-semibold" style={{ color: '#D32F2F' }}>Important Clinical Notice</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#D32F2F' }}>
                    This medication information is for educational purposes only. Always follow your local protocols, medical director guidelines, and scope of practice. Medication administration should only be performed by trained and certified personnel within their authorized scope of practice.
                  </p>
                </section>
              </div>
            </div>
          )
        }

        return (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4" style={{ color: '#212529' }}>EMS Medications</h1>
              <p style={{ color: '#6C757D' }}>Comprehensive medication reference for emergency medical services</p>
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6C757D' }} />
                <input
                  type="text"
                  placeholder="Search medications, classifications, or indications..."
                  value={medicationSearch}
                  onChange={(e) => setMedicationSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border"
                  style={{ 
                    borderColor: '#E9ECEF',
                    backgroundColor: '#FFFFFF'
                  }}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6C757D' }} />
                <select
                  value={medicationFilter}
                  onChange={(e) => setMedicationFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 rounded-lg border appearance-none"
                  style={{ 
                    borderColor: '#E9ECEF',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option value="all">All Scopes</option>
                  <option value="EMT-B">EMT-B</option>
                  <option value="AEMT">AEMT</option>
                  <option value="Paramedic">Paramedic</option>
                </select>
              </div>
            </div>

            {/* Medications Grid */}
            <div className="grid gap-4">
              {filteredMedications.map((medication) => (
                <div 
                  key={medication.id}
                  className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E9ECEF',
                    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                  }}
                  onClick={() => setSelectedMedication(medication)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                        style={{ backgroundColor: '#6F42C1' }}
                      >
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold" style={{ color: '#212529' }}>
                            {medication.name}
                          </h3>
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: medication.scope === 'EMT-B' ? '#007BFF' : '#6F42C1', 
                              color: '#FFFFFF' 
                            }}
                          >
                            {medication.scope}
                          </span>
                        </div>
                        <p className="text-sm mb-2" style={{ color: '#6C757D' }}>
                          {medication.classification} • {medication.brandNames.join(', ')}
                        </p>
                        <p className="text-sm" style={{ color: '#6C757D' }}>
                          Primary indications: {medication.indications.slice(0, 3).join(', ')}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {filteredMedications.length === 0 && (
              <div className="text-center py-12">
                <Pill className="w-16 h-16 mx-auto mb-4" style={{ color: '#6C757D' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212529' }}>No Medications Found</h3>
                <p style={{ color: '#6C757D' }}>
                  Try adjusting your search terms or filter criteria
                </p>
              </div>
            )}
          </div>
        )
      case 'notes':
        if (selectedChapter) {
          const keyTerms = extractKeyTerms(selectedChapter.content)
          
          return (
            <div className="max-w-5xl mx-auto">
              {/* Navigation */}
              <div className="mb-6">
                <button 
                  onClick={() => setSelectedChapter(null)}
                  className="text-sm font-medium mb-6 flex items-center hover:underline transition-colors"
                  style={{ color: '#007BFF' }}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Chapter List
                </button>
              </div>

              {/* Professional Chapter Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#007BFF' }}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold" style={{ color: '#212529' }}>
                      {selectedChapter.title || selectedChapter.name || 'Chapter 1: EMS Systems'}
                    </h1>
                    <p className="text-lg italic" style={{ color: '#6C757D' }}>
                      Professional EMT Education Content
                    </p>
                  </div>
                </div>
              </div>

              {/* Chapter Content */}
              <div className="space-y-8">
                {/* Chapter Summary */}
                {selectedChapter.summary && (
                  <section 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#E3F2FD', 
                      border: '1px solid #007BFF'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">📘</span>
                      <h2 className="text-xl font-bold" style={{ color: '#1565C0' }}>Chapter Overview</h2>
                    </div>
                    <p className="text-base leading-relaxed" style={{ color: '#1565C0', lineHeight: '1.7' }}>
                      {selectedChapter.summary}
                    </p>
                  </section>
                )}

                {/* Learning Objectives */}
                {selectedChapter.objectives && selectedChapter.objectives.length > 0 && (
                  <section 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">🎯</span>
                      <h2 className="text-2xl font-bold" style={{ color: '#007BFF' }}>Learning Objectives</h2>
                    </div>
                    <div className="space-y-3">
                      {selectedChapter.objectives.map((objective, index) => (
                        <div key={index} className="flex items-start p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                          <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" style={{ backgroundColor: '#28A745' }}>
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                          <span style={{ color: '#212529', lineHeight: '1.6' }}>{objective}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Main Chapter Content */}
                <section 
                  className="p-8 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E9ECEF',
                    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                  }}
                >
                  <div className="flex items-center mb-6">
                    <span className="text-2xl mr-3">📚</span>
                    <h2 className="text-2xl font-bold" style={{ color: '#007BFF' }}>Chapter Content</h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    {formatChapterContent(selectedChapter.content)}
                  </div>
                </section>

                {/* Key Points */}
                {selectedChapter.keyPoints && selectedChapter.keyPoints.length > 0 && (
                  <section 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#FFF8E1', 
                      border: '1px solid #FFC107'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">⭐</span>
                      <h2 className="text-xl font-bold" style={{ color: '#856404' }}>Key Points to Remember</h2>
                    </div>
                    <div className="space-y-3">
                      {selectedChapter.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start p-3 rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
                          <div className="w-2 h-2 rounded-full mr-4 mt-3 flex-shrink-0" style={{ backgroundColor: '#FFC107' }}></div>
                          <p style={{ color: '#856404', lineHeight: '1.6' }}>{point}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Study Tips */}
                {selectedChapter.studyTips && selectedChapter.studyTips.length > 0 && (
                  <section 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#F3E5F5', 
                      border: '1px solid #9C27B0'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">💡</span>
                      <h2 className="text-xl font-bold" style={{ color: '#6A1B9A' }}>Study Tips & Memory Aids</h2>
                    </div>
                    <div className="space-y-3">
                      {selectedChapter.studyTips.map((tip, index) => (
                        <div key={index} className="flex items-start p-3 rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
                          <div className="w-2 h-2 rounded-full mr-4 mt-3 flex-shrink-0" style={{ backgroundColor: '#9C27B0' }}></div>
                          <p style={{ color: '#6A1B9A', lineHeight: '1.6' }}>{tip}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Source Reference */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E9ECEF',
                    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">📖</span>
                    <h2 className="text-xl font-bold" style={{ color: '#007BFF' }}>Source Reference</h2>
                  </div>
                  <p className="text-base" style={{ color: '#212529', lineHeight: '1.7' }}>
                    Content adapted from: <strong>Emergency Care and Transportation of the Sick and Injured, 12th Edition</strong> - 
                    The authoritative resource for EMT education and emergency medical services.
                  </p>
                </section>

                {/* Key Terms Section - AT THE BOTTOM */}
                {keyTerms.length > 0 && (
                  <section 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#E8F5E8', 
                      border: '1px solid #28A745'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">🔑</span>
                      <h2 className="text-xl font-bold" style={{ color: '#155724' }}>Key Terms</h2>
                    </div>
                    <ul className="space-y-2">
                      {keyTerms.map((term, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: '#28A745' }}></div>
                          <span className="text-base font-medium" style={{ color: '#155724' }}>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Clinical Disclaimer */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFEBEE', 
                    border: '1px solid #F44336'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <AlertCircle className="w-6 h-6 mr-3" style={{ color: '#D32F2F' }} />
                    <h3 className="text-lg font-semibold" style={{ color: '#D32F2F' }}>Important Clinical Notice</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#D32F2F' }}>
                    This educational content is for training purposes only. Always follow your local <span className="font-semibold" style={{ color: '#28A745', backgroundColor: '#E8F5E8', padding: '2px 4px', borderRadius: '4px' }}>protocols</span>, <span className="font-semibold" style={{ color: '#28A745', backgroundColor: '#E8F5E8', padding: '2px 4px', borderRadius: '4px' }}>medical director</span> guidelines, and scope of practice. Emergency medical care should only be provided by trained and certified personnel within their authorized scope of practice.
                  </p>
                </section>
              </div>
            </div>
          )
        }
        
        return (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4" style={{ color: '#212529' }}>Study Notes</h1>
              <p style={{ color: '#6C757D' }}>Professional EMT education materials from Emergency Care and Transportation of the Sick and Injured, 12th Edition</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-lg" style={{ color: '#6C757D' }}>Loading chapters...</div>
              </div>
            ) : chapters.length > 0 ? (
              <div className="grid gap-4">
                {chapters.map((chapter, index) => (
                  <div 
                    key={chapter.id || chapter.chapterNumber || index}
                    className="p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                    style={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                    }}
                    onClick={() => setSelectedChapter(chapter)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center mr-5 transition-colors group-hover:scale-110"
                          style={{ backgroundColor: '#007BFF' }}
                        >
                          <span className="text-white font-bold text-lg">
                            {chapter.chapterNumber || chapter.id || index + 1}
                          </span>
                        </div>
                        <div>
                          {chapter.moduleName && (
                            <div className="flex items-center mb-1">
                              <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#E3F2FD', color: '#1565C0' }}>
                                {chapter.moduleName}
                              </span>
                            </div>
                          )}
                          <h3 className="text-xl font-semibold mb-1" style={{ color: '#212529' }}>
                            {chapter.title || chapter.name || `Chapter ${index + 1}`}
                          </h3>
                          <p className="text-sm" style={{ color: '#6C757D' }}>
                            Professional EMT education content • Click to study
                          </p>
                          {chapter.summary && (
                            <p className="text-sm mt-1 line-clamp-2" style={{ color: '#6C757D' }}>
                              {chapter.summary.substring(0, 120)}...
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: '#6C757D' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212529' }}>No Chapters Found</h3>
                <p style={{ color: '#6C757D' }}>
                  Make sure emt-chapters-final.json is in the public folder
                </p>
              </div>
            )}
          </div>
        )
      default:
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#212529' }}>
              {navigationItems.find(item => item.id === currentPage)?.name || 'Page'}
            </h1>
            <div 
              className="p-6 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E9ECEF',
                boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
              }}
            >
              <p style={{ color: '#6C757D' }}>This section is under development...</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <header 
        className="sticky top-0 z-50 border-b"
        style={{ 
          backgroundColor: 'rgba(248, 249, 250, 0.95)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(0, 123, 255, 0.1)'
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-4">
              <img 
                src="/LOGOtrans.png" 
                alt="ProMedixEMS Logo" 
                className="w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 123, 255, 0.2))' }}
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold" style={{ color: '#212529' }}>
              Professional Emergency Medical Services Education
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        {renderCurrentPage()}
      </main>

      <nav 
        className="fixed bottom-0 left-0 right-0 border-t"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderColor: '#E9ECEF',
          boxShadow: '0 -2px 8px rgba(0, 123, 255, 0.08)'
        }}
      >
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-h-[60px] touch-manipulation"
                style={{
                  backgroundColor: isActive ? '#007BFF' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#6C757D'
                }}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium leading-tight text-center">
                  {item.name.split(' ')[0]}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default Application
