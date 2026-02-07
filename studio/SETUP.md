# Portfolio Studio Setup Steps

## Step 1: Install Dependencies

```bash
cd studio
npm install
```

This will install all Sanity Studio dependencies. Takes 2-5 minutes.

## Step 2: Configure Sanity Project

### Option A: Use Existing Project (wxzoc64y)

If you want to use the same Sanity project as your blog:

1. Update `sanity.config.ts` - change `YOUR_PROJECT_ID_HERE` to `wxzoc64y`
2. Update `sanity.cli.ts` - change `YOUR_PROJECT_ID_HERE` to `wxzoc64y`
3. Keep `.env` in portfolio-site root as is (already has `wxzoc64y`)

### Option B: Create New Project

If you want a completely separate Sanity project:

1. Run: `sanity init`
2. Follow prompts to create a new project
3. Update `.env` in portfolio-site root with the new project ID

## Step 3: Start the Studio

```bash
npm run dev
```

The Studio will open at `http://localhost:3333`

## Step 4: Create Your First Project

1. In the Studio, click "Create new" → "Project"
2. Fill in:
   - Title (e.g., "Website updates to an online lighting store")
   - Slug (auto-generated)
   - Hero Image
   - Tags
   - Background Color (hex code like #B8DED4)
   - Description
   - Challenge, Solution, Results (optional)
   - Content Blocks (add text and image blocks)

## Step 5: Test Your Portfolio Site

1. Make sure `.env` file in portfolio-site root has the correct project ID
2. Start your portfolio site:
   ```bash
   cd ..  # back to portfolio-site root
   npm run dev
   ```
3. Visit `/work/your-project-slug` to see your project page

## Step 6: Deploy (When Ready)

### Deploy Studio:
```bash
cd studio
npm run deploy
```

### Deploy Portfolio Site:
Already configured for Netlify - just push to your repo!
