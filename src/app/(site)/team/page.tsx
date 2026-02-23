import type { Metadata } from "next";
import Image from "next/image";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Button from "@/components/shared/Button";
import TeamCarousel from "@/components/team/TeamCarousel";
import VennDiagram from "@/components/team/VennDiagram";
import { sanityFetch } from "@/sanity/lib/live";
import { TEAM_MEMBERS_QUERY } from "@/sanity/lib/queries";
import type { TeamMember } from "@/types";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The future will be shaped by AI and us. Meet the Andus Labs team — 10 principals, 75+ specialists, 40+ working agents.",
};

// Fallback team data when Sanity is not configured
const fallbackTeam: TeamMember[] = [
  { _id: "1", name: "Chris Perry", roleTagline: "AI Advisor", title: "IPG, Weber Shandwick", headshot: "", sortOrder: 1 },
  { _id: "2", name: "Mike Tidmarsh", roleTagline: "AI Architect", title: "Ogilvy, Deloitte", headshot: "", sortOrder: 2 },
  { _id: "3", name: "Danielle Fuller", roleTagline: "Client Strategy", title: "Ogilvy, Victors & Spoils", headshot: "", sortOrder: 3 },
  { _id: "4", name: "Raphael Zaki", roleTagline: "Applied AI", title: "Fortune, Alpha Insights", headshot: "", sortOrder: 4 },
  { _id: "5", name: "Brian Kostka", roleTagline: "Finance", title: "UBS, BNY Mellon, AMG", headshot: "", sortOrder: 5 },
  { _id: "6", name: "Douglas Rushkoff", roleTagline: "Media Theorist", title: "CUNY, PBS Frontline", headshot: "", sortOrder: 6 },
  { _id: "7", name: "Amar C. Bakshi", roleTagline: "Cultural Strategy", title: "Shared Studios, U.S. State Department", headshot: "", sortOrder: 7 },
  { _id: "8", name: "Jennifer McTiernan", roleTagline: "Law & Ethics", title: "Block, Yale Law", headshot: "", sortOrder: 8 },
  { _id: "9", name: "Mark Burrell", roleTagline: "Community Platforms", title: "Tongal, Weldon", headshot: "", sortOrder: 9 },
  { _id: "10", name: "Cindy Sato", roleTagline: "Experience Design", title: "Nike, Weber Shandwick", headshot: "", sortOrder: 10 },
];

// Map names to local headshot files
const headshotMap: Record<string, string> = {
  "Chris Perry": "/images/team/headshots/headshot-chris.jpg",
  "Mike Tidmarsh": "/images/team/headshots/headshot-mike.jpg",
  "Danielle Fuller": "/images/team/headshots/headshot-danielle.jpg",
  "Raphael Zaki": "/images/team/headshots/headshot-raph.png",
  "Brian Kostka": "/images/team/headshots/headshot-brian.jpg",
  "Douglas Rushkoff": "/images/team/headshots/headshot-douglas.jpg",
  "Amar C. Bakshi": "/images/team/headshots/headshot-amar.jpg",
  "Jennifer McTiernan": "/images/team/headshots/headshot-jennifer.jpg",
  "Mark Burrell": "/images/team/headshots/headshot-mark.jpg",
  "Cindy Sato": "/images/team/headshots/headshot-cindy.jpg",
};

export default async function TeamPage() {
  let teamMembers: TeamMember[] = fallbackTeam;

  try {
    const { data } = await sanityFetch({ query: TEAM_MEMBERS_QUERY });
    if (data && data.length > 0) {
      teamMembers = data;
    }
  } catch {
    // Use fallback data if Sanity is not configured
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionWrapper>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.05] text-violet mb-6">
              The future will be shaped by AI and us
            </h1>
            <p className="font-heading text-xl text-zaffre/70 mb-4">
              People come first.
            </p>
            <p className="text-violet/80 leading-relaxed">
              Look closely at our name. Andus Labs. <strong>And us.</strong>{" "}
              That&apos;s not wordplay&mdash;it&apos;s the mission. We think the
              order matters. It determines who&apos;s ready. Who&apos;s not. Who
              gets left behind.
            </p>
            <p className="text-violet/80 leading-relaxed mt-4 font-bold">
              Not as an afterthought, but as the starting point.
            </p>
          </SectionWrapper>

          <SectionWrapper delay={0.2} direction="right">
            <Image
              src="/images/team/team-header.png"
              alt="Team collaboration"
              width={600}
              height={500}
              className="w-full h-auto"
            />
          </SectionWrapper>
        </div>
      </section>

      {/* Operating Model Section */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
              <h2 className="font-heading text-3xl md:text-4xl text-zaffre/70 leading-snug italic">
                Humans and machines. Working together in ways neither could alone.
              </h2>
              <p className="text-violet/80 leading-relaxed">
                <strong>This is how modern teams operate.</strong> Humans lead.
                Machines extend. Networks scale. Together, we field teams with
                extraordinary depth at a fraction of traditional cost. Teams that
                move fast because they&apos;re built for it. Expertise that
                couldn&apos;t exist inside a single shop.
              </p>
            </div>
          </SectionWrapper>

          {/* Venn diagram */}
          <SectionWrapper delay={0.2}>
            <VennDiagram />
          </SectionWrapper>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-violet mb-4">
              We build systems that make AI work
            </h2>
            <p className="text-violet/80 leading-relaxed mb-8 max-w-2xl">
              We are a core team that&apos;s lived it&mdash;on every side of the
              table. Diverse perspectives. Single system.
            </p>
          </SectionWrapper>

          {/* Team Carousel */}
          <TeamCarousel members={teamMembers} headshotMap={headshotMap} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 border-t border-periwinkle/30">
        <div className="mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-violet">
                Want to learn more?
              </h2>
              <div className="flex gap-4">
                <Button href="/field-notes">Field Notes &nbsp;&rsaquo;</Button>
                <Button href="/contact">Get in Touch &nbsp;&rsaquo;</Button>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </>
  );
}
