import type { Metadata } from "next";
import Image from "next/image";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/shared/Button";

export const metadata: Metadata = {
  title: "The Human OS for AI",
  description:
    "The gap isn't technology. It's people ready to deploy it. Five levers, one system that closes the gap.",
};

export default function HumanOSPage() {
  const levers = [
    {
      title: "Talent & Development",
      description:
        'People ready to put AI to work. Not "AI curious" — AI capable.',
    },
    {
      title: "Expert Interfaces",
      description:
        "AI that fits the work. Not work that fits general purpose AIs.",
    },
    {
      title: "Clear Ownership",
      description:
        "Someone's name attached to the work. Real authority and accountability.",
    },
    {
      title: "Rituals & Cadence",
      description: "The operating rhythm that compounds progress.",
    },
    {
      title: "Incentives & Identity",
      description: "Growth, not threat. Elevation, not replacement.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <SectionWrapper>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.05] text-violet mb-6">
              The Math Doesn&apos;t Work
            </h1>
            <p className="font-heading text-xl md:text-2xl text-zaffre/70 mb-6">
              The gap isn&apos;t technology. It&apos;s people ready to deploy it.
            </p>
            <p className="text-violet/80 leading-relaxed mb-8">
              Training alone isn&apos;t working. Pilots stall. Champions burn
              out. There&apos;s an operating system for your technology.
              There&apos;s never been one for your people. Until now.{" "}
              <strong>The Human OS for AI.</strong>
            </p>
            <Button href="/approach">Our Approach &nbsp;&rsaquo;</Button>
          </SectionWrapper>

          {/* Statistics visualization */}
          <SectionWrapper delay={0.2} direction="right">
            <div className="bg-cream border border-periwinkle p-8 md:p-12">
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-orange font-heading text-5xl md:text-6xl font-bold">
                    $190B
                  </p>
                  <p className="text-orange text-xs tracking-wider uppercase mt-2">
                    Unrealized
                  </p>
                </div>

                <div className="relative h-24 bg-violet rounded">
                  <div
                    className="absolute bottom-0 left-0 h-full bg-zaffre rounded"
                    style={{ width: "5%" }}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <p className="font-heading font-bold text-xl">$10B</p>
                    <p className="text-cinerous text-xs uppercase tracking-wider">
                      Value Realized to Date
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold text-xl">$200B</p>
                    <p className="text-cinerous text-xs uppercase tracking-wider">
                      Enterprise AI Investment (2025)
                    </p>
                  </div>
                </div>

                <p className="text-cinerous text-xs">
                  Sources: Goldman Sachs, Menlo Ventures, MIT
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Five Levers Section */}
      <section className="bg-violet text-cream py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <p className="text-orange text-xs tracking-wider uppercase mb-4 font-heading">
              Close the Gap
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              The Human OS for AI
            </h2>
            <p className="text-cream/70 mb-8 max-w-2xl">
              Five levers. One system. Each one unlocks value. Together, they
              close the gap.
            </p>
          </SectionWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {levers.map((lever, i) => (
              <SectionWrapper key={lever.title} delay={i * 0.1}>
                <div className="relative">
                  {/* Dot connector */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-orange" />
                    {i < levers.length - 1 && (
                      <div className="hidden lg:block flex-1 h-px bg-cream/20" />
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">
                    {lever.title}
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed">
                    {lever.description}
                  </p>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionWrapper>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-violet mb-4">
              The gap isn&apos;t technology. It&apos;s people ready to deploy it.
            </h2>
            <div className="mt-8">
              <Button href="/approach">Our Approach &nbsp;&rsaquo;</Button>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.2} direction="right">
            <div className="text-violet/80 space-y-4">
              <p>
                When you invest in their readiness, they invest in yours.
              </p>
              <p>
                Take care of your people. They&apos;ll take care of business.
              </p>
              <p className="font-bold">
                This is the work that makes AI work.
              </p>
              <div className="mt-6">
                <p className="font-heading font-bold text-violet">
                  See the Human OS applied.
                </p>
                <p className="text-cinerous text-sm">
                  How we diagnose readiness gaps and engineer a path forward.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Bottom image section */}
      <section className="py-0">
        <div className="mx-auto max-w-5xl px-6">
          <Image
            src="/images/human os.png"
            alt="Technology and architecture collage"
            width={1440}
            height={800}
            className="w-full h-auto"
          />
        </div>
      </section>
    </>
  );
}
