import { useAuth } from "@/contexts/AuthContext";

import type { AuthUser } from "@/types/auth";
import { Auth } from "./design/auth/Auth";

type AuthGuardsProps<T extends object = Record<string, never>> = {
  render: React.FC<{ user: AuthUser } & T>;
  props?: T;
};

export const AuthGuard = <T extends object>({
  render: InnerComponent,
  props,
}: Readonly<AuthGuardsProps<T>>) => {
  const { user } = useAuth();

  if (!user) {
    return <Auth />;
  }

  return <InnerComponent user={user} {...(props as T)} />;
};
