import { defineField, defineType } from 'sanity'
import { contentBlocksField } from './contentBlocks'

export const projectType = defineType({
  name: 'project',
  title: 'Work Project',
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
      name: 'screenshot',
      title: 'Card Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Homepage work card and More Projects row. Export at 1200×760 px (3:1.9 ratio).',
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color for card background (e.g. #B8DED4)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle shown below the title in the hero section',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Shown in full (no crop) at the top of the project page. Wide landscape works best; export at 2560×1440 px minimum (3840×2160 ideal).',
    }),
    defineField({
      name: 'logo',
      title: 'Project Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Displayed at 200×200 px. Export at 400×400 px (@2×). PNG or SVG recommended.',
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 3,
      description: 'The challenge or problem this project addressed',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 3,
      description: 'The solution or approach taken',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'text',
      rows: 3,
      description: 'The outcomes or results achieved',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      description: 'e.g. Personal Project, Client Work, Agency Project',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. UX/UI Designer, Lead Developer',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2023',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. SEO, CRO, UX/UI, Content Strategy',
    }),
    contentBlocksField,
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      tags: 'tags',
      media: 'heroImage',
    },
    prepare({ title, subtitle, tags, media }) {
      return {
        title: title || 'Untitled Project',
        subtitle: subtitle || (tags && tags.length > 0 ? tags.join(', ') : 'No tags'),
        media,
      }
    },
  },
})
