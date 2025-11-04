import { SignUp } from '@clerk/clerk-react';
import logo from '@/assets/logo.png';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center rounded-2xl bg-primary/10 p-4 mb-4">
            <img src={logo} alt="VibeCoding Logo" className="h-16 w-16 object-contain" />
          </div>
          <h1 className="text-3xl font-bold">VibeCoding</h1>
          <p className="text-muted-foreground">Create an account to start learning</p>
        </div>

        <div className="flex justify-center">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-card border border-border shadow-lg"
              }
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}
