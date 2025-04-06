'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';

export default function LandingPage() {
  useEffect(() => {
    const handleResize = () => {
      document.body.style.overflow = window.innerHeight < document.body.scrollHeight ? 'auto' : 'hidden';
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGooglePlayClick = () => {
    window.open(
      'https://play.google.com/store/apps/details?id=com.supercell.clashofclans&hl=en_US&gl=US',
      '_blank'
    );
  };

  const handleAppleStoreClick = () => {
    window.open(
      'https://apps.apple.com/us/app/clash-of-clans/id529479190',
      '_blank'
    );
  };

  return (
    <div className="min-h-[95vh] w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col justify-center items-center p-4 md:p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-4">
          Welcome to ClashTracker
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Your ultimate companion for Clash of Clans
        </p>
      </motion.div>

      <Card className="w-full max-w-4xl bg-background/80 backdrop-blur-sm shadow-xl">
        <CardContent className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1"
            >
              <Image
                src="/images/coc_img.png"
                alt="Clash of Clans"
                width={300}
                height={300}
                priority
                className="rounded-full shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1 text-center md:text-left"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Clash?</h2>
              <p className="text-lg mb-6">
                Download Clash of Clans now and start your epic journey!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  size="lg"
                  onClick={handleGooglePlayClick}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <FaGooglePlay className="mr-2" size={24} />
                  Google Play
                </Button>
                <Button
                  size="lg"
                  onClick={handleAppleStoreClick}
                  className="bg-gray-800 hover:bg-gray-900 text-white"
                >
                  <FaApple className="mr-2" size={24} />
                  App Store
                </Button>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-lg text-muted-foreground">
          Already have the game?{' '}
          <a href="/auth" className="text-primary hover:underline">
            Login to ClashTracker
          </a>
        </p>
      </motion.div>
    </div>
  );
}