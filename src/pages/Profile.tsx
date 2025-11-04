import { useUser, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, HelpCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <img src={logo} alt="VibeCoding" className="h-8 w-8 object-contain" />
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <Separator />

          {/* Profile Settings Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Update your personal information and preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-lg font-medium mt-1">
                    {user?.fullName || user?.firstName || 'Not set'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg font-medium mt-1">
                    {user?.primaryEmailAddress?.emailAddress || 'Not set'}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Account Management</p>
                  <p className="text-sm text-muted-foreground">
                    Update your account details, password, and security settings
                  </p>
                </div>
                <UserButton 
                  appearance={{
                    elements: {
                      rootBox: "scale-150 ml-4"
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <HelpCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <CardTitle>Support</CardTitle>
                  <CardDescription>
                    Get help and find answers to common questions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="text-left">
                    <p className="font-medium">Help Center</p>
                    <p className="text-sm text-muted-foreground">
                      Browse our comprehensive documentation and guides
                    </p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="text-left">
                    <p className="font-medium">Contact Support</p>
                    <p className="text-sm text-muted-foreground">
                      Get in touch with our support team for assistance
                    </p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="text-left">
                    <p className="font-medium">Report an Issue</p>
                    <p className="text-sm text-muted-foreground">
                      Let us know about any bugs or problems you've encountered
                    </p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
