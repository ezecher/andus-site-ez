import { defineType, defineField } from "sanity";

export default defineType({
  name: "approachPage",
  title: "Approach Page",
  type: "document",
  fields: [
    // ── Hero ──
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      rows: 2,
      description: "Supports line breaks — each line becomes a new line on the page.",
    }),
    defineField({
      name: "heroBody",
      title: "Hero Body",
      type: "string",
    }),

    // ── Maturity Model ──
    defineField({
      name: "maturityHeadline",
      title: "Maturity Model Headline",
      type: "string",
    }),
    defineField({
      name: "maturitySubtext",
      title: "Maturity Model Subtext",
      type: "string",
    }),
    defineField({
      name: "maturityLevels",
      title: "Maturity Levels",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Level Name", type: "string" },
            { name: "valueCaptured", title: "Value Captured (e.g. \"5–10%\")", type: "string" },
            { name: "valuePct", title: "Value Bar % (0-100)", type: "number" },
            { name: "annualImpact", title: "Annual Impact (e.g. \"$50–100K\")", type: "string" },
            { name: "state", title: "State Description", type: "text", rows: 2 },
            { name: "tell", title: "Tell (italic quote)", type: "string" },
          ],
          preview: {
            select: { title: "name", subtitle: "state" },
          },
        },
      ],
    }),

    // ── Readiness Tax ──
    defineField({
      name: "taxHeadline",
      title: "Readiness Tax Headline",
      type: "string",
    }),
    defineField({
      name: "taxSubtext",
      title: "Readiness Tax Subtext",
      type: "string",
    }),
    defineField({
      name: "taxStats",
      title: "Readiness Tax Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value (e.g. \"~20%\")", type: "string" },
            { name: "label", title: "Label (e.g. \"productivity gap\")", type: "string" },
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),

    // ── Offerings ──
    defineField({
      name: "offeringsEyebrow",
      title: "Offerings Eyebrow",
      type: "string",
    }),
    defineField({
      name: "offeringsHeadline",
      title: "Offerings Headline",
      type: "string",
    }),
    defineField({
      name: "offeringsSubtext",
      title: "Offerings Subtext",
      type: "string",
    }),
    defineField({
      name: "offerings",
      title: "Offerings",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "levelRange", title: "Level Range (e.g. \"Level 01 → Level 02\")", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
            { name: "duration", title: "Duration", type: "string" },
            { name: "idealFor", title: "Ideal For", type: "string" },
            { name: "delivers", title: "Delivers", type: "text", rows: 2 },
            {
              name: "modules",
              title: "Modules",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: { title: "title", subtitle: "levelRange" },
          },
        },
      ],
    }),

    // ── SEO ──
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Approach Page" };
    },
  },
});
