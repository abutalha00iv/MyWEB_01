"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

const words = ["Crafted", "like", "gold.", "Guarded", "like", "a", "secret."];

export function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-ivory">
      <AmbientGlow tone="ivory" />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:px-10">
        <p className="section-label motion-reduce:opacity-100" style={{ opacity: revealed ? 1 : 0, transition: "opacity 400ms ease" }}>
          Premium Web Design &amp; Software Studio
        </p>

        <h1 className="mt-6 max-w-4xl font-display text-[2.5rem] leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <span
                className="inline-block motion-reduce:translate-y-0 motion-reduce:opacity-100"
                style={{
                  transform: revealed ? "translateY(0%)" : "translateY(110%)",
                  opacity: revealed ? 1 : 0,
                  transition: `transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 55}ms, opacity 500ms ease ${i * 55}ms`,
                }}
              >
                {word}&nbsp;
              </span>
            </span>
          ))}
        </h1>

        <p
          className="measure mt-7 text-lg leading-relaxed text-ink/70 sm:text-xl"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 600ms ease 420ms, transform 600ms ease 420ms",
          }}
        >
          Aureth Tyrian designs and builds websites and software for brands
          that refuse to look ordinary — every project beautiful, fast, and
          secure by default.
        </p>

        <div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 600ms ease 520ms, transform 600ms ease 520ms",
          }}
        >
          <ButtonLink href="/work" variant="primary" showArrow className="group">
            View Work
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Start a Project
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
