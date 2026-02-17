import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's talk. If what we're building aligns with where you're headed\u2014or where you're stuck\u2014reach out.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero + Form Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
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
            <ContactForm />
          </SectionWrapper>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="border-t border-periwinkle/30" />
      </div>

      {/* Hiring Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <SectionWrapper>
            <Image
              src="/images/lets talk.png"
              alt="Andus Labs workspace"
              width={500}
              height={600}
              className="w-full h-auto max-h-[400px] object-contain"
            />
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
      </section>
    </>
  );
}
