import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
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
      description: 'Image displayed on the homepage work card',
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
      description: 'Main hero image displayed at the top of the case study page',
    }),
    defineField({
      name: 'logo',
      title: 'Project Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional project logo displayed alongside challenge/solution/results',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. SEO, CRO, UX/UI, Content Strategy',
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
      name: 'description',
      title: 'Short Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
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
      description: 'Brief description shown at the top of the case study',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Info',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
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
      description: 'Additional context or information displayed alongside the description',
    }),
    defineField({
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
                  lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
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
    }),
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
