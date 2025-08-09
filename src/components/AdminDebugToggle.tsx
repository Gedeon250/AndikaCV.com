import React, { useState, useEffect } from 'react'
import { Settings, Eye, EyeOff, Keyboard } from 'lucide-react'
import DebugPanel from './DebugPanel'
import StorageTest from './StorageTest'

const AdminDebugToggle: React.FC = () => {
  const [showDebugPanels, setShowDebugPanels] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Keyboard shortcut: Ctrl+Shift+D to toggle debug panels
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault()
        setShowDebugPanels(prev => !prev)
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Admin Debug Toggle Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              showDebugPanels 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
            title="Admin Debug Tools (Ctrl+Shift+D)"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          {isOpen && (
            <div className="absolute bottom-12 left-0 bg-white border border-gray-300 rounded-lg p-3 shadow-lg min-w-52">
              <h3 className="font-semibold text-sm mb-3 text-gray-800">🔧 Admin Debug Tools</h3>
              
              <button
                onClick={() => {
                  setShowDebugPanels(!showDebugPanels)
                  setIsOpen(false)
                }}
                className="flex items-center space-x-2 w-full text-left px-2 py-2 rounded hover:bg-gray-50 text-sm transition-colors"
              >
                {showDebugPanels ? <EyeOff className="h-4 w-4 text-red-500" /> : <Eye className="h-4 w-4 text-green-500" />}
                <span className="text-gray-700">{showDebugPanels ? 'Hide' : 'Show'} Debug Panels</span>
              </button>
              
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Keyboard className="h-3 w-3" />
                  <span>Ctrl+Shift+D</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Debug Panels */}
      {showDebugPanels && (
        <>
          <DebugPanel />
          <StorageTest />
        </>
      )}
    </>
  )
}

export default AdminDebugToggle 