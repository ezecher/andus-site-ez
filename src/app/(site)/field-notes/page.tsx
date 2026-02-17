import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/shared/Button";
import { client } from "@/sanity/lib/client";
import { FIELD_NOTES_QUERY } from "@/sanity/lib/queries";
import type { FieldNoteItem } from "@/types";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Proprietary intelligence from hundreds of engagements. Essays, research, and analysis on AI transformation.",
};

// Fallback data when Sanity is not configured
const fallbackNotes: FieldNoteItem[] = [
  {
    _id: "1",
    type: "essay",
    seriesLabel: "Human Readiness Series",
    title: "Human OS for AI: The Missing Multiplier",
    description:
      "Corporate AI failures share the same root cause: investment in technical capability, not in the human capacity to use it. The formula is simple\u2014Value = AI Capability \u00d7 Human Readiness\u2014but the implications change everything.",
    coverImage: "",
    externalUrl: "https://humanreadiness.org/manifesto/",
    featured: true,
    sortOrder: 1,
  },
  {
    _id: "2",
    type: "essay",
    seriesLabel: "Human Readiness Series",
    title: "The Human Element: What Machines Cannot Become",
    description:
      "The Human OS isn\u2019t just infrastructure for making AI work. It\u2019s the architecture that determines who your teams become.",
    coverImage: "",
    externalUrl: "https://humanreadiness.org/human-element/",
    featured: true,
    sortOrder: 2,
  },
  {
    _id: "3",
    type: "joint-research",
    title: "Culture OS",
    description:
      "A cultural audit of what AI is doing to our attention, relationships, and sense of reality.",
    coverImage: "",
    featured: false,
    sortOrder: 3,
  },
  {
    _id: "4",
    type: "industry-analysis",
    title: "The Machine Layer",
    description: "AI is rewriting the rules of public communication.",
    coverImage: "",
    featured: false,
    sortOrder: 4,
  },
  {
    _id: "5",
    type: "essay",
    title: "Borrowed Time",
    description:
      "The window for building human readiness is shorter than you think.",
    coverImage: "",
    featured: false,
    sortOrder: 5,
  },
];

// Map titles to local cover images
const coverMap: Record<string, string> = {
  "Human OS for AI: The Missing Multiplier": "/images/essay-human-os.png",
  "The Human Element: What Machines Cannot Become":
    "/images/essay-human-element.png",
  "Culture OS": "/images/culture-os-cover.png",
  "The Machine Layer": "/images/machine-layer-cover.png",
  "Borrowed Time": "/images/borrowed-time-cover.png",
};

// Map titles to local PDF files
const pdfMap: Record<string, string> = {
  "Culture OS": "/documents/culture-os.pdf",
  "The Machine Layer": "/documents/machine-layer.pdf",
  "Borrowed Time": "/documents/borrowed-time.pdf",
};

const typeLabels: Record<string, string> = {
  essay: "Essay",
  "joint-research": "Joint Research",
  "industry-analysis": "Industry Analysis",
};

export default async function FieldNotesPage() {
  let notes: FieldNoteItem[] = fallbackNotes;

  try {
    const sanityData = await client.fetch(FIELD_NOTES_QUERY);
    if (sanityData && sanityData.length > 0) {
      notes = sanityData;
    }
  } catch {
    // Use fallback data
  }

  const featured = notes.filter((n) => n.featured);
  const secondary = notes.filter((n) => !n.featured);

  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-violet text-center mb-6">
              The changes we face are vast.
            </h1>
          </SectionWrapper>
          <SectionWrapper delay={0.2}>
            <Image
              src="/images/perspectives-feature.png"
              alt="Andus Labs Guild"
              width={1200}
              height={400}
              className="w-full h-auto"
            />
          </SectionWrapper>
        </div>
      </section>

      {/* Guild Section */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <h2 className="font-heading text-3xl md:text-4xl text-violet">
                Andus Labs Guild
              </h2>
              <div className="text-violet/80 leading-relaxed space-y-4">
                <p>
                  <strong>
                    Finding coherence requires a village. We regularly convene
                    one.
                  </strong>{" "}
                  It&apos;s the Andus Labs Guild. Curated by Douglas Rushkoff.
                  Thinkers and builders on AI&apos;s edge. Yes, those deep in
                  the tech. But also those examining AI&apos;s impact on civics,
                  arts, media, and work.
                </p>
                <p>
                  Collectives like this shape a human-centered agenda vital to
                  the AI conversation.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Blue Band */}
      <section className="bg-violet text-cream py-10">
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <h2 className="font-heading text-3xl md:text-4xl text-center italic">
              From these conversations, a perspective emerges.
            </h2>
          </SectionWrapper>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          {featured.map((note, i) => (
            <SectionWrapper key={note._id} delay={i * 0.1}>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-periwinkle/30 pb-12 ${
                  i % 2 === 1 ? "md:direction-rtl" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <Image
                    src={coverMap[note.title] || "/images/andus-cube.png"}
                    alt={note.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <p className="text-orange text-xs tracking-[0.15em] uppercase font-heading font-bold mb-4">
                    {typeLabels[note.type]} {note.sortOrder ? `0${note.sortOrder}` : ""}{" "}
                    {note.seriesLabel ? `\u00b7 ${note.seriesLabel}` : ""}
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-violet mb-4">
                    {note.title}
                  </h3>
                  <p className="text-violet/80 leading-relaxed mb-6">
                    {note.description}
                  </p>
                  {note.externalUrl && (
                    <Link
                      href={note.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-bold text-violet text-sm hover:text-zaffre transition-colors"
                    >
                      {note.type === "essay"
                        ? "Read essay \u2192"
                        : "Download the white paper \u2192"}
                    </Link>
                  )}
                </div>
              </div>
            </SectionWrapper>
          ))}
        </div>
      </section>

      {/* Secondary Cards */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {secondary.map((note, i) => (
              <SectionWrapper key={note._id} delay={i * 0.1}>
                <div className="group">
                  <div className="aspect-[4/5] relative overflow-hidden mb-4 bg-periwinkle/20">
                    <Image
                      src={coverMap[note.title] || "/images/andus-cube.png"}
                      alt={note.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <p className="text-orange text-xs tracking-[0.15em] uppercase font-heading font-bold mb-2">
                    {typeLabels[note.type]}
                  </p>
                  <h3 className="font-heading font-bold text-violet text-lg mb-2">
                    {note.title}
                  </h3>
                  <p className="text-violet/70 text-sm leading-relaxed mb-4">
                    {note.description}
                  </p>
                  <Link
                    href={
                      note.externalUrl ||
                      pdfMap[note.title] ||
                      "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading font-bold text-violet text-sm hover:text-zaffre transition-colors"
                  >
                    Download PDF &nbsp;&rarr;
                  </Link>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Subscribe */}
      <section className="bg-periwinkle/30 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <SectionWrapper>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-violet mb-4">
                Field notes aren&apos;t for filing. They&apos;re for acting on.
              </h2>
              <p className="text-violet/80 leading-relaxed mb-6">
                Proprietary intelligence from hundreds of engagements. Patterns
                and signals that tell you where to move next.{" "}
                <strong>
                  If what you&apos;re reading here resonates, let&apos;s talk
                  about what it means for your organization.
                </strong>
              </p>
              <Button href="/contact">Get in Touch &nbsp;&rsaquo;</Button>
            </SectionWrapper>

            <SectionWrapper delay={0.2}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-violet mb-4">
                Stay current.
              </h2>
              <p className="text-violet/80 mb-6">
                New essays, events, and insights delivered to your inbox.
              </p>
              <form className="flex gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 border-2 border-periwinkle bg-transparent text-violet placeholder:text-cinerous font-heading text-sm focus:outline-none focus:border-violet transition-colors"
                />
                <Button type="submit" variant="outline">
                  Subscribe &nbsp;&rsaquo;
                </Button>
              </form>
            </SectionWrapper>
          </div>
        </div>
      </section>
    </>
  );
}
