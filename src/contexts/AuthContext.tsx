import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔍 Initial session:', session)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔍 Auth state change:', { event, session })
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('🔍 Attempting to sign up user:', { email, fullName })
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      console.log('🔍 Sign up response:', { data, error })

      if (error) {
        if (error.message === 'Supabase not configured') {
          throw new Error('Please configure Supabase environment variables to enable authentication')
        }
        throw error
      }

      // The profile should be created automatically by the database trigger
      // Let's check if it was created
      if (data.user) {
        console.log('🔍 User created, checking if profile exists...')
        
        // Wait a moment for the trigger to execute
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle()

        console.log('🔍 Profile check result:', { profileData, profileError })
        
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('🔍 Profile creation failed:', profileError)
          // Try to create profile manually as fallback
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: data.user.email!,
              full_name: fullName,
              subscription_tier: 'free',
            })

          if (insertError) {
            console.error('🔍 Manual profile creation also failed:', insertError)
            throw insertError
          }
        }
      }

      return data
    } catch (error) {
      console.error('🔍 Sign up error:', error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔍 Attempting to sign in user:', { email })
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('🔍 Sign in response:', { data, error })

      if (error) {
        if (error.message === 'Supabase not configured') {
          throw new Error('Please configure Supabase environment variables to enable authentication')
        }
        throw error
      }
      
      return data
    } catch (error) {
      console.error('🔍 Sign in error:', error)
      throw error
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      if (error.message === 'Supabase not configured') {
        throw new Error('Please configure Supabase environment variables to enable authentication')
      }
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}