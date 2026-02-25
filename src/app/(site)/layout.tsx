import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { SanityLive } from "@/sanity/lib/live";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/shared/DisableDraftMode";
import { draftMode } from "next/headers";
import type { SiteSettings } from "@/types";

// Fallback nav links when CMS is not configured
const fallbackNavLinks = [
  { label: "Human OS", href: "/human-os" },
  { label: "Approach", href: "/approach" },
  { label: "Team", href: "/team" },
  { label: "Field Notes", href: "/field-notes" },
  { label: "Contact", href: "/contact" },
];

const fallbackFooterText =
  "We work with commercial, NGO, and public sector organizations to navigate AI transformation from strategy through implementation.";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  let settings: SiteSettings | null = null;
  try {
    const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
    if (data) settings = data;
  } catch {
    // Use fallbacks
  }

  const navLinks = settings?.navLinks?.length
    ? settings.navLinks
    : fallbackNavLinks;

  const footerText = settings?.footerText || fallbackFooterText;
  const socialLinks = settings?.socialLinks || [];
  const contactEmail = settings?.contactEmail || "";

  return (
    <>
      <div className="grid-bg">
        <Header navLinks={navLinks} />
        <main className="min-h-screen">{children}</main>
      </div>
      <Footer
        navLinks={navLinks}
        footerText={footerText}
        socialLinks={socialLinks}
        contactEmail={contactEmail}
      />
      <SanityLive />
      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </>
  );
}
