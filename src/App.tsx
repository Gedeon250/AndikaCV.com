import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import CVBuilder from './pages/CVBuilder'
import CoverLetterGenerator from './pages/CoverLetterGenerator'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Templates from './pages/Templates'
import Pricing from './pages/Pricing'
import DebugPanel from './components/DebugPanel'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cv-builder" element={<CVBuilder />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/cover-letter" element={<CoverLetterGenerator />} />
                <Route path="/blog" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl text-gray-600">Blog Coming Soon</h1></div>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
                               <Footer />
                   <Toaster position="top-right" />
                   <DebugPanel />
                 </div>
               </Router>
             </AuthProvider>
           </LanguageProvider>
  )
}

export default App