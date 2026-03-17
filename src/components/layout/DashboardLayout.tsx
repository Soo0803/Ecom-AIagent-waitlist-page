"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeItem: string;
  onItemClick: (item: string) => void;
  onLogout: () => void;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  notifications: number;
}

export function DashboardLayout({ 
  children, 
  activeItem, 
  onItemClick, 
  onLogout,
  user,
  notifications 
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cloud">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          activeItem={activeItem} 
          onItemClick={onItemClick}
          onLogout={onLogout}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <div className="h-full">
            <Sidebar 
              activeItem={activeItem} 
              onItemClick={(item) => {
                onItemClick(item);
                setIsMobileMenuOpen(false);
              }}
              onLogout={onLogout}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <div className="lg:ml-[260px]">
        <Header 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          user={user}
          notifications={notifications}
        />
        
        <main className="p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
