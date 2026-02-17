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
  externalUrl?: string;
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
