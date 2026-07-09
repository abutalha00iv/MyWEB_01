"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { MenuIcon, CloseIcon } from "@/components/icons";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Services", href: "/admin/services" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Pricing", href: "/admin/pricing" },
  { label: "Submissions", href: "/admin/submissions" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const sidebarContent = (
    <>
      <div className="flex h-20 items-center gap-2.5 border-b border-ink/10 px-6">
        <Image src="/assets/logo/monogram.svg" alt="" width={28} height={28} className="h-7 w-7" />
        <span className="font-display text-base text-ink">Admin</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="ml-auto flex h-9 w-9 items-center justify-center text-ink lg:hidden"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-6" aria-label="Admin">
        {navItems.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-sm px-3 py-2.5 text-sm transition-colors duration-200 ${
                active ? "bg-plum text-ivory" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ink/10 p-3">
        <Link
          href="/"
          className="block rounded-sm px-3 py-2.5 text-sm text-ink/60 transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
        >
          View Site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full rounded-sm px-3 py-2.5 text-left text-sm text-ink/60 transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
        >
          {loggingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-ivory">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-ink/10 bg-warmgray px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Image src="/assets/logo/monogram.svg" alt="" width={22} height={22} className="h-5.5 w-5.5" />
          <span className="font-display text-sm text-ink">Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center text-ink"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 -translate-x-full flex-col border-r border-ink/10 bg-warmgray transition-transform duration-200 lg:static lg:z-auto lg:w-60 lg:translate-x-0 ${
          open ? "translate-x-0" : ""
        }`}
      >
        {sidebarContent}
      </aside>

      <div className="flex-1 overflow-x-hidden pt-14 lg:pt-0">{children}</div>
    </div>
  );
}
