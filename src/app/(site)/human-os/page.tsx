import type { Metadata } from "next";
import Image from "next/image";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/shared/Button";
import AnimatedStatBox from "@/components/human-os/AnimatedStatBox";
import AnimatedLevers from "@/components/human-os/AnimatedLevers";
import { sanityFetch } from "@/sanity/lib/live";
import { HUMAN_OS_PAGE_QUERY } from "@/sanity/lib/queries";
import type { HumanOsPage } from "@/types";

// ── Fallback ──

const fallback: HumanOsPage = {
  heroHeadline: "The Math Doesn\u2019t Work",
  heroSubheading:
    "The gap isn\u2019t technology. It\u2019s people ready to deploy it.",
  heroBody:
    "Training alone isn\u2019t working. Pilots stall. Champions burn out. There\u2019s an operating system for your technology. There\u2019s never been one for your people. Until now. The Human OS for AI.",
  heroBoldPhrase: "The Human OS for AI.",
  heroCtaLabel: "Our Approach",
  heroCtaHref: "/approach",
  statHeadline: "$190B",
  statLabel: "Unrealized",
  statLeftValue: "$10B",
  statLeftLabel: "Value Realized to Date",
  statRightValue: "$200B",
  statRightLabel: "Enterprise AI Investment (2025)",
  statBarPercent: 5,
  statSource: "Sources: Goldman Sachs, Menlo Ventures, MIT",
  leversEyebrow: "Close the Gap",
  leversHeadline: "The Human OS for AI",
  leversSubtext:
    "Five levers. One system. Each one unlocks value. Together, they close the gap.",
  levers: [
    {
      title: "Talent & Development",
      description:
        'People ready to put AI to work. Not "AI curious" \u2014 AI capable.',
    },
    {
      title: "Expert Interfaces",
      description:
        "AI that fits the work. Not work that fits general purpose AIs.",
    },
    {
      title: "Clear Ownership",
      description:
        "Someone\u2019s name attached to the work. Real authority and accountability.",
    },
    {
      title: "Rituals & Cadence",
      description: "The operating rhythm that compounds progress.",
    },
    {
      title: "Incentives & Identity",
      description: "Growth, not threat. Elevation, not replacement.",
    },
  ],
  bottomHeadline:
    "The gap isn\u2019t technology. It\u2019s people ready to deploy it.",
  bottomBody: [
    {
      text: "When you invest in their readiness, they invest in yours.",
      bold: false,
    },
    {
      text: "Take care of your people. They\u2019ll take care of business.",
      bold: false,
    },
    { text: "This is the work that makes AI work.", bold: true },
  ],
  bottomCtaLabel: "Our Approach",
  bottomCtaHref: "/approach",
  bottomCallout: "See the Human OS applied.",
  bottomCalloutSub:
    "How we diagnose readiness gaps and engineer a path forward.",
  metaTitle: "The Human OS for AI",
  metaDescription:
    "The gap isn\u2019t technology. It\u2019s people ready to deploy it. Five levers, one system that closes the gap.",
};

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  let page: HumanOsPage = fallback;
  try {
    const { data } = await sanityFetch({ query: HUMAN_OS_PAGE_QUERY });
    if (data) page = data;
  } catch {
    // fallback
  }
  return {
    title: page.metaTitle || fallback.metaTitle,
    description: page.metaDescription || fallback.metaDescription,
  };
}

// ── Helper ──

function BodyWithBold({
  text,
  boldPhrase,
}: {
  text: string;
  boldPhrase?: string;
}) {
  if (!boldPhrase || !text.includes(boldPhrase)) return <>{text}</>;
  const parts = text.split(boldPhrase);
  return (
    <>
      {parts[0]}
      <strong>{boldPhrase}</strong>
      {parts[1]}
    </>
  );
}

// ── Page ──

export default async function HumanOSPage() {
  let p: HumanOsPage = fallback;

  try {
    const { data } = await sanityFetch({ query: HUMAN_OS_PAGE_QUERY });
    if (data) p = data;
  } catch {
    // fallback
  }

  const levers = p.levers?.length ? p.levers : fallback.levers!;
  const bottomBody = p.bottomBody?.length ? p.bottomBody : fallback.bottomBody!;

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <SectionWrapper>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.05] text-violet mb-6">
              {p.heroHeadline}
            </h1>
            {p.heroSubheading && (
              <p className="font-heading text-xl md:text-2xl text-zaffre/70 mb-6">
                {p.heroSubheading}
              </p>
            )}
            {p.heroBody && (
              <p className="text-violet/80 leading-relaxed mb-8">
                <BodyWithBold text={p.heroBody} boldPhrase={p.heroBoldPhrase} />
              </p>
            )}
            {p.heroCtaLabel && p.heroCtaHref && (
              <Button href={p.heroCtaHref}>
                {p.heroCtaLabel} &nbsp;&rsaquo;
              </Button>
            )}
          </SectionWrapper>

          {/* Statistics visualization — animated */}
          <AnimatedStatBox
            statHeadline={p.statHeadline}
            statLabel={p.statLabel}
            statLeftValue={p.statLeftValue}
            statLeftLabel={p.statLeftLabel}
            statRightValue={p.statRightValue}
            statRightLabel={p.statRightLabel}
            statBarPercent={p.statBarPercent}
            statSource={p.statSource}
          />
        </div>
      </section>

      {/* Five Levers + Bottom CTA — single violet block */}
      <section className="bg-violet text-cream py-12 md:py-20">
        {/* Levers header */}
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            {p.leversEyebrow && (
              <p className="text-orange text-xs tracking-wider uppercase mb-4 font-heading">
                {p.leversEyebrow}
              </p>
            )}
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              {p.leversHeadline}
            </h2>
            {p.leversSubtext && (
              <p className="text-cream/70 mb-10 max-w-2xl">{p.leversSubtext}</p>
            )}
          </SectionWrapper>

          {/* Animated levers */}
          <AnimatedLevers levers={levers} />
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 my-12 md:my-16">
          <div className="h-px bg-cream/10" />
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionWrapper>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-cream mb-4">
              {p.bottomHeadline}
            </h2>
            {p.bottomCtaLabel && p.bottomCtaHref && (
              <div className="mt-8">
                <Button href={p.bottomCtaHref} variant="outline-light">
                  {p.bottomCtaLabel} &nbsp;&rsaquo;
                </Button>
              </div>
            )}
          </SectionWrapper>

          <SectionWrapper delay={0.2} direction="right">
            <div className="space-y-1">
              {bottomBody.map((para, i) => (
                <p
                  key={i}
                  className={
                    para.bold
                      ? "font-bold text-cream"
                      : "text-periwinkle"
                  }
                >
                  {para.text}
                </p>
              ))}
              {(p.bottomCallout || p.bottomCalloutSub) && (
                <div className="pt-6">
                  {p.bottomCallout && (
                    <p className="font-heading font-bold text-cream">
                      {p.bottomCallout}
                    </p>
                  )}
                  {p.bottomCalloutSub && (
                    <p className="text-periwinkle/70 text-sm">
                      {p.bottomCalloutSub}
                    </p>
                  )}
                </div>
              )}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Bottom image section */}
      <section className="py-0">
        <div className="mx-auto max-w-5xl px-6">
          <Image
            src="/images/human-os/human-os.png"
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
