import { Link, useNavigate } from "react-router-dom";
import { Building2, LogOut } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageContainer } from "@/components/layout/PageContainer";

export function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate(ROUTES.HOME);
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <PageContainer className="flex h-16 items-center justify-between">
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Building2 className="h-5 w-5" />
          <span>Real Estate Listings</span>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <Badge variant={isAdmin ? "default" : "secondary"}>
                  {isAdmin ? "Admin" : "User"}
                </Badge>
              </div>

              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link to={ROUTES.LOGIN}>Login</Link>
            </Button>
          )}
        </div>
      </PageContainer>
    </header>
  );
}