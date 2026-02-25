import type { Metadata } from "next";
import Image from "next/image";
import SectionWrapper from "@/components/shared/SectionWrapper";
import MaturityModel from "@/components/approach/MaturityModel";
import OfferingsGrid from "@/components/approach/OfferingsGrid";
import PatternMatchTool from "@/components/approach/PatternMatch/PatternMatchTool";
import { sanityFetch } from "@/sanity/lib/live";
import { APPROACH_PAGE_QUERY } from "@/sanity/lib/queries";
import type { ApproachPage } from "@/types";

// ── Fallback ──

const fallback: ApproachPage = {
  heroHeadline: "Building is Human",
  heroSubheading: "We accelerate readiness.\nYou capture value.",
  heroBody:
    "We start with where you are, not where a roadmap assumes you should be.",
  maturityHeadline: "Andus Maturity Model",
  maturitySubtext: "The first framework for human + AI readiness.",
  maturityLevels: [
    { name: "Access", valueCaptured: "5\u201310%", valuePct: 7, annualImpact: "$50\u2013100K", state: "AI deployed. Committed users are the exception.", tell: '"Who\u2019s driving AI?" The room goes quiet.' },
    { name: "Heroes", valueCaptured: "15\u201325%", valuePct: 20, annualImpact: "$250\u2013500K", state: "AI working in isolated areas. Heroes, not systems.", tell: '"You should talk to Sarah. She\u2019s figured this out."' },
    { name: "Operational", valueCaptured: "30\u201350%", valuePct: 40, annualImpact: "$1\u20132M", state: "Human OS emerging. Systematic approach beginning.", tell: '"What\u2019s the business case library look like?" It exists.' },
    { name: "Integrated", valueCaptured: "60\u201380%", valuePct: 70, annualImpact: "$3\u20135M", state: "Human OS functioning. Work moves faster and gets better.", tell: "Same team, half the cycle time, better output." },
    { name: "Native", valueCaptured: "80\u2013100%", valuePct: 90, annualImpact: "$8\u201315M", state: "Human OS fully operational. The impossible becomes normal.", tell: '"You\u2019re the case study others benchmark against."' },
  ],
  taxHeadline: "Readiness Tax",
  taxSubtext: "Every quarter at Levels 1 and 2 costs you:",
  taxStats: [
    { value: "~20%", label: "productivity gap" },
    { value: "3x", label: "talent attrition" },
    { value: "50%+", label: "using shadow AI" },
  ],
  offeringsEyebrow: "How We Work",
  offeringsHeadline: "Four offerings. Each unlocks the next level.",
  offeringsSubtext: "We don\u2019t sell hours. We sell transitions.",
  offerings: [
    { levelRange: "Level 01 \u2192 Level 02", title: "Activation Sprint", description: "From scattered experiments to teams building together. You leave with pilots running, not plans pending.", duration: "4 weeks", idealFor: "Teams 25 - 100", delivers: "Team Readiness Playbook + 3 operational pilots", modules: ["Blocker Diagnosis", "Opportunity Mapping", "Day-One Builds", "Team Mindset"] },
    { levelRange: "Level 02 \u2192 Level 03", title: "Readiness Diagnostic", description: "Find exactly where you\u2019re stuck. Map the gaps between AI capability and organizational capacity. Surface what\u2019s blocking acceleration.", duration: "6 weeks", idealFor: "Orgs 500+", delivers: "Readiness Map + 90-day action plan + 2-3 working prototypes", modules: ["Cross-Functional Assessment", "AI Stack Evaluation", "Pattern Mapping", "Prototype Development"] },
    { levelRange: "Level 03 \u2192 Level 04", title: "Value Architecture", description: "From promising pilots to enterprise-wide proof. Numbers that get budget approved and leadership aligned.", duration: "8 weeks", idealFor: "Pilot to enterprise", delivers: "Value Model + Executive Business Case + Integration Playbook", modules: ["Value Modeling", "Business Case Development", "Executive Alignment", "Integration Planning"] },
    { levelRange: "Level 04 \u2192 Level 05", title: "Transformation Design", description: "From integrated AI to fully rebuilt operating model. You become the case study others benchmark against.", duration: "12 weeks", idealFor: "Board mandate", delivers: "Operating Model 2.0 + Role Architecture + Governance Framework", modules: ["Operating Model Design", "Role Architecture", "Governance Framework", "Change Infrastructure"] },
  ],
  metaTitle: "Approach",
  metaDescription:
    "Building is Human. We accelerate readiness. You capture value. The first framework for human + AI readiness.",
};

// ── Metadata ──

export async function generateMetadata(): Promise<Metadata> {
  let p: ApproachPage = fallback;
  try {
    const { data } = await sanityFetch({ query: APPROACH_PAGE_QUERY });
    if (data) p = data;
  } catch { /* fallback */ }
  return {
    title: p.metaTitle || fallback.metaTitle,
    description: p.metaDescription || fallback.metaDescription,
  };
}

// ── Page ──

export default async function ApproachPageRoute() {
  let p: ApproachPage = fallback;
  try {
    const { data } = await sanityFetch({ query: APPROACH_PAGE_QUERY });
    if (data) p = data;
  } catch { /* fallback */ }

  const levels = p.maturityLevels?.length ? p.maturityLevels : fallback.maturityLevels!;
  const taxStats = p.taxStats?.length ? p.taxStats : fallback.taxStats!;
  const offerings = p.offerings?.length ? p.offerings : fallback.offerings!;

  return (
    <>
      {/* Hero Section */}
      <section className="pt-6 md:pt-8 pb-0 guide-line-b guide-vline-center">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <SectionWrapper>
            <h1 className="font-heading text-6xl md:text-8xl font-bold leading-[1.0] text-violet mb-6">
              {p.heroHeadline}
            </h1>
            {p.heroSubheading && (
              <p className="font-heading text-2xl md:text-3xl text-zaffre/70 mb-6 leading-snug">
                {p.heroSubheading.split("\n").map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            )}
            {p.heroBody && (
              <p className="text-violet/80 leading-relaxed">{p.heroBody}</p>
            )}
          </SectionWrapper>

          <SectionWrapper delay={0.2} direction="right">
            <Image
              src="/images/approach/approach-humans-build.png"
              alt="Building is Human — collage illustration"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </SectionWrapper>
        </div>
      </section>

      {/* Maturity Model */}
      <MaturityModel
        headline={p.maturityHeadline}
        subtext={p.maturitySubtext}
        levels={levels}
      />

      {/* Readiness Tax Warning */}
      <section className="bg-violet text-cream py-14 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 14v12M14 20h12' stroke='%237884FF' stroke-width='1.5' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-16">
              {/* Left: icon + text */}
              <div className="flex items-center gap-5 flex-shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 border-2 border-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange text-xl md:text-2xl font-bold">!</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl">
                    {p.taxHeadline || fallback.taxHeadline}
                  </h3>
                  <p className="text-cream/90 text-sm mt-1">
                    {p.taxSubtext || fallback.taxSubtext}
                  </p>
                </div>
              </div>

              {/* Right: stat columns */}
              <div className="flex gap-10 md:gap-14 md:ml-auto">
                {taxStats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="font-bold text-orange text-3xl md:text-4xl leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-cream/85 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Offerings */}
      <OfferingsGrid
        eyebrow={p.offeringsEyebrow}
        headline={p.offeringsHeadline}
        subtext={p.offeringsSubtext}
        offerings={offerings}
      />

      {/* Pattern Match */}
      <PatternMatchTool />
    </>
  );
}
