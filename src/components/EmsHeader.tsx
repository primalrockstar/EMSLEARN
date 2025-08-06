import React, { useState } from 'react'
import { 
  Search, 
  Moon, 
  Sun, 
  Settings, 
  User, 
  Wifi, 
  WifiOff,
  Stethoscope,
  ShieldCheck,
  GraduationCap,
  Menu,
  X
} from 'lucide-react'
import ProMedixLogo from './ProMedixLogo'

interface EmsHeaderProps {
  userTier: 'basic' | 'aemt' | 'paramedic'
  theme: 'light' | 'dark'
  isOffline: boolean
  onThemeToggle: () => void
  onTierChange: (tier: 'basic' | 'aemt' | 'paramedic') => void
  onSearch: (query: string) => void
  onMenuToggle: () => void
  mobileMenuOpen: boolean
}

const EmsHeader: React.FC<EmsHeaderProps> = ({
  userTier,
  theme,
  isOffline,
  onThemeToggle,
  onTierChange,
  onSearch,
  onMenuToggle,
  mobileMenuOpen
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [tierDropdownOpen, setTierDropdownOpen] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'basic': return Stethoscope
      case 'aemt': return ShieldCheck
      case 'paramedic': return GraduationCap
      default: return User
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'aemt': return 'text-red-600 bg-red-50 border-red-200'
      case 'paramedic': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'basic': return 'EMT-B'
      case 'aemt': return 'AEMT'
      case 'paramedic': return 'Paramedic'
      default: return 'Academy'
    }
  }

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 group">
              <ProMedixLogo 
                size="md" 
                animated={true} 
                showGlow={true} 
              />
              
              <div className="hidden sm:block">
                <h1 className="heading-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  ProMedixEMS
                </h1>
                <p className="caption-text">EMT Field Toolkit</p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setTierDropdownOpen(!tierDropdownOpen)}
                className={lex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 glove-friendly hover:shadow-md }
              >
                {React.createElement(getTierIcon(userTier), { className: "w-4 h-4" })}
                <span className="font-semibold text-sm">{getTierLabel(userTier)}</span>
                <svg className={w-4 h-4 transition-transform duration-200 } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {tierDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 glass-modal animate-scale-in z-10">
                  <div className="p-2 space-y-1">
                    {['basic', 'aemt', 'paramedic'].map((tier) => {
                      const Icon = getTierIcon(tier)
                      return (
                        <button
                          key={tier}
                          onClick={() => {
                            onTierChange(tier as any)
                            setTierDropdownOpen(false)
                          }}
                          className={w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors glove-friendly }
                        >
                          <Icon className="w-4 h-4" />
                          <div>
                            <div className="font-medium">{getTierLabel(tier)}</div>
                            <div className="text-xs opacity-70">
                              {tier === 'basic' && 'Basic Life Support'}
                              {tier === 'aemt' && 'Advanced EMT'}
                              {tier === 'paramedic' && 'Paramedic Level'}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search chapters, meds, calcs…"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 bg-background/60 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 glove-friendly backdrop-blur-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    onSearch('')
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className={lex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 }>
              {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
              <span className="hidden sm:inline">{isOffline ? 'Offline' : 'Online'}</span>
            </div>

            <button
              onClick={onThemeToggle}
              className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-200 glove-friendly group"
              aria-label={Switch to  mode}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-secondary-foreground group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <Sun className="w-5 h-5 text-secondary-foreground group-hover:scale-110 transition-transform duration-200" />
              )}
            </button>

            <button className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-200 glove-friendly group hidden sm:block">
              <Settings className="w-5 h-5 text-secondary-foreground group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <button
              onClick={onMenuToggle}
              className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-200 glove-friendly md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-secondary-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-secondary-foreground" />
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search chapters, meds, calcs…"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-background/60 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 glove-friendly backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 bg-background/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Last Updated: January 20, 2024</span>
            <span className="hidden sm:inline">Content Version 2024.1</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default EmsHeader
