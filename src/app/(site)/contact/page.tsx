import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import HubSpotForm from "@/components/shared/HubSpotForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's talk. If what we're building aligns with where you're headed\u2014or where you're stuck\u2014reach out.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero + Form Section */}
      <section className="pt-12 md:pt-20 pb-8 md:pb-12 guide-line-b guide-vline-center">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-12 md:gap-16 items-start">
          <SectionWrapper>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.05] text-violet mb-8">
              Let&apos;s talk.
            </h1>
            <p className="text-violet/80 leading-relaxed mb-4">
              If what we&apos;re building aligns with where you&apos;re
              headed&mdash;or where you&apos;re stuck&mdash;reach out.
            </p>
            <p className="text-violet/80 leading-relaxed">
              <strong>
                We work with leaders who recognize AI isn&apos;t just a
                technology problem. It&apos;s a people problem.
              </strong>{" "}
              And it requires a different kind of partner.
            </p>
          </SectionWrapper>

          <SectionWrapper delay={0.2} direction="right">
            <HubSpotForm formId="cd5b9b1c-fd93-4a76-a9a7-f09a433f2f6c" />
          </SectionWrapper>
        </div>
      </section>

      {/* Double-line connector — vertical line bridges the gap */}
      <div className="h-6 guide-vline-center" />

      {/* Hiring Section */}
      <section className="pt-10 pb-12 md:pb-16 guide-line-t guide-vline-center">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <SectionWrapper>
              <div className="relative w-full aspect-[5/6] md:-mt-16 overflow-hidden">
                <Image
                  src="/images/contact/contact-hiring.png"
                  alt="Andus Labs workspace"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </SectionWrapper>

            <SectionWrapper delay={0.2} direction="right">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-zaffre/70 mb-6">
                We&apos;re hiring at the speed of AI.
              </h2>
              <p className="text-violet/80 leading-relaxed mb-4">
                Machine interpreters. Agent builders. Program developers.
                Facilitators. Researchers. Designers. Writers. Producers.
              </p>
              <p className="text-violet/80 leading-relaxed mb-4">
                People who work fast, think together, and move with intention.
                Beyond roles, we&apos;re looking for progressive minds exploring
                AI&apos;s impact on cognition, work, media, culture, and society.
              </p>
              <p className="text-violet font-bold mb-8">
                If that&apos;s you, say hello.
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-cinerous text-xs uppercase tracking-wider">
                    Email
                  </p>
                  <Link
                    href="mailto:hello@anduslabs.com"
                    className="text-zaffre font-heading hover:underline"
                  >
                    hello@anduslabs.com
                  </Link>
                </div>
                <div>
                  <p className="text-cinerous text-xs uppercase tracking-wider">
                    LinkedIn
                  </p>
                  <Link
                    href="https://linkedin.com/company/anduslabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zaffre font-heading hover:underline"
                  >
                    Andus Labs
                  </Link>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>
    </>
  );
}
