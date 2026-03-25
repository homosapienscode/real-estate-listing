import { useState } from "react";
import { Navigate } from "react-router-dom";
import { LockKeyhole, UserCircle2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useLogin } from "@/hooks/useLogin";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isLoading && isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    loginMutation.mutate({
      email: email.trim(),
      password,
    });
  }

  const errorMessage =
    loginMutation.error instanceof Error
      ? loginMutation.error.message
      : "Login failed. Please check your credentials and try again.";

  return (
    <AppLayout>
      <PageContainer className="max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="order-2 lg:order-1">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Sign in to test role-based behavior using the seeded demo accounts.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="johndoe@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loginMutation.isPending}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loginMutation.isPending}
                    required
                  />
                </div>

                {loginMutation.isError ? (
                  <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {errorMessage}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="order-1 lg:order-2">
            <CardHeader>
              <CardTitle className="text-2xl">Test accounts</CardTitle>
              <CardDescription>
                Use these seeded accounts to verify public vs admin behavior.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2">
                  <LockKeyhole className="h-4 w-4" />
                  <span className="font-medium">Admin account</span>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Email: admin@techkraft.com</p>
                  <p>Password: Password123!</p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2">
                  <UserCircle2 className="h-4 w-4" />
                  <span className="font-medium">User account</span>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Email: user@techkraft.com</p>
                  <p>Password: Password123!</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Admin:</span>{" "}
                  can view internal status notes and access non-active listings by direct URL.
                </p>
                <p>
                  <span className="font-medium text-foreground">User/Guest:</span>{" "}
                  can browse public active listings only, and internal notes remain hidden.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </AppLayout>
  );
}