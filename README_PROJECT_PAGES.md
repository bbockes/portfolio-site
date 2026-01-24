# Project Case Study Pages - Setup Guide

## What Was Created

I've set up a dynamic routing system for project case study pages that follows this URL pattern:
```
brendanbockes.com/work/project-slug
```

## Files Created/Modified

### New Files:
1. **`src/components/ProjectDetail.tsx`** - The case study page template
2. **`src/lib/sanityClient.ts`** - Sanity CMS connection
3. **`SANITY_SCHEMA.md`** - Sanity schema for projects (see this file for schema code)
4. **`.env.example`** - Environment variables template

### Modified Files:
1. **`src/App.tsx`** - Added `/work/:slug` route
2. **`src/components/WorkCard.tsx`** - Now links to `/work/{slug}`
3. **`src/components/WorkSection.tsx`** - Added slugs to projects

## How It Works

### Current State (Static Projects)
Right now, clicking a work card will navigate to `/work/project-slug`, but you'll see "Project not found" because there's no content in Sanity yet.

### Once You Add Sanity Content:
1. The page will fetch the project from Sanity using the slug
2. Display hero image, title, tags, and description
3. Render all content blocks (text and images) in order
4. Each project can have unlimited content blocks

## Setup Steps

### 1. Configure Sanity Studio

Copy the schema from `SANITY_SCHEMA.md` and add it to your Sanity Studio project:

```bash
# In your Sanity Studio directory
cd studio-brendans-blog

# Create schema file
touch schemas/project.ts
```

Then copy the schema code from `SANITY_SCHEMA.md` into that file.

### 2. Add Environment Variables

Create `.env` file in portfolio-site root:

```bash
cp .env.example .env
```

Then fill in your actual Sanity project ID and dataset name.

### 3. Create Projects in Sanity Studio

1. Start your Sanity Studio
2. You'll see a new "Project" document type
3. Create a project with:
   - Title
   - Slug (auto-generated from title)
   - Hero image
   - Tags
   - Background color (for the card)
   - Description
   - Content blocks (add as many text/image blocks as you want)

### 4. Update Work Cards (Optional)

Eventually, you'll want to fetch projects from Sanity for the homepage cards too. For now, they're static in `WorkSection.tsx`.

## Content Block System

Each project has an array of `contentBlocks` that can be:

### Text Block
- Optional heading
- Text content (supports multi-paragraph)

### Image Block
- Image
- Optional caption

### Layout
- All blocks are full-width within the 960px container
- Text and images alternate naturally
- Add as many blocks as you need
- Rearrange order in Sanity Studio

## URL Examples

Based on your current projects:
- `/work/online-lighting-store`
- `/work/painting-company-seo`
- `/work/home-services-form-redesign`
- `/work/cookbook-ecommerce`
- `/work/peta-webpage-redesign`

## Next Steps

1. ✅ Routing is set up
2. ✅ Template is created
3. ✅ Work cards link to detail pages
4. ⏳ Add Sanity schema to your Studio
5. ⏳ Create projects in Sanity
6. ⏳ Add environment variables
7. ⏳ Test by visiting `/work/your-project-slug`

## Testing Without Sanity

If you want to test the layout before setting up Sanity, you could temporarily modify `ProjectDetail.tsx` to use mock data. Let me know if you want me to add that!
