'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { getPlayerData } from '@/actions/getPlayerData'
import PlayerData from '../player/components/playerData'
import getUserClashId from '@/actions/getUserClashId'

export default function UserPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [playerData, setPlayerData] = useState<any>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth')
    } else if (status === 'authenticated' && session?.user?.email) {
      fetchUserData(session.user.email)
    }
  }, [status, session, router])

  const fetchUserData = async (email: string) => {
    try {
      const clashId = await getUserClashId(email)
      if (clashId) {
        const playerData = await getPlayerData(clashId)
        setPlayerData(playerData)
      } else {
        toast.error('Clash of Clans ID not found for this user')
      }
    } catch (error) {
      toast.error('Failed to fetch user data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      toast.success('You have been signed out!')
      router.push('/')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="h-[calc(100vh-50px)] flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-50px)] bg-gradient-to-br from-primary/20 to-secondary/20 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-3xl"
      >
        <Card className="bg-background/80 backdrop-blur-sm shadow-xl mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">User Profile</h1>
              <Button variant="destructive" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
            {session?.user?.name && (
              <p className="mt-2 text-lg">Welcome, {session.user.name}!</p>
            )}
          </CardContent>
        </Card>

        {playerData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PlayerData player={playerData} />
          </motion.div>
        ) : (
          <Card className="bg-background/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6">
              <p className="text-center text-lg">No Clash of Clans data found for this user.</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}