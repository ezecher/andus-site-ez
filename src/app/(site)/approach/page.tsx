import type { Metadata } from "next";
import Image from "next/image";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/shared/Button";
import MaturityModel from "@/components/approach/MaturityModel";
import OfferingsGrid from "@/components/approach/OfferingsGrid";
import PatternMatchTool from "@/components/approach/PatternMatch/PatternMatchTool";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Building is Human. We accelerate readiness. You capture value. The first framework for human + AI readiness.",
};

export default function ApproachPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-12 md:pt-20 pb-4 md:pb-6">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionWrapper>
            <h1 className="font-heading text-6xl md:text-8xl font-bold leading-[1.0] text-violet mb-6">
              Building is Human
            </h1>
            <p className="font-heading text-2xl md:text-3xl text-zaffre/70 mb-6 leading-snug">
              We accelerate readiness.<br />
              You capture value.
            </p>
            <p className="text-violet/80 leading-relaxed">
              We start with where you are, not where a roadmap assumes you
              should be.
            </p>
          </SectionWrapper>

          <SectionWrapper delay={0.2} direction="right">
            <Image
              src="/images/approach.png"
              alt="Approach visual"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </SectionWrapper>
        </div>
      </section>

      {/* Maturity Model */}
      <MaturityModel />

      {/* Readiness Tax Warning */}
      <section className="bg-violet text-cream py-10">
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 border-2 border-orange rounded-full flex items-center justify-center">
                  <span className="text-orange text-2xl">!</span>
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg mb-2">
                  Readiness Tax
                </h3>
                <p className="text-cream/70 text-sm">
                  Every quarter at Levels 1 and 2 costs you:
                </p>
              </div>
              <div className="flex flex-wrap gap-8 ml-auto">
                <div>
                  <p className="font-heading font-bold text-orange text-lg">
                    ~20%
                  </p>
                  <p className="text-cream/60 text-xs">productivity gap</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-orange text-lg">
                    3x
                  </p>
                  <p className="text-cream/60 text-xs">talent attrition</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-orange text-lg">
                    50%+
                  </p>
                  <p className="text-cream/60 text-xs">using shadow AI</p>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Offerings */}
      <OfferingsGrid />

      {/* Pattern Match */}
      <PatternMatchTool />
    </>
  );
}
