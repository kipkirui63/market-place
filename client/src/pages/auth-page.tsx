import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Redirect } from "wouter";

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const { user, loginMutation, registerMutation, isLoading } = useAuth();

  // If the user is already logged in, redirect to home
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left column - Auth form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to AppMarket</h1>
            <p className="text-gray-600">
              {isLoginView
                ? "Sign in to your account to continue"
                : "Create a new account to get started"}
            </p>
          </div>

          {isLoginView ? (
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const username = form.username.value;
                    const password = form.password.value;
                    
                    console.log('Login form submission:', { username, password });
                    
                    // Validation
                    if (!username || username.length < 3) {
                      alert('Username must be at least 3 characters');
                      return;
                    }
                    
                    if (!password || password.length < 6) {
                      alert('Password must be at least 6 characters');
                      return;
                    }
                    
                    loginMutation.mutate({ username, password }, {
                      onSuccess: () => {
                        console.log('Successfully logged in, redirecting to homepage');
                        // The user will be automatically updated in the useAuth context
                        // Wait a moment for the user data to be updated before redirecting
                        setTimeout(() => {
                          window.location.href = '/';
                        }, 500);
                      }
                    });
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="login-username">Username</label>
                    <Input
                      id="login-username"
                      name="username"
                      placeholder="Enter your username"
                      onChange={(e) => {
                        console.log('Login username changed:', e.target.value);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="login-password">Password</label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      onChange={(e) => {
                        console.log('Login password changed:', e.target.value);
                      }}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0"
                      onClick={() => setIsLoginView(false)}
                    >
                      Register
                    </Button>
                  </span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const username = form.username.value;
                    const password = form.password.value;
                    const confirmPassword = form.confirmPassword.value;
                    
                    console.log('Manual form submission:', { username, password, confirmPassword });
                    
                    // Validation
                    if (!username || username.length < 3) {
                      alert('Username must be at least 3 characters');
                      return;
                    }
                    
                    if (!password || password.length < 6) {
                      alert('Password must be at least 6 characters');
                      return;
                    }
                    
                    if (password !== confirmPassword) {
                      alert('Passwords do not match');
                      return;
                    }
                    
                    registerMutation.mutate({ username, password }, {
                      onSuccess: () => {
                        console.log('Successfully registered, redirecting to homepage');
                        // The user will be automatically updated in the useAuth context
                        // Wait a moment for the user data to be updated before redirecting
                        setTimeout(() => {
                          window.location.href = '/';
                        }, 500);
                      }
                    });
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="username">Username</label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Choose a username"
                      onChange={(e) => {
                        console.log('Username changed:', e.target.value);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Password</label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      onChange={(e) => {
                        console.log('Password changed:', e.target.value);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="confirmPassword">Confirm Password</label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      onChange={(e) => {
                        console.log('Confirm password changed:', e.target.value);
                      }}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0"
                      onClick={() => setIsLoginView(true)}
                    >
                      Sign In
                    </Button>
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Right column - Hero section */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-r from-primary to-purple-700">
        <div className="h-full flex flex-col justify-center items-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">AppMarket</h2>
          <p className="text-xl mb-8 text-center">
            Discover and purchase the best applications built for your needs.
          </p>
          <div className="space-y-6 max-w-md">
            <div className="flex items-start">
              <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Premium Applications</h3>
                <p className="text-white text-opacity-80">
                  Access high-quality apps built by experienced developers.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure Transactions</h3>
                <p className="text-white text-opacity-80">
                  Your purchases are always protected with our secure payment system.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Instant Access</h3>
                <p className="text-white text-opacity-80">
                  Get immediate access to your purchases after checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
