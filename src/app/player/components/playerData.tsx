'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';
import { basicInfo, clanInfo } from '@/data/playerInfo';
import React from 'react';

interface PlayerDataProps {
  player: any;
}

export default function PlayerData({ player }: PlayerDataProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const basicInfoData = basicInfo(player);
  const clanData = clanInfo(player);

  if (!player) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`/images/townHalls/th${player.townHallLevel}.png`}
                alt="Town Hall"
              />
              <AvatarFallback>TH</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{player.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{player.tag}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="basic"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="clan">Clan Info</TabsTrigger>
              <TabsTrigger value="troops">Troops</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <ScrollArea className="h-[350px] w-full rounded-md border p-4">
                <div className="grid grid-cols-2 gap-4">
                  {basicInfoData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {item.name === 'League' ? (
                        <>
                          <span className="font-medium">{item.name}:</span>
                          <Image
                            src={item.value}
                            alt={item.title || ''}
                            width={24}
                            height={24}
                          />
                        </>
                      ) : item.name === 'Labels' ? (
                        <>
                          <span className="font-medium">{item.name}:</span>
                          <div className="flex flex-wrap gap-1">
                            {item.value.split(',').map((label: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                              >
                                {label.trim()}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="font-medium">{item.name}:</span>
                          <span>
                            {typeof item.value === 'string'
                              ? item.value
                              : item.value.toString()}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="clan">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src={clanData[0].value}
                      alt="Clan Badge"
                      width={48}
                      height={48}
                    />
                    <div>
                      <h3 className="font-semibold">{clanData[1].value}</h3>
                      <p className="text-sm text-muted-foreground">
                        {clanData[2].value}
                      </p>
                    </div>
                  </div>
                  <p>Clan Level: {clanData[3].value}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="troops">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {player.troops
                    .filter((troop: any) => !troop.name.includes('Super'))
                    .map((troop: any) => (
                      <TooltipProvider key={`${troop.name}:${troop.unlockBuilding}`}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant={
                                troop.level === troop.maxLevel
                                  ? 'default'
                                  : 'secondary'
                              }
                              className="cursor-help"
                            >
                              {troop.name}: {troop.level}/{troop.maxLevel}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Unlocked at: {troop.unlockBuilding}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="achievements">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="space-y-2">
                  {player.achievements.map((achievement: any) => (
                    <Card key={`${achievement.name}:${achievement.info}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{achievement.name}</h3>
                          <Badge
                            variant={
                              achievement.stars === 3 ? 'default' : 'secondary'
                            }
                          >
                            {achievement.stars}/3 Stars
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">{achievement.info}</p>
                        <div className="mt-2 bg-secondary h-2 rounded-full">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(achievement.value / achievement.target) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="text-sm text-right mt-1">
                          {achievement.value}/{achievement.target}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {achievement.completionInfo}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
