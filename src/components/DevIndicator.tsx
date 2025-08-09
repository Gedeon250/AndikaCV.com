import React from 'react'

const DevIndicator: React.FC = () => {
  const isDevelopment = import.meta.env.DEV

  if (!isDevelopment) return null

  return (
    <div className="fixed top-2 right-2 z-50">
      <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
        DEV
      </div>
    </div>
  )
}

export default DevIndicator 