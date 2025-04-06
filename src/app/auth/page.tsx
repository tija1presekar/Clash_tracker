'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

export type LoginFormValues = {
  email: string
  password: string
}

export type RegisterFormValues = {
  name: string
  email: string
  password: string
  clashOfClansId: string
}

export default function AuthPage() {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const registerForm = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      clashOfClansId: ''
    }
  })

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router])

  const onLoginSubmit: SubmitHandler<LoginFormValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) toast.error('Invalid credentials!')
        if (callback?.ok && !callback.error) {
          toast.success('Successfully logged in!')
          router.push('/user')
        }
      })
      .finally(() => setIsLoading(false))
  }

  const onRegisterSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    setIsLoading(true)
    axios.post('/api/register', data)
      .then(() => signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      }))
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
  }

  const socialAction = (action: string) => {
    setIsLoading(true)
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) toast.error('Something went wrong!')
        if (callback?.ok && !callback.error) toast.success('Successfully logged in!')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="container flex items-center justify-center min-h-screen mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-neutral-900/80 backdrop-blur-sm text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome to ClashTracker
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Your ultimate Clash of Clans companion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={variant} onValueChange={(value) => {
              setVariant(value as 'LOGIN' | 'REGISTER')
              loginForm.reset()
              registerForm.reset()
            }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="LOGIN">Login</TabsTrigger>
                <TabsTrigger value="REGISTER">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="LOGIN">
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      {...loginForm.register('email', { required: 'Email is required' })}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      autoComplete="email"
                    />
                    {loginForm.formState.errors.email && 
                      <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
                    }
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      {...loginForm.register('password', { required: 'Password is required' })}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      autoComplete="current-password"
                    />
                    {loginForm.formState.errors.password && 
                      <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                    }
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="REGISTER">
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="register-name">Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      {...registerForm.register('name', { required: 'Name is required' })}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      autoComplete="name"
                    />
                    {registerForm.formState.errors.name && 
                      <p className="text-sm text-red-500">{registerForm.formState.errors.name.message}</p>
                    }
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      {...registerForm.register('email', { required: 'Email is required' })}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      autoComplete="email"
                    />
                    {registerForm.formState.errors.email && 
                      <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
                    }
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      {...registerForm.register('password', { required: 'Password is required' })}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      autoComplete="new-password"
                    />
                    {registerForm.formState.errors.password && 
                      <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                    }
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="register-clashOfClansId">Clash of Clans ID</Label>
                    <Input
                      id="register-clashOfClansId"
                      type="text"
                      {...registerForm.register('clashOfClansId', { required: 'Clash of Clans ID is required' })}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      placeholder="#XXXXXXXX"
                      autoComplete="off"
                    />
                    {registerForm.formState.errors.clashOfClansId && 
                      <p className="text-sm text-red-500">{registerForm.formState.errors.clashOfClansId.message}</p>
                    }
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col items-center w-full space-y-2">
              <Button variant="link" onClick={() => router.push('/')} className="text-gray-400">
                Back to home
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}