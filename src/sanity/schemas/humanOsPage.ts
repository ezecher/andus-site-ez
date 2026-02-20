import { defineType, defineField, type Rule } from "sanity";

export default defineType({
  name: "humanOsPage",
  title: "Human OS Page",
  type: "document",
  fields: [
    // ── Hero Section ──
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "string",
    }),
    defineField({
      name: "heroBody",
      title: "Hero Body Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroBoldPhrase",
      title: "Hero Bold Phrase",
      type: "string",
      description: "A phrase within the body to render bold.",
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero CTA Button Label",
      type: "string",
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero CTA Button Link",
      type: "string",
    }),

    // ── Stats Box ──
    defineField({
      name: "statHeadline",
      title: "Stat Headline (large number)",
      type: "string",
      description: 'e.g. "$190B"',
    }),
    defineField({
      name: "statLabel",
      title: "Stat Label",
      type: "string",
      description: 'e.g. "Unrealized"',
    }),
    defineField({
      name: "statLeftValue",
      title: "Stat Left Value",
      type: "string",
      description: 'e.g. "$10B"',
    }),
    defineField({
      name: "statLeftLabel",
      title: "Stat Left Label",
      type: "string",
      description: 'e.g. "Value Realized to Date"',
    }),
    defineField({
      name: "statRightValue",
      title: "Stat Right Value",
      type: "string",
      description: 'e.g. "$200B"',
    }),
    defineField({
      name: "statRightLabel",
      title: "Stat Right Label",
      type: "string",
      description: 'e.g. "Enterprise AI Investment (2025)"',
    }),
    defineField({
      name: "statBarPercent",
      title: "Stat Bar Fill Percentage",
      type: "number",
      description: "How full the bar is, 0-100 (e.g. 5 for 5%)",
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "statSource",
      title: "Stat Source Attribution",
      type: "string",
      description: 'e.g. "Sources: Goldman Sachs, Menlo Ventures, MIT"',
    }),

    // ── Five Levers Section ──
    defineField({
      name: "leversEyebrow",
      title: "Levers Eyebrow Text",
      type: "string",
      description: 'Small orange label, e.g. "Close the Gap"',
    }),
    defineField({
      name: "leversHeadline",
      title: "Levers Headline",
      type: "string",
    }),
    defineField({
      name: "leversSubtext",
      title: "Levers Subtext",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "levers",
      title: "Levers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",

              rows: 2,
            },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),

    // ── Bottom CTA Section ──
    defineField({
      name: "bottomHeadline",
      title: "Bottom CTA Headline",
      type: "string",
    }),
    defineField({
      name: "bottomBody",
      title: "Bottom CTA Body Paragraphs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              title: "Text",
              type: "text",

              rows: 2,
            },
            {
              name: "bold",
              title: "Bold?",
              type: "boolean",

              initialValue: false,
            },
          ],
          preview: {
            select: { title: "text" },
          },
        },
      ],
    }),
    defineField({
      name: "bottomCtaLabel",
      title: "Bottom CTA Button Label",
      type: "string",
    }),
    defineField({
      name: "bottomCtaHref",
      title: "Bottom CTA Button Link",
      type: "string",
    }),
    defineField({
      name: "bottomCallout",
      title: "Bottom Callout Title",
      type: "string",
      description: 'e.g. "See the Human OS applied."',
    }),
    defineField({
      name: "bottomCalloutSub",
      title: "Bottom Callout Subtitle",
      type: "string",
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
      return { title: "Human OS Page" };
    },
  },
});
