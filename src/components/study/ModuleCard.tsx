import React from 'react'
import { BookOpen, Clock, Tag, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StudyModule } from '@/types/study'

interface ModuleCardProps {
  module: StudyModule
  onSelect: (moduleId: string) => void
  progress?: number
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  onSelect, 
  progress = 0 
}) => {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Module {module.moduleNumber}: {module.title}
              </CardTitle>
              <span className={inline-block px-2 py-1 rounded-full text-xs font-medium }>
                {module.difficulty}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm">{module.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{module.estimatedTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{module.chapters.length} chapters</span>
          </div>
        </div>

        {progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: ${progress}% }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {module.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
          {module.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{module.tags.length - 3} more</span>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={() => onSelect(module.id)}
          className="w-full"
          variant="primary"
        >
          Start Module
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}
