import React, { useState, useEffect } from 'react'
import { Home, Calculator, FileText, Pill, BookOpen, ChevronRight, ArrowLeft, Clock, AlertCircle, Target, Users, Settings, Award, ExternalLink } from 'lucide-react'

function Application() {
  const [currentPage, setCurrentPage] = useState('home')
  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigationItems = [
    { id: 'home', name: 'Dashboard', icon: Home },
    { id: 'notes', name: 'Study Notes', icon: BookOpen },
    { id: 'calculators', name: 'Calculators', icon: Calculator },
    { id: 'protocols', name: 'Protocols', icon: FileText },
    { id: 'medications', name: 'Medications', icon: Pill }
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
              >
                <Calculator className="w-12 h-12 mx-auto mb-4" style={{ color: '#28A745' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212529' }}>Calculators</h3>
                <p style={{ color: '#6C757D' }}>15 field-ready tools</p>
              </div>
              <div 
                className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E9ECEF',
                  boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                }}
              >
                <Pill className="w-12 h-12 mx-auto mb-4" style={{ color: '#6F42C1' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212529' }}>Medications</h3>
                <p style={{ color: '#6C757D' }}>100+ EMS medications</p>
              </div>
              <div 
                className="p-6 rounded-xl text-center transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E9ECEF',
                  boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                }}
              >
                <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: '#DC3545' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#212529' }}>Protocols</h3>
                <p style={{ color: '#6C757D' }}>Emergency procedures</p>
              </div>
            </div>
          </div>
        )
      case 'notes':
        if (selectedChapter) {
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
                      Chapter 1: EMS Systems
                    </h1>
                    <p className="text-lg italic" style={{ color: '#6C757D' }}>
                      Academy Tier – Overview
                    </p>
                  </div>
                </div>
              </div>

              {/* Chapter Content */}
              <div className="space-y-8">
                {/* Introduction Section */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E9ECEF',
                    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">📘</span>
                    <h2 className="text-2xl font-bold" style={{ color: '#007BFF' }}>Introduction</h2>
                  </div>
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#212529', lineHeight: '1.7' }}>
                    <span className="font-semibold" style={{ color: '#007BFF', backgroundColor: '#E3F2FD', padding: '2px 4px', borderRadius: '4px' }}>EMS</span> is a coordinated system of emergency medical care providers, governed by state laws, tasked with rapid response, patient stabilization, and transport. This chapter introduces key functions, history, and operational structures.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#007BFF' }}></div>
                      <span style={{ color: '#212529' }}>
                        <span className="font-semibold" style={{ color: '#007BFF', backgroundColor: '#E3F2FD', padding: '2px 4px', borderRadius: '4px' }}>EMS</span> is defined as a <strong>system</strong>, not just a service.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#007BFF' }}></div>
                      <span style={{ color: '#212529' }}>
                        It involves teams delivering <strong>emergency care and transportation</strong>.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#007BFF' }}></div>
                      <span style={{ color: '#212529' }}>
                        <span className="font-semibold" style={{ color: '#007BFF', backgroundColor: '#E3F2FD', padding: '2px 4px', borderRadius: '4px' }}>EMTs</span> function within a legal and medical framework.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#007BFF' }}></div>
                      <span style={{ color: '#212529' }}>
                        State laws define <span className="font-semibold" style={{ color: '#28A745', backgroundColor: '#E8F5E8', padding: '2px 4px', borderRadius: '4px' }}>EMS scope and protocols</span>.
                      </span>
                    </li>
                  </ul>
                </section>

                {/* Learning Objectives */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E9ECEF',
                    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🧠</span>
                    <h2 className="text-2xl font-bold" style={{ color: '#007BFF' }}>Learning Objectives</h2>
                  </div>
                  <p className="text-base mb-4" style={{ color: '#212529' }}>
                    By the end of this chapter, learners will be able to:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Describe the history and evolution of EMS in the U.S.",
                      "Differentiate levels of EMS providers and training scopes.",
                      "Identify the major components of the EMS system.",
                      "Recognize the core responsibilities and ethical obligations of EMTs.",
                      "Understand certification, licensure, and ADA compliance."
                    ].map((objective, index) => (
                      <div key={index} className="flex items-start p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" style={{ backgroundColor: '#28A745' }}>
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span style={{ color: '#212529', lineHeight: '1.6' }}>{objective}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Chapter Modules */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E9ECEF',
                    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🧩</span>
                    <h2 className="text-2xl font-bold" style={{ color: '#007BFF' }}>Chapter Modules</h2>
                  </div>
                  <p className="text-base mb-4" style={{ color: '#212529' }}>
                    Each section below links to deeper modular files.
                  </p>
                  
                  <div className="overflow-hidden rounded-lg border" style={{ borderColor: '#E9ECEF' }}>
                    <table className="w-full">
                      <thead style={{ backgroundColor: '#F8F9FA' }}>
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold" style={{ color: '#212529' }}>Section</th>
                          <th className="px-4 py-3 text-left font-semibold" style={{ color: '#212529' }}>Type</th>
                          <th className="px-4 py-3 text-left font-semibold" style={{ color: '#212529' }}>Linked Files</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { section: "History of EMS", type: "📜 Timeline", files: "history/timeline.md\nhistory/key-documents.md" },
                          { section: "Levels of EMS Providers", type: "📊 Overview", files: "levels-of-providers/*.md" },
                          { section: "EMS System Components", type: "⚙️ Breakdown", files: "components/*.md" },
                          { section: "EMT Roles and Responsibilities", type: "🦺 Practices", files: "roles-and-responsibilities/*.md" },
                          { section: "Licensure & Certification", type: "📋 Compliance", files: "licensure-and-certification/*.md" },
                          { section: "Quality Improvement & Safety", type: "🔍 Oversight", files: "quality-and-safety/*.md" },
                          { section: "Research & Evidence-Based Care", type: "🧪 Decision-Making", files: "research/evidence-based-care.md" }
                        ].map((row, index) => (
                          <tr key={index} className="border-t" style={{ borderColor: '#E9ECEF' }}>
                            <td className="px-4 py-3 font-medium" style={{ color: '#212529' }}>{row.section}</td>
                            <td className="px-4 py-3" style={{ color: '#6C757D' }}>{row.type}</td>
                            <td className="px-4 py-3 text-sm" style={{ color: '#007BFF' }}>
                              {row.files.split('\n').map((file, fileIndex) => (
                                <div key={fileIndex} className="flex items-center">
                                  <code className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F8F9FA', color: '#6C757D' }}>
                                    {file}
                                  </code>
                                </div>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Scope Tags */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#E3F2FD', 
                    border: '1px solid #007BFF'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🧠</span>
                    <h2 className="text-xl font-bold" style={{ color: '#1565C0' }}>Scope Tags</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#007BFF', color: '#FFFFFF' }}>
                      Academy Tier
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#FFFFFF', color: '#1565C0', border: '1px solid #007BFF' }}>
                      Suitable for: EMR, EMT, AEMT (review), Instructor-led foundations
                    </span>
                  </div>
                </section>

                {/* Quick Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Flashcard Sets */}
                  <div 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#FFF8E1', 
                      border: '1px solid #FFC107'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">📎</span>
                      <h3 className="text-lg font-bold" style={{ color: '#856404' }}>Flashcard Sets</h3>
                    </div>
                    <p className="text-sm mb-3" style={{ color: '#856404' }}>
                      Flashcards for this chapter are broken out by learning objective:
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li style={{ color: '#856404' }}>• 01a-history.yaml</li>
                      <li style={{ color: '#856404' }}>• 01b-levels.yaml</li>
                      <li style={{ color: '#856404' }}>• 01c-components.yaml</li>
                    </ul>
                  </div>

                  {/* Quiz Modules */}
                  <div 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#F3E5F5', 
                      border: '1px solid #9C27B0'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">📝</span>
                      <h3 className="text-lg font-bold" style={{ color: '#6A1B9A' }}>Quiz Modules</h3>
                    </div>
                    <div className="overflow-hidden rounded-lg border" style={{ borderColor: '#9C27B0' }}>
                      <table className="w-full text-sm">
                        <thead style={{ backgroundColor: '#6A1B9A' }}>
                          <tr>
                            <th className="px-3 py-2 text-left text-white font-medium">Difficulty</th>
                            <th className="px-3 py-2 text-left text-white font-medium">File Name</th>
                          </tr>
                        </thead>
                        <tbody style={{ backgroundColor: '#FFFFFF' }}>
                          <tr className="border-t" style={{ borderColor: '#E1BEE7' }}>
                            <td className="px-3 py-2" style={{ color: '#6A1B9A' }}>Easy</td>
                            <td className="px-3 py-2" style={{ color: '#6A1B9A' }}>quiz-easy.json</td>
                          </tr>
                          <tr className="border-t" style={{ borderColor: '#E1BEE7' }}>
                            <td className="px-3 py-2" style={{ color: '#6A1B9A' }}>Standard</td>
                            <td className="px-3 py-2" style={{ color: '#6A1B9A' }}>quiz-standard.json</td>
                          </tr>
                          <tr className="border-t" style={{ borderColor: '#E1BEE7' }}>
                            <td className="px-3 py-2" style={{ color: '#6A1B9A' }}>Advanced</td>
                            <td className="px-3 py-2" style={{ color: '#6A1B9A' }}>quiz-advanced.json</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Cross-References */}
                  <div 
                    className="p-6 rounded-xl"
                    style={{ 
                      backgroundColor: '#E8F5E8', 
                      border: '1px solid #28A745'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">🔗</span>
                      <h3 className="text-lg font-bold" style={{ color: '#155724' }}>Cross-References</h3>
                    </div>
                    <p className="text-sm mb-3" style={{ color: '#155724' }}>
                      Tagged for integration with:
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li style={{ color: '#155724' }}>• Medication guides (standing orders, scope by level)</li>
                      <li style={{ color: '#155724' }}>• Protocol systems (medical direction, MIH)</li>
                      <li style={{ color: '#155724' }}>• Scenarios (ethics, quality improvement, patient safety)</li>
                    </ul>
                  </div>
                </div>

                {/* References */}
                <section 
                  className="p-6 rounded-xl"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E9ECEF',
                    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.08)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🔍</span>
                    <h2 className="text-2xl font-bold" style={{ color: '#007BFF' }}>References</h2>
                  </div>
                  <p className="text-base" style={{ color: '#212529', lineHeight: '1.7' }}>
                    All citations and sources used in this module are listed in <code className="px-2 py-1 rounded text-sm" style={{ backgroundColor: '#F8F9FA', color: '#6C757D' }}>references.json</code>, with glossary links in app for quick lookup.
                  </p>
                </section>

                {/* Action Footer */}
                <section 
                  className="p-6 rounded-xl text-center"
                  style={{ 
                    backgroundColor: '#F8F9FA', 
                    border: '1px solid #E9ECEF'
                  }}
                >
                  <p className="text-lg mb-4" style={{ color: '#212529' }}>
                    Want me to auto-generate the full text for <code className="px-2 py-1 rounded text-sm" style={{ backgroundColor: '#FFFFFF', color: '#6C757D' }}>history/timeline.md</code> or begin flashcard generation?
                  </p>
                  <p className="text-base" style={{ color: '#6C757D' }}>
                    We can tackle one module at a time or spin up the entire folder set. Let's build it layer by layer.
                  </p>
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
              <p style={{ color: '#6C757D' }}>Professional EMT education materials organized by chapter</p>
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
                            Chapter 1: EMS Systems
                          </h3>
                          <p className="text-sm" style={{ color: '#6C757D' }}>
                            Academy Tier – Foundation concepts for EMT practice
                          </p>
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
