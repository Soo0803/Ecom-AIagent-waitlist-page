"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Camera,
  Moon,
  Sun,
  Monitor,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { cn } from '@/lib/utils';

interface SettingsSectionProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

function SettingsSection({ children, title, description }: SettingsSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-sumi">{title}</h3>
        {description && <p className="text-sm text-stone">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    inApp: true,
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <ScrollReveal>
        <div>
          <h1 className="text-2xl font-bold text-sumi">Settings</h1>
          <p className="text-stone mt-1">Manage your account and preferences</p>
        </div>
      </ScrollReveal>

      {/* Settings tabs */}
      <ScrollReveal delay={0.1}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white p-1">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-card space-y-8"
            >
              {/* Avatar section */}
              <SettingsSection title="Profile Picture" description="Upload your profile picture">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-indigo/10 text-indigo text-2xl">
                      YT
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </Button>
                    <Button variant="ghost" className="text-red-500">
                      Remove
                    </Button>
                  </div>
                </div>
              </SettingsSection>

              <div className="border-t border-stone/10" />

              {/* Personal info */}
              <SettingsSection title="Personal Information">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Yuki Tanaka" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="yuki@waga.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Product Manager" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Product" />
                  </div>
                </div>
              </SettingsSection>

              <div className="border-t border-stone/10" />

              {/* Bio */}
              <SettingsSection title="Bio">
                <div className="space-y-2">
                  <Label htmlFor="bio">About</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-stone/20 focus:border-indigo focus:ring-2 focus:ring-indigo/20 focus:outline-none resize-none"
                    placeholder="Tell us about yourself..."
                    defaultValue="Product Manager with 5+ years of experience in SaaS products. Passionate about user-centered design and building products that make a difference."
                  />
                </div>
              </SettingsSection>

              <div className="border-t border-stone/10" />

              {/* Preferences */}
              <SettingsSection title="Preferences">
                <div className="space-y-6">
                  {/* Theme */}
                  <div className="space-y-3">
                    <Label>Theme</Label>
                    <div className="flex gap-3">
                      {(['light', 'dark', 'system'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={cn(
                            'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all',
                            theme === t
                              ? 'border-indigo bg-indigo/10 text-indigo'
                              : 'border-stone/20 hover:border-stone/40'
                          )}
                        >
                          {t === 'light' && <Sun className="w-4 h-4" />}
                          {t === 'dark' && <Moon className="w-4 h-4" />}
                          {t === 'system' && <Monitor className="w-4 h-4" />}
                          <span className="capitalize">{t}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div className="space-y-3">
                    <Label>Language</Label>
                    <div className="flex gap-3">
                      {[
                        { value: 'en', label: 'English' },
                        { value: 'ja', label: 'Japanese' },
                      ].map((lang) => (
                        <button
                          key={lang.value}
                          onClick={() => setLanguage(lang.value)}
                          className={cn(
                            'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all',
                            language === lang.value
                              ? 'border-indigo bg-indigo/10 text-indigo'
                              : 'border-stone/20 hover:border-stone/40'
                          )}
                        >
                          <Globe className="w-4 h-4" />
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SettingsSection>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-indigo hover:bg-indigo-dark text-white">
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-card space-y-6"
            >
              <SettingsSection 
                title="Notification Settings" 
                description="Choose how you want to be notified"
              >
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Email Notifications', description: 'Receive important updates via email' },
                    { key: 'push', label: 'Push Notifications', description: 'Receive push notifications in your browser' },
                    { key: 'inApp', label: 'In-App Notifications', description: 'Show notifications within the app' },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 rounded-lg border border-stone/10"
                    >
                      <div>
                        <p className="font-medium text-sumi">{item.label}</p>
                        <p className="text-sm text-stone">{item.description}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, [item.key]: checked })
                        }
                      />
                    </div>
                  ))}
                </div>
              </SettingsSection>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-indigo hover:bg-indigo-dark text-white">
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-card space-y-6"
            >
              <SettingsSection title="Password" description="Change your password regularly for security">
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="bg-indigo hover:bg-indigo-dark text-white">
                    Change Password
                  </Button>
                </div>
              </SettingsSection>

              <div className="border-t border-stone/10" />

              <SettingsSection title="Two-Factor Authentication" description="Add an extra layer of security">
                <div className="flex items-center justify-between p-4 rounded-lg border border-stone/10">
                  <div>
                    <p className="font-medium text-sumi">Two-Factor Authentication (2FA)</p>
                    <p className="text-sm text-stone">Secure your account with 2FA</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </SettingsSection>

              <div className="border-t border-stone/10" />

              <SettingsSection title="Active Sessions">
                <div className="space-y-3">
                  {[
                    { device: 'Chrome on macOS', location: 'Tokyo, Japan', current: true },
                    { device: 'Safari on iPhone', location: 'Tokyo, Japan', current: false },
                    { device: 'Firefox on Windows', location: 'Osaka, Japan', current: false },
                  ].map((session, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-stone/10"
                    >
                      <div>
                        <p className="font-medium text-sumi flex items-center gap-2">
                          {session.device}
                          {session.current && (
                            <span className="text-xs bg-moss/10 text-moss px-2 py-0.5 rounded">
                              Current Session
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-stone">{session.location}</p>
                      </div>
                      {!session.current && (
                        <Button variant="ghost" className="text-red-500">
                          End
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </SettingsSection>
            </motion.div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-card space-y-6"
            >
              <SettingsSection title="Current Plan">
                <div className="p-6 rounded-xl bg-indigo/5 border border-indigo/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-lg font-semibold text-sumi">Pro Plan</p>
                      <p className="text-stone">$50 / user / month</p>
                    </div>
                    <span className="px-3 py-1 bg-indigo text-white text-sm rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="ghost" className="text-red-500">
                      Cancel
                    </Button>
                  </div>
                </div>
              </SettingsSection>

              <div className="border-t border-stone/10" />

              <SettingsSection title="Usage">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-stone">Storage</span>
                      <span className="text-sm font-medium">45GB / 100GB</span>
                    </div>
                    <div className="h-2 bg-washi rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-indigo rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-stone">Projects</span>
                      <span className="text-sm font-medium">12 / 20</span>
                    </div>
                    <div className="h-2 bg-washi rounded-full overflow-hidden">
                      <div className="h-full w-[60%] bg-moss rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-stone">Team Members</span>
                      <span className="text-sm font-medium">8 / 10</span>
                    </div>
                    <div className="h-2 bg-washi rounded-full overflow-hidden">
                      <div className="h-full w-[80%] bg-terracotta rounded-full" />
                    </div>
                  </div>
                </div>
              </SettingsSection>

              <div className="border-t border-stone/10" />

              <SettingsSection title="Billing History">
                <div className="space-y-3">
                  {[
                    { date: 'Mar 1, 2024', amount: '$400', status: 'paid' },
                    { date: 'Feb 1, 2024', amount: '$400', status: 'paid' },
                    { date: 'Jan 1, 2024', amount: '$400', status: 'paid' },
                  ].map((invoice, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-stone/10"
                    >
                      <div>
                        <p className="font-medium text-sumi">{invoice.date}</p>
                        <p className="text-sm text-stone">Pro Plan - 8 users</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{invoice.amount}</span>
                        <Button variant="outline" size="sm">
                          Receipt
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </SettingsSection>
            </motion.div>
          </TabsContent>
        </Tabs>
      </ScrollReveal>
    </div>
  );
}
