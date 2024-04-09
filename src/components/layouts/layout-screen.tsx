import { ReactNode } from "react";

import Navbar from "@/components/navbars/navbar-regular";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
