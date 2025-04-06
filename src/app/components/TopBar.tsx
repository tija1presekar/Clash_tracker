'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/app/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet';
import { Button } from '@/app/components/ui/button';
import { Menu } from 'lucide-react';

const TopBar = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/bases', label: 'Bases' },
    { href: '/player', label: 'Player' },
    { href: '/clan', label: 'Clan' },
    { href: '/about', label: 'About' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-semibold">ClashTracker</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex space-x-4">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`px-3 py-2 rounded-md transition-colors ${
                        pathname === item.href
                          ? 'text-primary bg-gray-100'
                          : 'text-muted-foreground hover:text-primary hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center space-x-4">
            {session && session?.data?.user?.email ? (
              <Link href="/user" className="flex items-center space-x-2">
                <Image
                  className="rounded-full"
                  width={32}
                  height={32}
                  src={session.data.user.image || '/images/placeholder.jpg'}
                  alt="user photo"
                />
                <span className="text-sm">{session.data.user.name}</span>
              </Link>
            ) : (
              <Link href="/auth" className="flex items-center space-x-2">
                <Image
                  className="rounded-full"
                  width={32}
                  height={32}
                  src="/images/placeholder.jpg"
                  alt="user photo"
                />
                <span className="text-sm">Login</span>
              </Link>
            )}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg ${pathname === item.href ? 'text-primary' : 'text-muted-foreground'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default TopBar;
