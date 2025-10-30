'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: '홈', href: '/', icon: '🏠', active: true },
    { name: '도시탐색', href: '/cities', icon: '🗺️', active: true },
    { name: '밋업', href: '/meetups', icon: '👥', active: false, badge: '준비 중' },
    { name: '커뮤니티', href: '/community', icon: '💬', active: false, badge: '준비 중' },
    { name: '통계', href: '/stats', icon: '📊', active: false, badge: '준비 중' },
    { name: '가이드', href: '/guides', icon: '❓', active: false, badge: '준비 중' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏙️</span>
            <span className="text-xl font-bold text-primary">노마드코리아</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.active ? item.href : '#'}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${
                  item.active ? 'text-foreground' : 'text-muted-foreground cursor-not-allowed'
                }`}
                onClick={(e) => {
                  if (!item.active) {
                    e.preventDefault();
                    alert('준비 중인 기능입니다.');
                  }
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
                {item.badge && (
                  <span className="ml-1 text-xs bg-muted px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Login">
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Login">
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.active ? item.href : '#'}
                className={`flex items-center space-x-2 text-base font-medium transition-colors hover:text-primary ${
                  item.active ? 'text-foreground' : 'text-muted-foreground'
                }`}
                onClick={(e) => {
                  if (!item.active) {
                    e.preventDefault();
                    alert('준비 중인 기능입니다.');
                  }
                  setMobileMenuOpen(false);
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
                {item.badge && (
                  <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
