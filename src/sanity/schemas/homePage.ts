import { defineType, defineField, type Rule } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      description: "The main headline (e.g. \"We Solve the Human Side of AI.\")",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "string",
      description: "Subheading below the headline (e.g. \"People drive transformation, not technology.\")",
    }),
    defineField({
      name: "heroBody",
      title: "Hero Body Text",
      type: "text",
      rows: 4,
      description: "Supporting paragraph below the subheading.",
    }),
    defineField({
      name: "heroBoldPhrase",
      title: "Hero Bold Phrase",
      type: "string",
      description: "A phrase within the body text to make bold (e.g. \"People drive transformation, not technology.\")",
    }),
    defineField({
      name: "ctaButtons",
      title: "CTA Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Button Label",
              type: "string",
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: "href",
              title: "Button Link",
              type: "string",
              validation: (rule: Rule) => rule.required(),
            },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "string",
      description: "Title shown in browser tab and search results.",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Description shown in search results.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
