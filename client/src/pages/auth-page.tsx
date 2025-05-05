import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { insertUserSchema } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { Redirect } from "wouter";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").nonempty("Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

const registerSchema = insertUserSchema
  .extend({
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const { user, loginMutation, registerMutation, isLoading } = useAuth();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...rest } = data;
    registerMutation.mutate(rest);
  };

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
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                </Form>

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
                <Form {...registerForm}>
                  <form
                    onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Choose a username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Create a password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                </Form>

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
