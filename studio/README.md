# Portfolio Studio

Sanity Studio for managing portfolio projects.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your Sanity project:
   - Update `sanity.config.ts` with your project ID
   - Update `sanity.cli.ts` with your project ID
   - Or run `sanity init` to create a new project

3. Start the development server:
```bash
npm run dev
```

## Deploy

Deploy to Sanity's hosting:
```bash
npm run deploy
```

## Project ID

You can either:
- Use the same Sanity project as your blog (`wxzoc64y`) - projects will be separate document types
- Create a new Sanity project specifically for your portfolio

To create a new project, run:
```bash
sanity init
```
