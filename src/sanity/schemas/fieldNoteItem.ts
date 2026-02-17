import { defineType, defineField } from "sanity";

export default defineType({
  name: "fieldNoteItem",
  title: "Field Note",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Essay", value: "essay" },
          { title: "Joint Research", value: "joint-research" },
          { title: "Industry Analysis", value: "industry-analysis" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seriesLabel",
      title: "Series Label",
      type: "string",
      description: 'e.g. "Human Readiness Series"',
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description / Excerpt",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "For essays linking to external sites",
    }),
    defineField({
      name: "assetPdf",
      title: "PDF Asset",
      type: "file",
      options: { accept: ".pdf" },
      description: "For downloadable PDF resources",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Featured items appear as large cards",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "coverImage",
    },
  },
});
