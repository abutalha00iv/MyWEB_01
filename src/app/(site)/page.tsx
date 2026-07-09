import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhyUs } from "@/components/home/WhyUs";
import { Testimonial } from "@/components/home/Testimonial";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Premium Web Design & Software Studio",
  description:
    "Aureth Tyrian designs and builds beautiful, fast, and secure websites and software. View our work, explore services, or start a project.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <FeaturedWork />
      <WhyUs />
      <Testimonial />
      <CtaBand />
    </>
  );
}
