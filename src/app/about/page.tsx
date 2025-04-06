'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Badge } from "@/app/components/ui/badge"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { FaSearch, FaUsers, FaUserAlt, FaChartBar } from 'react-icons/fa'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">About ClashTracker</CardTitle>
            <CardDescription className="text-center">
              Your ultimate companion for Clash of Clans statistics and tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="features">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
                <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
              </TabsList>
              <TabsContent value="features">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureCard
                      icon={<FaSearch className="w-6 h-6" />}
                      title="Player Search"
                      description="Look up detailed stats for any Clash of Clans player"
                    />
                    <FeatureCard
                      icon={<FaUsers className="w-6 h-6" />}
                      title="Clan Information"
                      description="View comprehensive clan details and member lists"
                    />
                    <FeatureCard
                      icon={<FaUserAlt className="w-6 h-6" />}
                      title="Base Designs"
                      description="Browse and share Clash of Clans base layouts"
                    />
                    <FeatureCard
                      icon={<FaChartBar className="w-6 h-6" />}
                      title="Progress Tracking"
                      description="Monitor your in-game progress and achievements"
                    />
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="how-it-works" className="animate-in fade-in-50">
                <ScrollArea className="h-[400px] w-full rounded-lg border border-border/40 bg-card p-6 shadow-sm">
                  <ol className="list-decimal marker:text-muted-foreground space-y-6">
                    <li className="group p-2 rounded-md transition-colors hover:bg-accent/50">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-foreground">Data Retrieval</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          ClashTracker uses the official Clash of Clans API to fetch real-time data about players, clans, and game statistics.
                        </p>
                      </div>
                    </li>
                    <li className="group p-2 rounded-md transition-colors hover:bg-accent/50">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-foreground">Data Processing</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          The retrieved data is processed and organized to present meaningful insights and statistics.
                        </p>
                      </div>
                    </li>
                    <li className="group p-2 rounded-md transition-colors hover:bg-accent/50">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-foreground">User Interface</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Our modern, responsive UI built with React and shadcn/ui components allows for easy navigation and data visualization.
                        </p>
                      </div>
                    </li>
                    <li className="group p-2 rounded-md transition-colors hover:bg-accent/50">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-foreground">Search Functionality</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Users can search for players or clans using their in-game tags to view detailed information.
                        </p>
                      </div>
                    </li>
                    <li className="group p-2 rounded-md transition-colors hover:bg-accent/50">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-foreground">Base Sharing</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Players can upload and share their base designs, which are stored in our database for others to view and use.
                        </p>
                      </div>
                    </li>
                  </ol>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="tech-stack">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Frontend:</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>React</Badge>
                      <Badge>Next.js</Badge>
                      <Badge>TypeScript</Badge>
                      <Badge>shadcn/ui</Badge>
                      <Badge>Tailwind CSS</Badge>
                      <Badge>Framer Motion</Badge>
                    </div>
                    <h3 className="text-lg font-semibold">Backend:</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Next.js Server</Badge>
                      <Badge>MongoDB</Badge>
                    </div>
                    <h3 className="text-lg font-semibold">APIs and Services:</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Clash of Clans API</Badge>
                      <Badge>Cloudinary (for image uploads)</Badge>
                    </div>
                    <h3 className="text-lg font-semibold">Deployment:</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Vercel</Badge>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="rounded-full bg-primary/10 p-3 mb-4">
          {icon}
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}