import React from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'rw' : 'en')
  }

  return (
    <button
      onClick={handleLanguageChange}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors rounded-lg hover:bg-gray-50"
      title={language === 'en' ? 'Hindura kuri Kinyarwanda' : 'Switch to English'}
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">
        {language === 'en' ? 'EN' : 'RW'}
      </span>
    </button>
  )
}

export default LanguageSwitcher 