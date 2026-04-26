import { defineType, defineField, defineArrayMember } from "sanity"

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "badgeText", title: "Badge Text", type: "string", description: 'e.g. "Limited time — 53% off today"' }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "headlineAccent", title: "Headline Accent (colored part)", type: "string" }),
        defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 3 }),
        defineField({ name: "ctaPrimaryText", title: "Primary Button Text", type: "string" }),
        defineField({ name: "ctaPrimaryUrl", title: "Primary Button URL", type: "string" }),
        defineField({ name: "ctaSecondaryText", title: "Secondary Button Text", type: "string" }),
        defineField({ name: "ratingText", title: "Rating Text", type: "string", description: 'e.g. "4.9/5"' }),
        defineField({ name: "reviewCount", title: "Review Count Text", type: "string", description: 'e.g. "2,300+"' }),
        defineField({
          name: "trustBullets",
          title: "Trust Bullets",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          description: "Short trust lines below the buttons",
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials Section",
      type: "object",
      fields: [
        defineField({ name: "tagText", title: "Tag Text", type: "string", description: 'e.g. "Real Results"' }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subheading", title: "Subheading", type: "string" }),
        defineField({
          name: "items",
          title: "Testimonials",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "role", title: "Role / Location", type: "string" }),
                defineField({ name: "text", title: "Review Text", type: "text", rows: 4 }),
                defineField({ name: "initials", title: "Initials", type: "string", description: "2 letters shown in avatar" }),
              ],
              preview: {
                select: { title: "name", subtitle: "role" },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
})
