import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const DebugPanel: React.FC = () => {
  const { user, session, loading } = useAuth()
  const [dbStatus, setDbStatus] = useState<string>('Checking...')
  const [testResult, setTestResult] = useState<string>('')

  const testDatabaseConnection = async () => {
    try {
      setDbStatus('Testing connection...')
      
      // Test if we can access the profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      if (error) {
        setDbStatus(`Error: ${error.message}`)
        setTestResult(`Error code: ${error.code}, Details: ${error.details}`)
      } else {
        setDbStatus('✅ Database connection successful')
        setTestResult(`Profiles table accessible. Found ${data?.length || 0} records.`)
      }
    } catch (error) {
      setDbStatus('❌ Database connection failed')
      setTestResult(`Exception: ${error}`)
    }
  }

  const testAuthenticatedAccess = async () => {
    if (!user) {
      setTestResult('❌ No user logged in')
      return
    }

    try {
      setTestResult('Testing authenticated access...')
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (error) {
        setTestResult(`❌ Auth error: ${error.message}`)
      } else {
        setTestResult(`✅ Profile found: ${data?.full_name || 'No name'}`)
      }
    } catch (error) {
      setTestResult(`❌ Exception: ${error}`)
    }
  }

  useEffect(() => {
    testDatabaseConnection()
  }, [])

  return (
    <div className="fixed bottom-20 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md z-50">
      <h3 className="font-bold text-sm mb-3">🔍 Debug Panel</h3>
      
      <div className="space-y-2 text-xs">
        <div><strong>User:</strong> {user ? user.email : 'Not logged in'}</div>
        <div><strong>Session:</strong> {session ? 'Active' : 'None'}</div>
        <div><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</div>
        <div><strong>Database:</strong> {dbStatus}</div>
        {testResult && <div><strong>Test Result:</strong> {testResult}</div>}
      </div>

      <div className="mt-3 space-y-2">
        <button
          onClick={testDatabaseConnection}
          className="w-full px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
        >
          Test DB Connection
        </button>
        <button
          onClick={testAuthenticatedAccess}
          disabled={!user}
          className="w-full px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Test Auth Access
        </button>
      </div>
    </div>
  )
}

export default DebugPanel 