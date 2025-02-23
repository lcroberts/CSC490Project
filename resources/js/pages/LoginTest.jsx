import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { generateEncryptionKey } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';

export default function LoginTest({ status, canResetPassword }) {
  const { data: loginData, setData: setLoginData, post: loginPost, processing: loginProcessing, errors: loginErrors, reset: loginReset } = useForm({
    email: '',
    password: '',
  });

  const { data: registerData, setData: setRegisterData, post: registerPost, processing: registerProcessing, errors: registerErrors, reset: registerReset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submitLogin = (e) => {
    e.preventDefault();
    generateEncryptionKey(loginData.password);

    loginPost(route('login'), {
      onFinish: () => loginReset('password'),
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    generateEncryptionKey(registerData.password);

    registerPost(route('register'), {
      onFinish: () => registerReset('password', 'password_confirmation'),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Register</TabsTrigger>
          <TabsTrigger value="password">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Register your username and password here. After saving, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={submitRegister}>
                <div className="space-y-1">
                  <Label htmlFor="name">Username</Label>
                  <Input
                    id="name"
                    name="name"
                    value={registerData.name}
                    className="input-glow"
                    onChange={(e) => setRegisterData('name', e.target.value)}
                  />
                  {registerErrors.name && <p className="text-red-600">{registerErrors.name}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={registerData.email}
                    className="input-glow"
                    onChange={(e) => setRegisterData('email', e.target.value)}
                  />
                  {registerErrors.email && <p className="text-red-600">{registerErrors.email}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={registerData.password}
                    className="input-glow"
                    onChange={(e) => setRegisterData('password', e.target.value)}
                  />
                  {registerErrors.password && <p className="text-red-600">{registerErrors.password}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password_confirmation">Confirm Password</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={registerData.password_confirmation}
                    className="input-glow"
                    onChange={(e) => setRegisterData('password_confirmation', e.target.value)}
                  />
                  {registerErrors.password_confirmation && <p className="text-red-600">{registerErrors.password_confirmation}</p>}
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <Button type="submit" className="ms-4" disabled={registerProcessing}>
                    Register
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Welcome back, please login with your username and password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={submitLogin}>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={loginData.email}
                    className="input-glow"
                    autoComplete="username"
                    onChange={(e) => setLoginData('email', e.target.value)}
                  />
                  {loginErrors.email && <p className="text-red-600">{loginErrors.email}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    className="input-glow"
                    autoComplete="current-password"
                    onChange={(e) => setLoginData('password', e.target.value)}
                  />
                  {loginErrors.password && <p className="text-red-600">{loginErrors.password}</p>}
                </div>
                <div className="mt-4 flex items-center justify-end">
                  {canResetPassword && (
                    <Link
                      href={route('password.request')}
                      className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Forgot your password?
                    </Link>
                  )}
                  <Button type="submit" className="ms-4" disabled={loginProcessing}>
                    Log in
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}