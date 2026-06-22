import { defineField } from 'sanity'

export const contentBlocksField = defineField({
  name: 'contentBlocks',
  title: 'Content Blocks',
  type: 'array',
  of: [
    {
      name: 'textBlock',
      title: 'Text Block',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
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
        }),
      ],
      preview: {
        select: {
          title: 'heading',
          subtitle: 'text',
        },
      },
    },
    {
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
        prepare({ title, media, caption }) {
          return {
            title: title || 'Image Block',
            subtitle: caption || 'Full width',
            media,
          }
        },
      },
    },
    {
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
          hidden: ({ parent }) => parent?.videoType !== 'upload',
        }),
        defineField({
          name: 'embedUrl',
          title: 'Embed URL',
          type: 'url',
          description: 'YouTube, Vimeo, or other embed URL',
          hidden: ({ parent }) => parent?.videoType !== 'embed',
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
        prepare({ name, videoType }) {
          return {
            title: name || (videoType === 'upload' ? 'Uploaded Video' : 'Embedded Video'),
          }
        },
      },
    },
  ],
})
