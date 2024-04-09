import { ReactNode } from "react";

import Navbar from "@/components/navbars/navbar-regular";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
