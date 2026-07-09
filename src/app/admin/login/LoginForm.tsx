"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "mt-1.5 w-full rounded-sm border border-ink/20 bg-ivory px-3.5 py-2.5 text-[15px] text-ink transition-colors duration-200 placeholder:text-ink/35 focus:border-plum focus-visible:outline-2 focus-visible:outline-plum";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const redirect = searchParams.get("redirect") || "/admin";
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex justify-center">
        <Image src="/assets/logo/monogram.svg" alt="" width={44} height={44} className="h-11 w-11" />
      </div>
      <h1 className="mt-6 text-center font-display text-2xl text-ink">Admin Login</h1>
      <p className="mt-2 text-center text-sm text-ink/55">Aureth Tyrian content management</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p role="alert" className="rounded-sm border border-plum/30 bg-plum/5 px-4 py-3 text-sm text-plum">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" disabled={submitting} className="w-full justify-center">
          {submitting ? "Signing in…" : "Sign In"}
        </Button>
      </form>
    </div>
  );
}

export default function LoginPageClient() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
