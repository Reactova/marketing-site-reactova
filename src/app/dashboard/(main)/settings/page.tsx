'use client'

import { useState } from 'react'
import { Bell, Shield, Database, Palette } from 'lucide-react'
import { Card, CardHeader, CardBody, Button, Switch, Divider } from '@/components/ui'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-['Outfit'] font-bold text-2xl text-[var(--text)] mb-2">
          Settings
        </h2>
        <p className="text-[var(--muted)]">
          Manage your dashboard preferences and configurations.
        </p>
      </div>

      <Card className="bg-[var(--surface)] border border-[var(--border)]">
        <CardHeader className="flex gap-3 px-6 pt-6">
          <div className="p-2 rounded-lg bg-[var(--primary)]/10">
            <Bell className="w-5 h-5 text-[var(--primary)]" />
          </div>
          <div>
            <p className="font-['Outfit'] font-semibold text-[var(--text)]">Notifications</p>
            <p className="text-sm text-[var(--muted)]">Configure how you receive updates</p>
          </div>
        </CardHeader>
        <CardBody className="px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text)]">Push Notifications</p>
              <p className="text-xs text-[var(--muted)]">
                Receive notifications for new registrations
              </p>
            </div>
            <Switch
              isSelected={notifications}
              onValueChange={setNotifications}
            />
          </div>
          <Divider className="bg-[var(--border)]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text)]">Email Alerts</p>
              <p className="text-xs text-[var(--muted)]">
                Get daily summary emails
              </p>
            </div>
            <Switch
              isSelected={emailAlerts}
              onValueChange={setEmailAlerts}
            />
          </div>
        </CardBody>
      </Card>

      <Card className="bg-[var(--surface)] border border-[var(--border)]">
        <CardHeader className="flex gap-3 px-6 pt-6">
          <div className="p-2 rounded-lg bg-[var(--accent)]/10">
            <Palette className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <div>
            <p className="font-['Outfit'] font-semibold text-[var(--text)]">Appearance</p>
            <p className="text-sm text-[var(--muted)]">Customize the dashboard look</p>
          </div>
        </CardHeader>
        <CardBody className="px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text)]">Dark Mode</p>
              <p className="text-xs text-[var(--muted)]">
                Use dark theme for the dashboard
              </p>
            </div>
            <Switch
              isSelected={darkMode}
              onValueChange={setDarkMode}
            />
          </div>
        </CardBody>
      </Card>

      <Card className="bg-[var(--surface)] border border-[var(--border)]">
        <CardHeader className="flex gap-3 px-6 pt-6">
          <div className="p-2 rounded-lg bg-[var(--success)]/10">
            <Database className="w-5 h-5 text-[var(--success)]" />
          </div>
          <div>
            <p className="font-['Outfit'] font-semibold text-[var(--text)]">Data Management</p>
            <p className="text-sm text-[var(--muted)]">Export and manage your data</p>
          </div>
        </CardHeader>
        <CardBody className="px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text)]">Export Registrations</p>
              <p className="text-xs text-[var(--muted)]">
                Download all registrations as CSV
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-[var(--primary)]/10 text-[var(--primary)]"
            >
              Export
            </Button>
          </div>
          <Divider className="bg-[var(--border)]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text)]">Export Creator Applications</p>
              <p className="text-xs text-[var(--muted)]">
                Download all applications as CSV
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-[var(--primary)]/10 text-[var(--primary)]"
            >
              Export
            </Button>
          </div>
          <Divider className="bg-[var(--border)]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text)]">Export Analytics</p>
              <p className="text-xs text-[var(--muted)]">
                Download session data as CSV
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-[var(--primary)]/10 text-[var(--primary)]"
            >
              Export
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-[var(--surface)] border border-[var(--border)]">
        <CardHeader className="flex gap-3 px-6 pt-6">
          <div className="p-2 rounded-lg bg-red-500/10">
            <Shield className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="font-['Outfit'] font-semibold text-[var(--text)]">Security</p>
            <p className="text-sm text-[var(--muted)]">Manage account security</p>
          </div>
        </CardHeader>
        <CardBody className="px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text)]">Change Password</p>
              <p className="text-xs text-[var(--muted)]">
                Update your dashboard password
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-red-500/10 text-red-400"
            >
              Change
            </Button>
          </div>
          <Divider className="bg-[var(--border)]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--text)]">Session Management</p>
              <p className="text-xs text-[var(--muted)]">
                View and manage active sessions
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-red-500/10 text-red-400"
            >
              Manage
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
