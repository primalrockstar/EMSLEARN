import React from 'react'
import { Copy, Download, FileText } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const ContentTemplate: React.FC = () => {
  const template = \// Chapter Content Template for EMSLEARN
export const chapter1Content = {
  title: "Chapter 1: EMS Systems Overview",
  estimatedReadTime: "45 minutes",
  content: \\\
# EMS Systems Overview

## Introduction
The Emergency Medical Services (EMS) system is a comprehensive network of resources designed to provide emergency medical care to patients in need. This system encompasses everything from the initial emergency call to definitive care at a medical facility.

### Key Components of EMS Systems
1. **Human Resources**: EMTs, Paramedics, Dispatchers, Medical Directors
2. **Physical Resources**: Ambulances, Equipment, Communication Systems
3. **Educational Resources**: Training Programs, Continuing Education
4. **Oversight**: Quality Assurance, Medical Direction, Regulations

### Chain of Survival
The chain of survival represents the critical steps needed to improve survival from cardiac arrest:
- Early Recognition and Activation
- Early CPR
- Early Defibrillation  
- Advanced Life Support
- Post-Cardiac Arrest Care

[Add your complete chapter content here...]
\\\,
  keyPoints: [
    "EMS systems are complex networks of coordinated resources",
    "Quality improvement is essential for optimal patient care",
    "EMTs are crucial links in the chain of survival",
    "Medical direction provides oversight and protocols",
    "Communication systems coordinate all EMS activities"
  ],
  objectives: [
    "Define emergency medical services (EMS) and EMS systems",
    "Describe the structure and function of EMS systems", 
    "Explain the EMT's role and responsibilities within the EMS system",
    "Understand the importance of medical direction and oversight",
    "Identify the components of the chain of survival"
  ]
}\

  const copyToClipboard = () => {
    navigator.clipboard.writeText(template)
    alert('Template copied to clipboard!')
  }

  const downloadTemplate = () => {
    const blob = new Blob([template], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'chapter-template.ts'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-6 h-6" />
          <span>Content Template for Your 41 Chapters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Quick Start Instructions:</h3>
          <ol className="text-sm space-y-1 list-decimal list-inside text-gray-700">
            <li>Copy the template below</li>
            <li>Replace the sample content with your actual study material</li>
            <li>Create one file for each of your 41 chapters</li>
            <li>Import these files into your study modules data</li>
          </ol>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button onClick={copyToClipboard} variant="primary">
              <Copy className="w-4 h-4 mr-2" />
              Copy Template
            </Button>
            <Button onClick={downloadTemplate} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-96">
            <pre className="whitespace-pre-wrap">{template}</pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Next Steps:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Create 41 chapter files using this template</li>
            <li>• Organize them into your 14 modules structure</li>
            <li>• Import all chapters into your studyModules.ts file</li>
            <li>• Test the content in your EMSLEARN app</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
