'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'

export default function DashboardLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="grid-lines" />
      
      <Card className="w-full max-w-md bg-white border border-slate-200 shadow-xl">
        <CardHeader className="flex flex-col gap-2 pt-8 pb-4 px-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-['Outfit'] font-extrabold text-xl text-slate-900">
              Reactova
            </span>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          </div>
          <h1 className="font-['Outfit'] font-bold text-2xl text-slate-900">
            Dashboard Login
          </h1>
          <p className="text-sm text-slate-500">
            Enter your credentials to access the dashboard
          </p>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <InputGroup className="border-slate-200 bg-white shadow-sm">
                <InputGroupInput
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <InputGroupAddon align="inline-start">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div>
              <InputGroup className="border-slate-200 bg-white shadow-sm">
                <InputGroupInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroupAddon align="inline-start">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              className="w-full py-6"
            >
              {!loading && <LogIn className="w-4 h-4" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
