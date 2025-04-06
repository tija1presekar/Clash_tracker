'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { clanInfo, clanMembers } from '@/data/clanInfo';

interface ClanDataProps {
  clan: any;
}

export default function ClanData({ clan }: ClanDataProps) {
  const [activeTab, setActiveTab] = useState('info');
  const clanInfoData = clanInfo(clan);
  const clanMembersData = clanMembers(clan);

  if (!clan) return null;

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
              <AvatarImage src={clan.badgeUrls.small} alt="Clan Badge" />
              <AvatarFallback>CB</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{clan.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{clan.tag}</p>
            </div>
          </div>
          <p className="mt-2 text-sm">{clan.description}</p>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="info"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Clan Info</TabsTrigger>
              <TabsTrigger value="members">Clan Members</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <ScrollArea className="h-[410px] w-full rounded-md border p-4">
                <div className="grid grid-cols-2 gap-4">
                  {clanInfoData.slice(1).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between space-x-2"
                    >
                       {item.name === 'Labels' ? (
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
                            {item.value}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="members">
              <ScrollArea className="h-[400px] w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Trophies</TableHead>
                      <TableHead>Donations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clanMembersData.map((member: any) => (
                      <TableRow key={member.tag}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={member.leagueIcon}
                              alt="League"
                              width={20}
                              height={20}
                            />
                            <span>{member.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.trophies}</TableCell>
                        <TableCell>{member.donations}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
