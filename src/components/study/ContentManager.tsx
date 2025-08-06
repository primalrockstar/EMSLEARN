import React, { useState } from 'react'
import { Upload, FileText, Edit, Save, Plus } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ContentManagerProps {
  moduleId: string
  chapterId: string
  onSave: (content: any) => void
}

export const ContentManager: React.FC<ContentManagerProps> = ({ 
  moduleId, 
  chapterId, 
  onSave 
}) => {
  const [content, setContent] = useState('')
  const [keyPoints, setKeyPoints] = useState<string[]>([''])
  const [objectives, setObjectives] = useState<string[]>([''])
  const [isEditing, setIsEditing] = useState(false)

  const addKeyPoint = () => setKeyPoints([...keyPoints, ''])
  const addObjective = () => setObjectives([...objectives, ''])

  const updateKeyPoint = (index: number, value: string) => {
    const updated = [...keyPoints]
    updated[index] = value
    setKeyPoints(updated)
  }

  const updateObjective = (index: number, value: string) => {
    const updated = [...objectives]
    updated[index] = value
    setObjectives(updated)
  }

  const handleSave = () => {
    onSave({
      content,
      keyPoints: keyPoints.filter(point => point.trim()),
      objectives: objectives.filter(obj => obj.trim())
    })
    setIsEditing(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Content Editor</CardTitle>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "primary" : "outline"}
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Chapter Content</label>
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 p-3 border rounded-lg resize-none"
              placeholder="Paste your complete chapter content here..."
            />
          ) : (
            <div className="w-full h-64 p-3 border rounded-lg bg-gray-50 overflow-y-auto">
              {content || 'No content added yet. Click Edit to add content.'}
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Key Points</label>
            {isEditing && (
              <Button onClick={addKeyPoint} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add Point
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {keyPoints.map((point, index) => (
              <div key={index}>
                {isEditing ? (
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updateKeyPoint(index, e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter key point..."
                  />
                ) : (
                  <div className="p-2 bg-blue-50 rounded">• {point}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Learning Objectives</label>
            {isEditing && (
              <Button onClick={addObjective} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add Objective
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {objectives.map((objective, index) => (
              <div key={index}>
                {isEditing ? (
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter learning objective..."
                  />
                ) : (
                  <div className="p-2 bg-green-50 rounded">→ {objective}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {isEditing && (
          <Button onClick={handleSave} className="w-full" variant="primary">
            Save All Changes
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
