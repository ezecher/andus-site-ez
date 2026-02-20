import type { Metadata } from "next";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/shared/Button";
import FormulaSection from "@/components/shared/FormulaSection";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import type { HomePage } from "@/types";

// Fallback content when CMS is not configured
const fallback: HomePage = {
  heroHeadline: "We Solve the Human Side of AI.",
  heroSubheading: "People drive transformation, not technology.",
  heroBody:
    "We started where few others have. Thirty years of leading digital transformation. A decade of building and running AI labs. Here\u2019s what we\u2019ve learned: People drive transformation, not technology. Everyone overlooks this. We solve it.",
  heroBoldPhrase: "People drive transformation, not technology.",
  ctaButtons: [
    { label: "The Human OS for AI", href: "/human-os" },
    { label: "Our Approach", href: "/approach" },
  ],
  metaTitle: "We Solve the Human Side of AI | Andus Labs",
  metaDescription:
    "People drive transformation, not technology. We work with organizations to navigate AI transformation from strategy through implementation.",
};

export async function generateMetadata(): Promise<Metadata> {
  let page: HomePage = fallback;
  try {
    const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });
    if (data) page = data;
  } catch {
    // Use fallback
  }

  return {
    title: page.metaTitle || fallback.metaTitle,
    description: page.metaDescription || fallback.metaDescription,
  };
}

/**
 * Render body text with a bold phrase highlighted.
 */
function BodyWithBold({ text, boldPhrase }: { text: string; boldPhrase?: string }) {
  if (!boldPhrase || !text.includes(boldPhrase)) {
    return <>{text}</>;
  }
  const parts = text.split(boldPhrase);
  return (
    <>
      {parts[0]}
      <strong>{boldPhrase}</strong>
      {parts[1]}
    </>
  );
}

export default async function HomePageRoute() {
  let page: HomePage = fallback;

  try {
    const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });
    if (data) page = data;
  } catch {
    // Use fallback
  }

  const buttons = page.ctaButtons?.length ? page.ctaButtons : fallback.ctaButtons!;

  return (
    <>
      {/* Hero Section — centered, no image */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionWrapper>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.05] text-violet mb-6">
              {page.heroHeadline}
            </h1>
            {page.heroSubheading && (
              <p className="font-heading text-2xl md:text-3xl text-zaffre/70 mb-6">
                {page.heroSubheading}
              </p>
            )}
            {page.heroBody && (
              <p className="text-violet/80 text-base leading-relaxed max-w-2xl mx-auto">
                <BodyWithBold text={page.heroBody} boldPhrase={page.heroBoldPhrase} />
              </p>
            )}
          </SectionWrapper>
        </div>
      </section>

      <FormulaSection />

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {buttons.map((btn) => (
                <Button key={btn.href} href={btn.href}>
                  {btn.label} &nbsp;&rsaquo;
                </Button>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>
    </>
  );
}
