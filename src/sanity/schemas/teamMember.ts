import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "roleTagline",
      title: "Role Tagline",
      type: "string",
      description: 'e.g. "Lab Builder", "Human Advocate"',
    }),
    defineField({
      name: "title",
      title: "Title / Affiliations",
      type: "string",
      description: 'e.g. "IPG, Weber Shandwick"',
    }),
    defineField({
      name: "headshot",
      title: "Headshot",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
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
      title: "name",
      subtitle: "roleTagline",
      media: "headshot",
    },
  },
});
