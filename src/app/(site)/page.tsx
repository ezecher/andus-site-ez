import type { Metadata } from "next";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/shared/Button";
import FormulaSection from "@/components/shared/FormulaSection";

export const metadata: Metadata = {
  title: "We Solve the Human Side of AI | Andus Labs",
  description:
    "People drive transformation, not technology. We work with organizations to navigate AI transformation from strategy through implementation.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section — centered, no image */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionWrapper>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.05] text-violet mb-6">
              We Solve the Human Side of AI.
            </h1>
            <p className="font-heading text-2xl md:text-3xl text-zaffre/70 mb-6">
              People drive transformation, not technology.
            </p>
            <p className="text-violet/80 text-base leading-relaxed max-w-2xl mx-auto">
              We started where few others have. Thirty years of leading digital
              transformation. A decade of building and running AI labs.
              Here&apos;s what we&apos;ve learned:{" "}
              <strong>People drive transformation, not technology.</strong>{" "}
              Everyone overlooks this. We solve it.
            </p>
          </SectionWrapper>
        </div>
      </section>

      <FormulaSection />

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/human-os">The Human OS for AI &nbsp;&rsaquo;</Button>
              <Button href="/approach">Our Approach &nbsp;&rsaquo;</Button>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </>
  );
}
