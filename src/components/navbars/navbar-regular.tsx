import { MouseEvent } from "react";
import Link from "next/link";

import { useAuth } from "@/lib/use-auth";

const Navbar = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    signOut();
  };

  return (
    <nav className="w-full bg-white p-5">
      <div className="container mx-auto flex items-center justify-between gap-5 text-xl">
        <Link href={user ? "/board" : "/"}>
          <button className="mr-10 text-2xl font-extrabold text-blue-900">
            Trello
          </button>
        </Link>
        {!user ? (
          <Link href="/login">
            <button className="btn navbar-link-btn">Log in</button>
          </Link>
        ) : (
          <button className="btn navbar-link-btn" onClick={handleSignOut}>
            Log out
            <i className="bi bi-box-arrow-right text-lg" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
