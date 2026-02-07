# Sanity Schema for Project Case Studies

Add this schema to your Sanity Studio project to manage your portfolio case studies.

## File Location
Create this file at: `studio-brendans-blog/schemas/project.ts` (or similar location in your Sanity Studio)

## Schema Code

```typescript
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle shown below the title in the hero section',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main hero image displayed at the top of the case study page',
    },
    {
      name: 'logo',
      title: 'Project Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional project logo displayed alongside challenge/solution/results',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g. SEO, CRO, UX/UI, Content Strategy',
    },
    {
      name: 'bgColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color for card background (e.g. #B8DED4)',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description shown at the top of the case study',
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 3,
      description: 'The challenge or problem this project addressed',
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 3,
      description: 'The solution or approach taken',
    },
    {
      name: 'results',
      title: 'Results',
      type: 'text',
      rows: 3,
      description: 'The outcomes or results achieved',
    },
    {
      name: 'additionalInfo',
      title: 'Additional Info',
      type: 'text',
      rows: 4,
      description: 'Additional context or information displayed alongside the description',
    },
    {
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {
          name: 'textBlock',
          title: 'Text Block',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 10,
            },
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
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              media: 'image',
              title: 'caption',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tags',
      media: 'heroImage',
    },
  },
};
```

## Add to Schema Index

In your `studio-brendans-blog/schemas/index.ts` (or similar), add:

```typescript
import project from './project'

export const schemaTypes = [
  // ... your other schemas
  project,
]
```

## Environment Variables

Add these to your `.env` file in the portfolio-site root:

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

## Content Structure Example

In Sanity Studio, a project case study would have:

- **Title**: "Website updates to an online lighting store"
- **Slug**: "online-lighting-store" (auto-generated from title)
- **Subtitle**: "A comprehensive SEO and UX overhaul" (optional)
- **Hero Image**: Main project screenshot
- **Logo**: Project/client logo (optional)
- **Tags**: ["SEO", "CRO", "IA", "Copywriting"]
- **Background Color**: "#B8DED4"
- **Description**: "A comprehensive SEO and UX overhaul that improved..."
- **Challenge**: "The website had poor search visibility and low conversion rates..."
- **Solution**: "We implemented a new information architecture and optimized key pages..."
- **Results**: "Organic traffic increased by 45% and conversions improved by 30%..."
- **Additional Info**: "This project was completed over 6 months with a team of..." (optional)
- **Content Blocks**: [
  - Text Block: { heading: "About", text: "..." }
  - Image Block: { image: screenshot1, caption: "Homepage redesign" }
  - Text Block: { heading: "The Problem", text: "..." }
  - Image Block: { image: screenshot2 }
  - ... more blocks
]

## How It Works

1. Create projects in Sanity Studio
2. Add as many text/image blocks as needed
3. Blocks appear in order on the case study page
4. URL will be: `brendanbockes.com/work/[slug]`

## Notes

- Text and image blocks can be same size (full width)
- You can add as many blocks as you want per project
- Blocks are flexible - skip heading or caption if not needed
- All projects use the same template but with different content
- **New fields**: The schema now includes `subtitle`, `logo`, `challenge`, `solution`, `results`, and `additionalInfo` to match the frontend query
- All new fields are optional - only fill in what's relevant for each project
- The `logo` field displays alongside the challenge/solution/results section
- `challenge`, `solution`, and `results` appear in a 3-column grid layout
- `description` and `additionalInfo` appear in a 2-column grid layout
