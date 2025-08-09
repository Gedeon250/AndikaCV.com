import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const StorageTest: React.FC = () => {
  const [testing, setTesting] = useState(false)
  const [testFile, setTestFile] = useState<File | null>(null)

  const testStorageConnection = async () => {
    try {
      setTesting(true)
      console.log('🔍 Testing storage connection...')
      
      const { data: buckets, error } = await supabase.storage.listBuckets()
      console.log('🔍 Buckets:', buckets)
      console.log('🔍 Buckets error:', error)
      
      if (error) {
        toast.error(`Storage error: ${error.message}`)
        return
      }
      
      const templatesBucket = buckets?.find((bucket: any) => bucket.name === 'templates')
      console.log('🔍 Templates bucket found:', templatesBucket)
      
      if (templatesBucket) {
        toast.success('✅ Templates bucket found!')
        
        // Test listing files in the bucket
        const { data: files, error: filesError } = await supabase.storage
          .from('templates')
          .list('', { limit: 10 })
        
        console.log('🔍 Files in templates bucket:', files)
        console.log('🔍 Files error:', filesError)
        
        if (filesError) {
          toast.error(`Cannot access bucket: ${filesError.message}`)
        } else {
          toast.success(`Bucket accessible! ${files?.length || 0} files found`)
        }
      } else {
        toast.error('❌ Templates bucket not found!')
      }
    } catch (error) {
      console.error('🔍 Storage test error:', error)
      toast.error('Storage connection failed')
    } finally {
      setTesting(false)
    }
  }

  const testFileUpload = async () => {
    if (!testFile) {
      toast.error('Please select a file first')
      return
    }

    try {
      setTesting(true)
      console.log('🔍 Testing file upload...')
      
      const fileName = `test-${Date.now()}-${testFile.name}`
      console.log('🔍 Uploading file:', fileName)
      console.log('🔍 File size:', testFile.size)
      console.log('🔍 File type:', testFile.type)
      
      const { data, error } = await supabase.storage
        .from('templates')
        .upload(fileName, testFile, {
          cacheControl: '3600',
          upsert: false
        })

      console.log('🔍 Upload result:', { data, error })
      
      if (error) {
        console.log('🔍 Upload error details:', error)
        console.log('🔍 Error message:', error.message)
        console.log('🔍 Error status:', error.statusCode)
        toast.error(`Upload failed: ${error.message}`)
      } else {
        console.log('🔍 Upload successful! File URL:', data)
        toast.success('File uploaded successfully!')
      }
    } catch (error) {
      console.error('🔍 Upload exception:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      toast.error(`Upload failed with exception: ${errorMessage}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="fixed top-20 left-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="font-bold text-sm mb-3">🧪 Storage Test</h3>
      
      <div className="space-y-3">
        <button 
          onClick={testStorageConnection} 
          disabled={testing} 
          className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          {testing ? 'Testing...' : 'Test Storage Connection'}
        </button>
        
        <div>
          <input 
            type="file" 
            onChange={(e) => setTestFile(e.target.files?.[0] || null)} 
            className="text-xs w-full" 
            accept=".pdf,.doc,.docx" 
          />
        </div>
        
        <button 
          onClick={testFileUpload} 
          disabled={testing || !testFile} 
          className="w-full px-3 py-2 bg-green-500 text-white rounded text-sm disabled:opacity-50 hover:bg-green-600 transition-colors"
        >
          {testing ? 'Uploading...' : 'Test File Upload'}
        </button>
      </div>
    </div>
  )
}

export default StorageTest 