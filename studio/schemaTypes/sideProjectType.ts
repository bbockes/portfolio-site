import { defineField, defineType } from 'sanity'
import { sideProjectContentBlocksField } from './contentBlocks'

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
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Homepage play card. Export at 1200×760 px (3:1.9 ratio).',
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      description: 'e.g. Personal Project, Experiment, Prototype',
    }),
    sideProjectContentBlocksField,
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
