import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'motion/react';
import { Heart, Download } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';
import { FullBase } from '@/types';
import getUser from '@/actions/getUser';
import addDownloads from '@/actions/addDownloads';
import { User } from '@prisma/client';

interface BaseItemProps {
  base: FullBase;
  listView?: boolean;
}

export default function BaseItem({ base, listView = false }: BaseItemProps) {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [baseLikes, setBaseLikes] = useState<string[]>(base.likes || []);

  useEffect(() => {
    const getUserData = async () => {
      if (session?.user?.email) {
        const user = await getUser(session.user.email);
        setCurrentUser(user);
      }
    };
    getUserData();
  }, [session]);

  const handleLike = async () => {
    try {
      const res = await axios.patch('/api/base', { id: base.id });
      if(res.data.likes) {
        setBaseLikes(res.data.likes);
        toast.success('Base liked!');
      } else {
        toast.error('An error occurred');
      }
    } catch (error) {
      toast.error('You need to be logged in to like a base');
    }
  };

  const handleDownload = async () => {
    const downloads = await addDownloads(base.id);
    base.downloads = downloads || base.downloads;
    window.open(base.baseUrl, '_blank');
  };

  const CardComponent = listView ? motion.div : Card;
  const cardProps = listView
    ? {
        className: 'flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors',
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <CardComponent {...cardProps}>
      {listView ? (
        <div className="relative h-20 w-20 shrink-0">
          <Image
            src={base.image || '/images/coc_wallpaper.jpg'}
            alt={base.name}
            className="object-cover rounded-md"
            fill
            sizes="80px"
            priority
          />
        </div>
      ) : (
        <CardHeader className="p-0">
          <Image
            src={base.image || '/images/coc_wallpaper.jpg'}
            alt={base.name}
            className="w-full h-36 object-cover rounded-t-lg"
            width={300}
            height={150}
            priority
          />
        </CardHeader>
      )}
      <CardContent className={listView ? 'flex-grow py-0 space-y-2' : 'mt-2'}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{base.name}</CardTitle>
            <CardDescription className="mt-1 text-sm line-clamp-2">
              {base.description}
            </CardDescription>
          </div>
          {listView && (
            <div className="flex items-center space-x-2 shrink-0">
              <Avatar className="h-6 w-6">
                <AvatarImage src={base.user?.image || undefined} />
                <AvatarFallback>{base.user?.name?.[0] || 'A'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{base.user?.name || 'Anonymous'}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(base.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {base.type.map((type) => (
            <Badge key={type} variant="secondary">
              {type}
            </Badge>
          ))}
          <Badge variant="outline">{base.townHall?.toUpperCase()}</Badge>
        </div>
      </CardContent>
      <CardFooter className={listView ? 'py-0 ml-auto' : 'flex flex-col mt-2'}>
        <div className={`flex ${listView ? 'space-x-2' : 'justify-between items-center w-full'}`}>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={handleLike}>
                    <Heart
                      className={`mr-1 h-4 w-4 ${baseLikes.includes(currentUser?.id || '') ? 'fill-red-500' : ''}`}
                    />
                    {baseLikes.length}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Like this base</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={handleDownload}>
                    <Download className="mr-1 h-4 w-4" />
                    {base.downloads}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download this base</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {!listView && (
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={base.user?.image || undefined} />
                <AvatarFallback>{base.user?.name?.[0] || 'A'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{base.user?.name || 'Anonymous'}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(base.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardFooter>
    </CardComponent>
  );
}