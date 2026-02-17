import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { resolve } from "path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-17",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const teamMembers = [
  { name: "Chris Perry", roleTagline: "Lab Builder", title: "IPG, Weber Shandwick", headshot: "headshot-chris.jpg", sortOrder: 1 },
  { name: "Douglas Rushkoff", roleTagline: "Human Advocate", title: "CUNY, PBS Frontline", headshot: "headshot-douglas.jpg", sortOrder: 2 },
  { name: "Mike Tidmarsh", roleTagline: "Change Architect", title: "Ogilvy, Deloitte", headshot: "headshot-mike.jpg", sortOrder: 3 },
  { name: "Danielle Fuller", roleTagline: "Client Strategy", title: "Ogilvy, Victors & Spoils", headshot: "headshot-danielle.jpg", sortOrder: 4 },
  { name: "Jennifer McTiernan", roleTagline: "Guardrail Builder", title: "Block, Yale Law", headshot: "headshot-jennifer.jpg", sortOrder: 5 },
  { name: "Amar C. Bakshi", roleTagline: "Connection Artist", title: "Shared Studios, U.S. State Department", headshot: "headshot-amar.jpg", sortOrder: 6 },
  { name: "Mark Burrell", roleTagline: "Community Platforms", title: "Tongal, Weldon", headshot: "headshot-mark.jpg", sortOrder: 7 },
  { name: "Brian Kostka", roleTagline: "Finance", title: "UBS, BNY Mellon, AMG", headshot: "headshot-brian.png", sortOrder: 8 },
  { name: "Cindy Sato", roleTagline: "Experience Design", title: "Nike, Weber Shandwick", headshot: "headshot-cindy.png", sortOrder: 9 },
  { name: "Raphael Zaki", roleTagline: "Applied AI", title: "Fortune, Alpha Insights", headshot: "headshot-raph.png", sortOrder: 10 },
];

const fieldNotes = [
  {
    type: "essay",
    seriesLabel: "Human Readiness Series",
    title: "Human OS for AI: The Missing Multiplier",
    description: "Corporate AI failures share the same root cause: investment in technical capability, not in the human capacity to use it.",
    coverImage: "essay-human-os.png",
    externalUrl: "https://humanreadiness.org/manifesto/",
    featured: true,
    sortOrder: 1,
  },
  {
    type: "essay",
    seriesLabel: "Human Readiness Series",
    title: "The Human Element: What Machines Cannot Become",
    description: "The Human OS isn\u2019t just infrastructure for making AI work. It\u2019s the architecture that determines who your teams become.",
    coverImage: "essay-human-element.png",
    externalUrl: "https://humanreadiness.org/human-element/",
    featured: true,
    sortOrder: 2,
  },
  {
    type: "joint-research",
    title: "Culture OS",
    description: "A cultural audit of what AI is doing to our attention, relationships, and sense of reality.",
    coverImage: "culture-os-cover.png",
    featured: false,
    sortOrder: 3,
  },
  {
    type: "industry-analysis",
    title: "The Machine Layer",
    description: "AI is rewriting the rules of public communication.",
    coverImage: "machine-layer-cover.png",
    featured: false,
    sortOrder: 4,
  },
  {
    type: "essay",
    title: "Borrowed Time",
    description: "The window for building human readiness is shorter than you think.",
    coverImage: "borrowed-time-cover.png",
    featured: false,
    sortOrder: 5,
  },
];

async function uploadImage(filename: string) {
  const filePath = resolve(process.cwd(), "public/images", filename);
  const stream = createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, { filename });
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

async function seed() {
  console.log("Starting seed...");

  // Create site settings
  console.log("Creating site settings...");
  await client.createOrReplace({
    _type: "siteSettings",
    _id: "siteSettings",
    siteTitle: "Andus Labs",
    navLinks: [
      { _key: "nav1", label: "Human OS", href: "/human-os" },
      { _key: "nav2", label: "Approach", href: "/approach" },
      { _key: "nav3", label: "Team", href: "/team" },
      { _key: "nav4", label: "Field Notes", href: "/field-notes" },
      { _key: "nav5", label: "Contact", href: "/contact" },
    ],
    footerText:
      "We work with commercial, NGO, and public sector organizations to navigate AI transformation from strategy through implementation.",
    socialLinks: [
      {
        _key: "social1",
        platform: "LinkedIn",
        url: "https://linkedin.com/company/anduslabs",
      },
    ],
    contactEmail: "hello@anduslabs.com",
  });

  // Create team members
  console.log("Creating team members...");
  for (const member of teamMembers) {
    console.log(`  Uploading headshot for ${member.name}...`);
    const headshot = await uploadImage(member.headshot);
    await client.createOrReplace({
      _type: "teamMember",
      _id: `team-${member.sortOrder}`,
      name: member.name,
      roleTagline: member.roleTagline,
      title: member.title,
      headshot,
      sortOrder: member.sortOrder,
    });
    console.log(`  Created: ${member.name}`);
  }

  // Create field notes
  console.log("Creating field notes...");
  for (const note of fieldNotes) {
    console.log(`  Uploading cover for ${note.title}...`);
    const coverImage = await uploadImage(note.coverImage);
    await client.createOrReplace({
      _type: "fieldNoteItem",
      _id: `note-${note.sortOrder}`,
      type: note.type,
      ...(note.seriesLabel && { seriesLabel: note.seriesLabel }),
      title: note.title,
      description: note.description,
      coverImage,
      ...(note.externalUrl && { externalUrl: note.externalUrl }),
      featured: note.featured,
      sortOrder: note.sortOrder,
    });
    console.log(`  Created: ${note.title}`);
  }

  console.log("\nSeed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
