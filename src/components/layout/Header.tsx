"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { mainNav } from "@/lib/site";
import { MenuIcon, CloseIcon } from "@/components/icons";

export function Header({ announcement }: { announcement?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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

  return (
    <>
      {announcement && (
        <div className="bg-ink px-4 py-2 text-center text-xs tracking-wide text-ivory">
          {announcement}
        </div>
      )}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/80">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
          <Logo />

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-sm tracking-wide transition-colors duration-200 hover:text-plum ${
                    active ? "text-plum" : "text-ink"
                  }`}
                >
                  {item.label}
                  {active && <span className="absolute -bottom-1 left-0 h-px w-full bg-gold" />}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-sm border border-plum bg-plum px-5 py-2.5 text-sm font-medium tracking-wide text-ivory transition-colors duration-200 hover:bg-plum-dark"
            >
              Start a Project
            </Link>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-ink/10 bg-ivory px-6 py-6 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-sm px-2 py-3 text-base text-ink transition-colors duration-200 hover:text-plum"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-4 block rounded-sm border border-plum bg-plum px-5 py-3 text-center text-sm font-medium tracking-wide text-ivory"
            >
              Start a Project
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
