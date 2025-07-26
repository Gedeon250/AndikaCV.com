import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'rw'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation keys
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cv_builder': 'CV Builder',
    'nav.templates': 'Templates',
    'nav.cover_letters': 'Cover Letters',
    'nav.pricing': 'Pricing',
    'nav.blog': 'Blog',
    'nav.dashboard': 'Dashboard',
    'nav.contact': 'Contact',
    
    // Auth
    'auth.sign_in': 'Sign In',
    'auth.sign_up': 'Sign Up',
    'auth.sign_out': 'Sign Out',
    'auth.get_started': 'Get Started',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.full_name': 'Full Name',
    'auth.confirm_password': 'Confirm Password',
    'auth.forgot_password': 'Forgot Password?',
    'auth.already_have_account': 'Already have an account?',
    'auth.dont_have_account': "Don't have an account?",
    
    // CV Builder
    'cv.personal_info': 'Personal Info',
    'cv.education': 'Education',
    'cv.experience': 'Experience',
    'cv.skills': 'Skills',
    'cv.languages': 'Languages',
    'cv.certifications': 'Certifications',
    'cv.references': 'References',
    'cv.create_cv': 'Create Your CV',
    'cv.preview': 'Preview CV',
    'cv.download': 'Download PDF',
    'cv.save_progress': 'Save Progress',
    'cv.next': 'Next',
    'cv.previous': 'Previous',
    'cv.step': 'Step',
    'cv.of': 'of',
    
    // Homepage
    'home.hero.title': 'Land Your Dream Job with Perfect CVs',
    'home.hero.subtitle': 'Create professional CVs and cover letters that get you hired. Trusted by thousands of job seekers across Rwanda and beyond.',
    'home.hero.cta': 'Create Your CV Now',
    'home.hero.demo': 'Watch Demo',
    'home.stats.cvs_created': 'CVs Created',
    'home.stats.happy_users': 'Happy Users',
    'home.stats.success_rate': 'Success Rate',
    'home.stats.support': 'Support',
    
    // Pricing
    'pricing.title': 'Choose Your Plan',
    'pricing.subtitle': 'Start for free and upgrade when you\'re ready. All plans include our core CV building tools and professional templates.',
    'pricing.free': 'Free',
    'pricing.premium': 'Premium',
    'pricing.professional': 'Professional',
    'pricing.forever': 'Forever',
    'pricing.monthly': 'Monthly',
    'pricing.quarterly': 'Quarterly',
    'pricing.get_started_free': 'Get Started Free',
    'pricing.start_premium': 'Start Premium',
    'pricing.go_professional': 'Go Professional',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.optional': 'Optional',
    'common.required': 'Required',
  },
  rw: {
    // Navigation
    'nav.home': 'Ahabanza',
    'nav.cv_builder': 'Gukora CV',
    'nav.templates': 'Inyandiko',
    'nav.cover_letters': 'Inyandiko Z\'Icyemezo',
    'nav.pricing': 'Ibiciro',
    'nav.blog': 'Inyandiko',
    'nav.dashboard': 'Ikibaho',
    'nav.contact': 'Twandikire',
    
    // Auth
    'auth.sign_in': 'Injira',
    'auth.sign_up': 'Iyandikishe',
    'auth.sign_out': 'Sohoka',
    'auth.get_started': 'Tangira',
    'auth.email': 'Imeyili',
    'auth.password': 'Ijambo banga',
    'auth.full_name': 'Amazina Yose',
    'auth.confirm_password': 'Emeza ijambo banga',
    'auth.forgot_password': 'Wibagiwe ijambo banga?',
    'auth.already_have_account': 'Ufite konti?',
    'auth.dont_have_account': 'Ntufite konti?',
    
    // CV Builder
    'cv.personal_info': 'Amakuru Yawe',
    'cv.education': 'Amashuri',
    'cv.experience': 'Urugero',
    'cv.skills': 'Ubumenyi',
    'cv.languages': 'Indimi',
    'cv.certifications': 'Impamyabumenyi',
    'cv.references': 'Abarebera',
    'cv.create_cv': 'Kora CV Yawe',
    'cv.preview': 'Reba CV',
    'cv.download': 'Kuramo PDF',
    'cv.save_progress': 'Bika Inyuma',
    'cv.next': 'Komeza',
    'cv.previous': 'Subira Inyuma',
    'cv.step': 'Intambwe',
    'cv.of': 'kuri',
    
    // Homepage
    'home.hero.title': 'Bona Akazi Kawe K\'Icyifuzo na CV Ziza',
    'home.hero.subtitle': 'Kora CV n\'inyandiko z\'icyemezo z\'umwuga zikumenya akazi. Zizewe na ibihumbi by\'abantu bashakisha akazi muri Rwanda no hanze.',
    'home.hero.cta': 'Kora CV Yawe Noneho',
    'home.hero.demo': 'Reba Urugero',
    'home.stats.cvs_created': 'CV Zakoze',
    'home.stats.happy_users': 'Abakoresha Bishimye',
    'home.stats.success_rate': 'Igihe Cya Nyuma',
    'home.stats.support': 'Gufasha',
    
    // Pricing
    'pricing.title': 'Hitamo Igice Cyawe',
    'pricing.subtitle': 'Tangira ku buntu kandi uhindure iyo ukoze. Ibice byose birimo ibikoresho by\'ibanze byo gukora CV n\'inyandiko z\'umwuga.',
    'pricing.free': 'Ubuntu',
    'pricing.premium': 'Premium',
    'pricing.professional': 'Umwuga',
    'pricing.forever': 'Iteka',
    'pricing.monthly': 'Ukwezi',
    'pricing.quarterly': 'Igihembwe',
    'pricing.get_started_free': 'Tangira ku Ubuntu',
    'pricing.start_premium': 'Tangira Premium',
    'pricing.go_professional': 'Kora Umwuga',
    
    // Common
    'common.loading': 'Birakora...',
    'common.error': 'Hari ikibazo cyabaye',
    'common.success': 'Byagenze neza!',
    'common.cancel': 'Hagarika',
    'common.save': 'Bika',
    'common.edit': 'Hindura',
    'common.delete': 'Siba',
    'common.add': 'Ongeraho',
    'common.remove': 'Kuraho',
    'common.yes': 'Yego',
    'common.no': 'Oya',
    'common.optional': 'Bihitamo',
    'common.required': 'Bikenewe',
  }
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'rw')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
} 