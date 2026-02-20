/**
 * Seed script: populates Sanity with team members, field notes, and site settings.
 * Uploads images and PDFs as Sanity assets.
 *
 * Usage: node scripts/seed-sanity.mjs
 */

import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import path from "path";

const client = createClient({
  projectId: "8o5q0qvv",
  dataset: "production",
  apiVersion: "2026-02-17",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const PUBLIC = path.resolve("public");

// ── Helpers ──────────────────────────────────────────────────────────────────

async function uploadImage(relativePath, filename) {
  const filePath = path.join(PUBLIC, relativePath);
  console.log(`  Uploading image: ${relativePath}`);
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: filename || path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function uploadFile(relativePath, filename) {
  const filePath = path.join(PUBLIC, relativePath);
  console.log(`  Uploading file: ${relativePath}`);
  const asset = await client.assets.upload("file", createReadStream(filePath), {
    filename: filename || path.basename(filePath),
  });
  return { _type: "file", asset: { _type: "reference", _ref: asset._id } };
}

// ── Team Members ─────────────────────────────────────────────────────────────

const teamMembers = [
  { name: "Chris Perry", roleTagline: "Lab Builder", title: "IPG, Weber Shandwick", image: "/images/team/headshots/headshot-chris.jpg", sortOrder: 1 },
  { name: "Douglas Rushkoff", roleTagline: "Human Advocate", title: "CUNY, PBS Frontline", image: "/images/team/headshots/headshot-douglas.jpg", sortOrder: 2 },
  { name: "Mike Tidmarsh", roleTagline: "Change Architect", title: "Ogilvy, Deloitte", image: "/images/team/headshots/headshot-mike.jpg", sortOrder: 3 },
  { name: "Danielle Fuller", roleTagline: "Client Strategy", title: "Ogilvy, Victors & Spoils", image: "/images/team/headshots/headshot-danielle.jpg", sortOrder: 4 },
  { name: "Jennifer McTiernan", roleTagline: "Guardrail Builder", title: "Block, Yale Law", image: "/images/team/headshots/headshot-jennifer.jpg", sortOrder: 5 },
  { name: "Amar C. Bakshi", roleTagline: "Connection Artist", title: "Shared Studios, U.S. State Department", image: "/images/team/headshots/headshot-amar.jpg", sortOrder: 6 },
  { name: "Mark Burrell", roleTagline: "Community Platforms", title: "Tongal, Weldon", image: "/images/team/headshots/headshot-mark.jpg", sortOrder: 7 },
  { name: "Brian Kostka", roleTagline: "Finance", title: "UBS, BNY Mellon, AMG", image: "/images/team/headshots/headshot-brian.jpg", sortOrder: 8 },
  { name: "Cindy Sato", roleTagline: "Experience Design", title: "Nike, Weber Shandwick", image: "/images/team/headshots/headshot-cindy.jpg", sortOrder: 9 },
  { name: "Raphael Zaki", roleTagline: "Applied AI", title: "Fortune, Alpha Insights", image: "/images/team/headshots/headshot-raph.png", sortOrder: 10 },
];

// ── Field Notes ──────────────────────────────────────────────────────────────

const fieldNotes = [
  {
    type: "essay",
    seriesLabel: "Human Readiness Series",
    title: "Human OS for AI: The Missing Multiplier",
    description: "Corporate AI failures share the same root cause: investment in technical capability, not in the human capacity to use it. The formula is simple\u2014Value = AI Capability \u00d7 Human Readiness\u2014but the implications change everything.",
    coverImage: "/images/essay-human-os.png",
    externalUrl: "https://humanreadiness.org/manifesto/",
    featured: true,
    sortOrder: 1,
  },
  {
    type: "essay",
    seriesLabel: "Human Readiness Series",
    title: "The Human Element: What Machines Cannot Become",
    description: "The Human OS isn\u2019t just infrastructure for making AI work. It\u2019s the architecture that determines who your teams become.",
    coverImage: "/images/essay-human-element.png",
    externalUrl: "https://humanreadiness.org/human-element/",
    featured: true,
    sortOrder: 2,
  },
  {
    type: "joint-research",
    title: "Culture OS",
    description: "A cultural audit of what AI is doing to our attention, relationships, and sense of reality.",
    coverImage: "/images/field-notes/culture-os-cover.jpg",
    pdf: "/documents/culture-os.pdf",
    featured: false,
    sortOrder: 3,
  },
  {
    type: "industry-analysis",
    title: "The Machine Layer",
    description: "AI is rewriting the rules of public communication.",
    coverImage: "/images/field-notes/machine-layer-cover.jpg",
    pdf: "/documents/machine-layer.pdf",
    featured: false,
    sortOrder: 4,
  },
  {
    type: "essay",
    title: "Borrowed Time",
    description: "The window for building human readiness is shorter than you think.",
    coverImage: "/images/field-notes/borrowed-time-cover.jpg",
    pdf: "/documents/borrowed-time.pdf",
    featured: false,
    sortOrder: 5,
  },
];

// ── Site Settings ────────────────────────────────────────────────────────────

const siteSettings = {
  siteTitle: "Andus Labs",
  navLinks: [
    { _type: "object", _key: "nav1", label: "Human OS", href: "/human-os" },
    { _type: "object", _key: "nav2", label: "Approach", href: "/approach" },
    { _type: "object", _key: "nav3", label: "Team", href: "/team" },
    { _type: "object", _key: "nav4", label: "Field Notes", href: "/field-notes" },
    { _type: "object", _key: "nav5", label: "Contact", href: "/contact" },
  ],
  footerText: "Andus Labs is a human-readiness lab. We prepare organizations for an AI-native future — starting with their people.",
  socialLinks: [
    { _type: "object", _key: "social1", platform: "LinkedIn", url: "https://www.linkedin.com/company/andus-labs" },
  ],
  contactEmail: "hello@anduslabs.com",
};

// ── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding Sanity...\n");

  // --- Team Members ---
  console.log("👥 Creating team members...");
  for (const member of teamMembers) {
    const headshot = await uploadImage(member.image);
    const doc = {
      _type: "teamMember",
      name: member.name,
      roleTagline: member.roleTagline,
      title: member.title,
      headshot,
      sortOrder: member.sortOrder,
    };
    const result = await client.create(doc);
    console.log(`  ✓ ${member.name} (${result._id})`);
  }

  // --- Field Notes ---
  console.log("\n📝 Creating field notes...");
  for (const note of fieldNotes) {
    const coverImage = await uploadImage(note.coverImage);
    const doc = {
      _type: "fieldNoteItem",
      type: note.type,
      title: note.title,
      description: note.description,
      coverImage,
      featured: note.featured,
      sortOrder: note.sortOrder,
    };
    if (note.seriesLabel) doc.seriesLabel = note.seriesLabel;
    if (note.externalUrl) doc.externalUrl = note.externalUrl;
    if (note.pdf) {
      doc.assetPdf = await uploadFile(note.pdf);
    }
    const result = await client.create(doc);
    console.log(`  ✓ ${note.title} (${result._id})`);
  }

  // --- Site Settings ---
  console.log("\n⚙️  Creating site settings...");
  const settingsDoc = {
    _id: "siteSettings",
    _type: "siteSettings",
    ...siteSettings,
  };
  const result = await client.createOrReplace(settingsDoc);
  console.log(`  ✓ Site Settings (${result._id})`);

  console.log("\n✅ Done! Refresh your studio to see the data.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
