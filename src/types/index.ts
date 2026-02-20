export interface TeamMember {
  _id: string;
  name: string;
  roleTagline: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headshot: any;
  shortBio?: string;
  linkedinUrl?: string;
  sortOrder: number;
}

export interface FieldNoteItem {
  _id: string;
  type: "essay" | "joint-research" | "industry-analysis";
  seriesLabel?: string;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any;
  coverImageUrl?: string;
  externalUrl?: string;
  pdfUrl?: string;
  assetPdf?: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  featured: boolean;
  sortOrder: number;
}

export interface SiteSettings {
  siteTitle: string;
  navLinks: { label: string; href: string }[];
  footerText: string;
  socialLinks: { platform: string; url: string }[];
  contactEmail: string;
}

export interface HomePage {
  heroHeadline: string;
  heroSubheading?: string;
  heroBody?: string;
  heroBoldPhrase?: string;
  ctaButtons?: { label: string; href: string }[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface HumanOsPage {
  heroHeadline: string;
  heroSubheading?: string;
  heroBody?: string;
  heroBoldPhrase?: string;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  statHeadline?: string;
  statLabel?: string;
  statLeftValue?: string;
  statLeftLabel?: string;
  statRightValue?: string;
  statRightLabel?: string;
  statBarPercent?: number;
  statSource?: string;
  leversEyebrow?: string;
  leversHeadline?: string;
  leversSubtext?: string;
  levers?: { title: string; description: string }[];
  bottomHeadline?: string;
  bottomBody?: { text: string; bold?: boolean }[];
  bottomCtaLabel?: string;
  bottomCtaHref?: string;
  bottomCallout?: string;
  bottomCalloutSub?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ApproachPage {
  heroHeadline: string;
  heroSubheading?: string;
  heroBody?: string;
  maturityHeadline?: string;
  maturitySubtext?: string;
  maturityLevels?: {
    name: string;
    valueCaptured: string;
    valuePct: number;
    annualImpact: string;
    state: string;
    tell: string;
  }[];
  taxHeadline?: string;
  taxSubtext?: string;
  taxStats?: { value: string; label: string }[];
  offeringsEyebrow?: string;
  offeringsHeadline?: string;
  offeringsSubtext?: string;
  offerings?: {
    levelRange: string;
    title: string;
    description: string;
    duration: string;
    idealFor: string;
    delivers: string;
    modules: string[];
  }[];
  metaTitle?: string;
  metaDescription?: string;
}
