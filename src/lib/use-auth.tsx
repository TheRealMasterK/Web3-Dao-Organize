import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface Context {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<Context | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    console.log("Signing in...");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in successfully");
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    console.log("Signing up...");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, { displayName: name });
        console.log("Signed up and updated profile successfully");
      }
      setLoading(false);
    } catch (error) {
      console.error("Sign-up error:", error);
      setLoading(false);
    }
  };

  const signOut = () => {
    console.log("Signing out...");
    auth.signOut();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Setting up auth state listener");
      const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
        console.log("Auth state changed:", user);
        setUser(user);
        setLoading(false);
      });
      return () => {
        console.log("Unsubscribing from auth state listener");
        unsubscribe();
      };
    }
    return () => {};
  }, []);

  const contextValues = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("useAuth must be used within an AuthProvider!");
  return context;
};
