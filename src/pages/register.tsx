import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "@/components/layouts/layout-screen";

import { useAuth } from "@/lib/use-auth";

const Register = () => {
  const router = useRouter();

  const { user, signUp, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      router.push("/board");
    }
  }, [user, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signUp(name, email, password);
  };

  return (
    <Layout>
      <main className="auth-page">
        <form onSubmit={handleSubmit} className="auth-form">
          <header className="auth-form-header">Sign up for your account</header>
          <input
            type="text"
            className="auth-form-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter name"
            maxLength={15}
            required
          />
          <input
            type="email"
            className="auth-form-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            className="auth-form-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
          />
          <button
            type="submit"
            className="auth-form-btn"
            disabled={
              loading || !name.length || !email.length || !password.length
            }
          >
            {!loading ? "Submit" : <p className="bi bi-arrow-clockwise"></p>}
          </button>

          <Link href={"/login"}>
            <a className="auth-form-link">Already have an account? Log In</a>
          </Link>
        </form>
      </main>
    </Layout>
  );
};

export default Register;
