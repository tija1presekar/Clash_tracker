'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { getPlayerData } from '@/actions/getPlayerData';
import PlayerData from './components/playerData';

type FormValues = {
  tag: string;
};

export default function Player() {
  const [isLoading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await getPlayerData(data.tag);
      setPlayerData(res);
    } catch (error) {
      toast.error('Failed to fetch player data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-50px)] bg-gradient-to-br from-primary/20 to-secondary/20 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-3xl"
      >
        <Card className="bg-background/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
              Player Search
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  {...register('tag', { required: 'Player tag is required' })}
                  placeholder="#12345678"
                  className="flex-grow"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {errors.tag && (
                <p className="text-destructive text-sm">{errors.tag.message}</p>
              )}
            </form>
          </CardContent>
        </Card>

        {playerData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <PlayerData player={playerData} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
