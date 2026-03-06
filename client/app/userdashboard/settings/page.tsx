"use client"

import { useState } from "react"
import {
  User,
  Bell,
  Shield,
  Palette,
  Key,
  Globe,
  Save,
  Moon,
  Sun,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@devinsight.ai",
    company: "DevInsight Labs",
    role: "Senior Developer",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    reportComplete: true,
    weeklyDigest: false,
    securityAlerts: true,
  })
  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    defaultTopic: "Performance Optimization",
    autoAnalyze: false,
  })

  const handleSave = () => {
    toast.success("Settings saved successfully")
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and configuration
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-secondary w-full grid grid-cols-4">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <User className="size-3.5 mr-1.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <Bell className="size-3.5 mr-1.5" />
            Alerts
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <Palette className="size-3.5 mr-1.5" />
            Preferences
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <Shield className="size-3.5 mr-1.5" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Profile Information</CardTitle>
              <CardDescription className="text-muted-foreground">
                Update your personal details and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">JD</span>
                </div>
                <div>
                  <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG or SVG. Max 2MB.</p>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-sm text-foreground">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-secondary border-border text-foreground focus-visible:ring-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="bg-secondary border-border text-foreground focus-visible:ring-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company" className="text-sm text-foreground">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="bg-secondary border-border text-foreground focus-visible:ring-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="role" className="text-sm text-foreground">Role</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="bg-secondary border-border text-foreground focus-visible:ring-primary/50"
                  />
                </div>
              </div>

              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
                onClick={handleSave}
              >
                <Save className="size-3.5 mr-1.5" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Notification Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Report Completed</p>
                  <p className="text-xs text-muted-foreground">Notify when a report finishes generating</p>
                </div>
                <Switch
                  checked={notifications.reportComplete}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, reportComplete: checked })
                  }
                />
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Weekly Digest</p>
                  <p className="text-xs text-muted-foreground">Get a weekly summary of your code health</p>
                </div>
                <Switch
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, weeklyDigest: checked })
                  }
                />
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Security Alerts</p>
                  <p className="text-xs text-muted-foreground">Critical security vulnerability notifications</p>
                </div>
                <Switch
                  checked={notifications.securityAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, securityAlerts: checked })
                  }
                />
              </div>

              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
                onClick={handleSave}
              >
                <Save className="size-3.5 mr-1.5" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Application Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">
                Customize your DevInsight experience
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Theme</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark modes</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={preferences.theme === "dark" ? "default" : "outline"}
                    size="sm"
                    className={
                      preferences.theme === "dark"
                        ? "bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:bg-secondary"
                    }
                    onClick={() => setPreferences({ ...preferences, theme: "dark" })}
                  >
                    <Moon className="size-3.5 mr-1.5" />
                    Dark
                  </Button>
                  <Button
                    variant={preferences.theme === "light" ? "default" : "outline"}
                    size="sm"
                    className={
                      preferences.theme === "light"
                        ? "bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:bg-secondary"
                    }
                    onClick={() => setPreferences({ ...preferences, theme: "light" })}
                  >
                    <Sun className="size-3.5 mr-1.5" />
                    Light
                  </Button>
                </div>
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Language</p>
                  <p className="text-xs text-muted-foreground">Choose your preferred language</p>
                </div>
                <Select
                  value={preferences.language}
                  onValueChange={(v) => setPreferences({ ...preferences, language: v })}
                >
                  <SelectTrigger className="w-40 bg-secondary border-border text-foreground">
                    <Globe className="size-3.5 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="en" className="text-foreground focus:bg-primary/10 focus:text-primary">English</SelectItem>
                    <SelectItem value="es" className="text-foreground focus:bg-primary/10 focus:text-primary">Spanish</SelectItem>
                    <SelectItem value="fr" className="text-foreground focus:bg-primary/10 focus:text-primary">French</SelectItem>
                    <SelectItem value="de" className="text-foreground focus:bg-primary/10 focus:text-primary">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Default Analysis Topic</p>
                  <p className="text-xs text-muted-foreground">Pre-selected topic for new reports</p>
                </div>
                <Select
                  value={preferences.defaultTopic}
                  onValueChange={(v) => setPreferences({ ...preferences, defaultTopic: v })}
                >
                  <SelectTrigger className="w-52 bg-secondary border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="Performance Optimization" className="text-foreground focus:bg-primary/10 focus:text-primary">Performance</SelectItem>
                    <SelectItem value="Security Analysis" className="text-foreground focus:bg-primary/10 focus:text-primary">Security</SelectItem>
                    <SelectItem value="Code Quality" className="text-foreground focus:bg-primary/10 focus:text-primary">Code Quality</SelectItem>
                    <SelectItem value="Architecture Review" className="text-foreground focus:bg-primary/10 focus:text-primary">Architecture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Auto-Analyze on Push</p>
                  <p className="text-xs text-muted-foreground">Automatically run analysis on new commits</p>
                </div>
                <Switch
                  checked={preferences.autoAnalyze}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, autoAnalyze: checked })
                  }
                />
              </div>

              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
                onClick={handleSave}
              >
                <Save className="size-3.5 mr-1.5" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6">
          <div className="flex flex-col gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Change Password</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="current-pass" className="text-sm text-foreground">Current Password</Label>
                  <Input
                    id="current-pass"
                    type="password"
                    placeholder="Enter current password"
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="new-pass" className="text-sm text-foreground">New Password</Label>
                  <Input
                    id="new-pass"
                    type="password"
                    placeholder="Enter new password"
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirm-pass" className="text-sm text-foreground">Confirm New Password</Label>
                  <Input
                    id="confirm-pass"
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                  />
                </div>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
                  onClick={handleSave}
                >
                  <Key className="size-3.5 mr-1.5" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base text-foreground">API Access</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your API keys for programmatic access
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                  <Key className="size-4 text-muted-foreground shrink-0" />
                  <code className="text-sm font-mono text-foreground flex-1 truncate">
                    {"di_sk_••••••••••••••••••••••••3f8a"}
                  </code>
                  <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary shrink-0">
                    Regenerate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your API key provides full access to the DevInsight API. Keep it secure and never share it publicly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-destructive/30">
              <CardHeader>
                <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
