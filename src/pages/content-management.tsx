import React, { useState } from 'react'
import { Upload, Edit, Template, Database, BookOpen } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StudyFileUploader } from '@/components/study/FileUploader'
import { ContentTemplate } from '@/components/study/ContentTemplate'
import { ContentManager } from '@/components/study/ContentManager'

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<'upload' | 'template' | 'editor'>('upload')

  const tabs = [
    { id: 'upload', name: 'Upload Files', icon: Upload },
    { id: 'template', name: 'Template', icon: Template },
    { id: 'editor', name: 'Manual Editor', icon: Edit }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return <StudyFileUploader />
      case 'template':
        return <ContentTemplate />
      case 'editor':
        return <ContentManager 
          moduleId="module-1" 
          chapterId="chapter-1" 
          onSave={(content) => console.log('Saving content:', content)}
        />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Database className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Content Management</h2>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3 mb-3">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Add Your Complete Study Notes</h3>
        </div>
        <p className="text-blue-800 mb-4">
          Ready to add your 14 modules and 41 chapters of EMT study content to EMSLEARN:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded border border-blue-100">
            <div className="font-medium text-blue-900">📁 14 Modules</div>
            <div className="text-blue-700">Organized learning paths</div>
          </div>
          <div className="bg-white p-3 rounded border border-blue-100">
            <div className="font-medium text-blue-900">📚 41 Chapters</div>
            <div className="text-blue-700">Complete study content</div>
          </div>
          <div className="bg-white p-3 rounded border border-blue-100">
            <div className="font-medium text-blue-900">🎯 Interactive</div>
            <div className="text-blue-700">Searchable and trackable</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={lex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors }
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {renderContent()}
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Roadmap:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">Phase 1: Content Integration</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>Add your study material using methods above</li>
                <li>Organize content into 14 modules structure</li>
                <li>Review and format for optimal readability</li>
              </ol>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-600">Phase 2: Enhancement</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>Add progress tracking and bookmarks</li>
                <li>Create flashcards from content</li>
                <li>Deploy complete EMSLEARN platform</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
