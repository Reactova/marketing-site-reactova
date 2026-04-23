'use client'

import { useState } from 'react'
import { Bell, Shield, Database, Palette } from 'lucide-react'
import { Button, Switch, Divider } from '@/components/ui'
import { Card, CardContent, CardHeader } from '@heroui/react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-['Outfit'] text-primary inline-block w-fit">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your dashboard preferences and configurations.
        </p>
      </div>

      <Card className="bg-card border border-border shadow-sm rounded-xl">
        <CardHeader className="flex gap-3 px-6 pt-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-['Outfit'] font-semibold text-foreground">Notifications</p>
            <p className="text-sm text-muted-foreground">Configure how you receive updates</p>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive notifications for new registrations
              </p>
            </div>
            <Switch
              isSelected={notifications}
              onValueChange={setNotifications}
            />
          </div>
          <Divider className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Email Alerts</p>
              <p className="text-xs text-muted-foreground">
                Get daily summary emails
              </p>
            </div>
            <Switch
              isSelected={emailAlerts}
              onValueChange={setEmailAlerts}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border border-border shadow-sm rounded-xl">
        <CardHeader className="flex gap-3 px-6 pt-6">
          <div className="p-2 rounded-lg bg-accent/10">
            <Palette className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="font-['Outfit'] font-semibold text-foreground">Appearance</p>
            <p className="text-sm text-muted-foreground">Customize the dashboard look</p>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">
                Use dark theme for the dashboard
              </p>
            </div>
            <Switch
              isSelected={darkMode}
              onValueChange={setDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border border-border shadow-sm rounded-xl">
        <CardHeader className="flex gap-3 px-6 pt-6">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <Database className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="font-['Outfit'] font-semibold text-foreground">Data Management</p>
            <p className="text-sm text-muted-foreground">Export and manage your data</p>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Export Registrations</p>
              <p className="text-xs text-muted-foreground">
                Download all registrations as CSV
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-primary/10 text-primary"
            >
              Export
            </Button>
          </div>
          <Divider className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Export Creator Applications</p>
              <p className="text-xs text-muted-foreground">
                Download all applications as CSV
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-primary/10 text-primary"
            >
              Export
            </Button>
          </div>
          <Divider className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Export Analytics</p>
              <p className="text-xs text-muted-foreground">
                Download session data as CSV
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-primary/10 text-primary"
            >
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border border-border shadow-sm rounded-xl">
        <CardHeader className="flex gap-3 px-6 pt-6">
          <div className="p-2 rounded-lg bg-red-500/10">
            <Shield className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="font-['Outfit'] font-semibold text-foreground">Security</p>
            <p className="text-sm text-muted-foreground">Manage account security</p>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Change Password</p>
              <p className="text-xs text-muted-foreground">
                Update your dashboard password
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-red-500/10 text-red-500"
            >
              Change
            </Button>
          </div>
          <Divider className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Session Management</p>
              <p className="text-xs text-muted-foreground">
                View and manage active sessions
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-red-500/10 text-red-500"
            >
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
