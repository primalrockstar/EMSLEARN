import React from 'react'
import { Activity, Clock, BookOpen, Calculator } from 'lucide-react'

interface DashboardProps {
  userTier: string
}

const Dashboard: React.FC<DashboardProps> = ({ userTier }) => {
  const stats = [
    { label: 'Study Progress', value: '12%', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Time Studied', value: '2.5hrs', icon: Clock, color: 'bg-green-500' },
    { label: 'Protocols Learned', value: '8', icon: Activity, color: 'bg-purple-500' },
    { label: 'Calculations Done', value: '15', icon: Calculator, color: 'bg-orange-500' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
        <p className="text-gray-600">Continue your EMT training journey</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            Continue Reading
          </button>
          <button className="p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
            Practice Quiz
          </button>
          <button className="p-3 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
            Study Protocols
          </button>
          <button className="p-3 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium">
            Use Calculator
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
