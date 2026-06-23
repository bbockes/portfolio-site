import { defineField } from 'sanity'

const richTextField = defineField({
  name: 'text',
  title: 'Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
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
    },
  ],
})

const imageBlock = {
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Reference name for this image (not displayed on frontend)',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description:
        'Full-width case study image. Export at 2560 px wide; height is natural (no fixed ratio).',
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'name',
      caption: 'caption',
    },
    prepare({ title, media, caption }: { title?: string; media?: unknown; caption?: string }) {
      return {
        title: title || 'Image Block',
        subtitle: caption || 'Full width',
        media,
      }
    },
  },
}

const videoBlock = {
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Reference name for this video (not displayed on frontend)',
    }),
    defineField({
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          { title: 'Upload Video', value: 'upload' },
          { title: 'Embed URL', value: 'embed' },
        ],
        layout: 'radio',
      },
      initialValue: 'embed',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }: { parent?: { videoType?: string } }) => parent?.videoType !== 'upload',
    }),
    defineField({
      name: 'embedUrl',
      title: 'Embed URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other embed URL',
      hidden: ({ parent }: { parent?: { videoType?: string } }) => parent?.videoType !== 'embed',
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      videoType: 'videoType',
    },
    prepare({ name, videoType }: { name?: string; videoType?: string }) {
      return {
        title: name || (videoType === 'upload' ? 'Uploaded Video' : 'Embedded Video'),
      }
    },
  },
}

function createTextBlock(includeHeading: boolean) {
  return {
    name: 'textBlock',
    title: 'Text Block',
    type: 'object',
    fields: includeHeading
      ? [
          defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
          }),
          richTextField,
        ]
      : [richTextField],
    preview: includeHeading
      ? {
          select: {
            title: 'heading',
            subtitle: 'text',
          },
        }
      : {
          select: {
            subtitle: 'text',
          },
          prepare({ subtitle }: { subtitle?: unknown[] }) {
            return {
              title: 'Text Block',
              subtitle: subtitle?.length ? 'Rich text' : 'Empty text block',
            }
          },
        },
  }
}

const fileBlock = {
  name: 'fileBlock',
  title: 'File Block',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Reference name for this file (not displayed on frontend)',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      description: 'Upload a PDF or other file',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description: 'Text displayed as the download/view link on the frontend',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      linkText: 'linkText',
    },
    prepare({ name, linkText }: { name?: string; linkText?: string }) {
      return {
        title: name || linkText || 'File Block',
        subtitle: linkText || 'No link text set',
      }
    },
  },
}

const ctaBlock = {
  name: 'ctaBlock',
  title: 'CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Reference name for this URL or CTA (not displayed on frontend)',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'URL to open when the link is clicked',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description: 'Text displayed as the link on the frontend',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      linkText: 'linkText',
      link: 'link',
    },
    prepare({ name, linkText, link }: { name?: string; linkText?: string; link?: string }) {
      return {
        title: name || linkText || 'CTA Block',
        subtitle: linkText || link || 'No link set',
      }
    },
  },
}

function createContentBlocksField(includeHeading: boolean) {
  return defineField({
    name: 'contentBlocks',
    title: 'Content Blocks',
    type: 'array',
    of: [createTextBlock(includeHeading), imageBlock, videoBlock, fileBlock, ctaBlock],
  })
}

export const contentBlocksField = createContentBlocksField(true)

export const sideProjectContentBlocksField = createContentBlocksField(false)
