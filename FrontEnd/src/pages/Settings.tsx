
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, 
  User, 
  Building, 
  Bell, 
  ShieldCheck, 
  Database,
  Save,
  Trash2,
  CreditCard
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Admin",
    avatar: ""
  });
  
  // Mock company data
  const [companyData, setCompanyData] = useState({
    name: "ABC Retail Store",
    address: "123 Business Ave, Suite 101, New York, NY 10001",
    phone: "555-123-4567",
    website: "www.abcretail.com",
    taxId: "12-3456789"
  });
  
  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderAlerts: true,
    inventoryAlerts: true,
    marketingEmails: false
  });
  
  // Handle form submissions
  const handleProfileSave = () => {
    toast.success("Profile settings saved successfully");
  };
  
  const handleCompanySave = () => {
    toast.success("Company settings saved successfully");
  };
  
  const handleNotificationSave = () => {
    toast.success("Notification preferences updated");
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <SettingsIcon className="mr-2 h-8 w-8" />
            Settings
          </h1>
        </div>
        
        <Tabs defaultValue="profile" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid max-w-3xl grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={userData.name} 
                    onChange={(e) => setUserData({...userData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={userData.email} 
                    onChange={(e) => setUserData({...userData, email: e.target.value})} 
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role" 
                    value={userData.role} 
                    disabled 
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Contact your administrator to change role permissions
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleProfileSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Change Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Company Tab */}
          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Update your business details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name" 
                    value={companyData.name} 
                    onChange={(e) => setCompanyData({...companyData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea 
                    id="address" 
                    value={companyData.address} 
                    onChange={(e) => setCompanyData({...companyData, address: e.target.value})} 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={companyData.phone} 
                      onChange={(e) => setCompanyData({...companyData, phone: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      value={companyData.website} 
                      onChange={(e) => setCompanyData({...companyData, website: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="tax-id">Tax ID / EIN</Label>
                  <Input 
                    id="tax-id" 
                    value={companyData.taxId} 
                    onChange={(e) => setCompanyData({...companyData, taxId: e.target.value})} 
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCompanySave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Company Info
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>
                  Set your store's operating hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="monday" className="min-w-24">Monday</Label>
                      <Input id="monday-open" placeholder="9:00 AM" className="w-24" />
                      <span>to</span>
                      <Input id="monday-close" placeholder="5:00 PM" className="w-24" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="monday-closed" className="mr-2">Closed</Label>
                      <Switch id="monday-closed" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Additional days would follow the same pattern */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="tuesday" className="min-w-24">Tuesday</Label>
                      <Input id="tuesday-open" placeholder="9:00 AM" className="w-24" />
                      <span>to</span>
                      <Input id="tuesday-close" placeholder="5:00 PM" className="w-24" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="tuesday-closed" className="mr-2">Closed</Label>
                      <Switch id="tuesday-closed" />
                    </div>
                  </div>
                  
                  {/* More days would be added here */}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Hours</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important events
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailNotifications: checked})
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-alerts">Order Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new orders are placed
                    </p>
                  </div>
                  <Switch 
                    id="order-alerts" 
                    checked={notificationSettings.orderAlerts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, orderAlerts: checked})
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when inventory levels are low
                    </p>
                  </div>
                  <Switch 
                    id="inventory-alerts" 
                    checked={notificationSettings.inventoryAlerts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, inventoryAlerts: checked})
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional content and updates
                    </p>
                  </div>
                  <Switch 
                    id="marketing-emails" 
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, marketingEmails: checked})
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNotificationSave}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Device Management</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage devices that are currently logged in to your account
                  </p>
                  <Button variant="outline" className="mt-2">Manage Devices</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>API Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage API keys and permissions
                  </p>
                  <Button variant="outline" className="mt-2">Manage API Keys</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data and Privacy</CardTitle>
                <CardDescription>
                  Manage your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Export Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Download a copy of your data
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline" className="flex items-center">
                      <Database className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label className="text-red-500">Danger Zone</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="destructive" className="mt-2">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
