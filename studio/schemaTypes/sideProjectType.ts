import { defineField, defineType } from 'sanity'

const richTextBlock = {
  type: 'block' as const,
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'URL',
        fields: [
          {
            title: 'URL',
            name: 'href',
            type: 'url',
          },
        ],
      },
    ],
  },
}

export const sideProjectType = defineType({
  name: 'sideProject',
  title: 'Side Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Homepage play card. Export at 1200×760 px (3:1.9 ratio).',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Full-viewport hero. Export at 2560×1440 px minimum.',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [richTextBlock],
      description: 'Rich text with links for the project page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'cardImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Untitled Side Project',
        media,
      }
    },
  },
})
