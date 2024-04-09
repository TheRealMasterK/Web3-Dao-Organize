import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@/lib/use-auth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // After mounting, we have access to the window
    setIsClient(true);
  }, []);

  if (!user && isClient) {
    router.push("/login");
    return null;
  } else return <>{children}</>;
};

export default ProtectedRoute;
