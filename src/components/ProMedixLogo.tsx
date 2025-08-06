import React from 'react'

interface ProMedixLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom'
  width?: number
  height?: number
  className?: string
  showGlow?: boolean
  animated?: boolean
}

const ProMedixLogo: React.FC<ProMedixLogoProps> = ({
  size = 'md',
  width,
  height,
  className = '',
  showGlow = false,
  animated = false
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8'
      case 'md': return 'w-12 h-12'
      case 'lg': return 'w-16 h-16'
      case 'xl': return 'w-24 h-24'
      case 'custom': return ''
      default: return 'w-12 h-12'
    }
  }

  const customStyle = size === 'custom' && (width || height) ? {
    width: width ? ${width}px : undefined,
    height: height ? ${height}px : undefined
  } : {}

  return (
    <div className={elative inline-block }>
      <div 
        className={
           
          rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm
          
        }
        style={customStyle}
      >
        <img 
          src="/promedix-logo.png" 
          alt="ProMedixEMS Logo" 
          className="w-full h-full object-contain p-1"
        />
      </div>
      
      {showGlow && (
        <div className={
          absolute inset-0  bg-primary/20 rounded-xl blur-lg scale-150 
          
        } style={customStyle} />
      )}
    </div>
  )
}

export default ProMedixLogo
