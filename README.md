# A Visual Diary of Becoming

An emotional digital portfolio built with React, Vite, Tailwind CSS, and Framer Motion. It is designed for a Fine Art student moving toward visual storytelling, digital production, image editing, and multimedia experiments.

## Local Setup

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal.

## Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Replace Works, Images, and Text

- Portfolio data lives in `src/data/works.js`.
- Public education, activities, awards, and internship content lives in `src/data/profile.js`.
- Bilingual site copy lives in `src/data/i18n.js`.
- Replace titles, years, mediums, mood tags, descriptions, artist statements, and tools there.
- Placeholder images live in `public/images/`.
- Rendered portfolio PDF pages live in `public/images/portfolio/`.
- To use your own artwork, put images into `public/images/`, then update each `image` path in `src/data/works.js`.

Example:

```js
image: "/images/my-painting.jpg"
```

For GitHub Pages project sites, public paths still begin with `/images/...`; Vite will combine them with the configured `base` path during build.

## Deploy to GitHub Pages

This project uses the `gh-pages` package.

```bash
npm install
npm run deploy
```

The deploy script runs:

```bash
npm run build
gh-pages -d dist
```

In GitHub, set Pages to deploy from the `gh-pages` branch.

## Important: Vite Base Path

Open `vite.config.js`.

If your repository is:

```text
username.github.io
```

keep:

```js
base: "/"
```

If your repository is:

```text
portfolio-site
```

change it to:

```js
base: "/portfolio-site/"
```

If GitHub Pages shows a blank page, the most common cause is an incorrect `base` path. Check the browser console for missing JavaScript or CSS files, then adjust `base` and run:

```bash
npm run deploy
```

## Structure

```text
src/
  components/
    About.jsx
    Contact.jsx
    EmotionalArchive.jsx
    FutureDirection.jsx
    Hero.jsx
    MotionSection.jsx
    Navbar.jsx
    Portfolio.jsx
    Sketchbook.jsx
  data/
    works.js
  App.jsx
  index.css
  main.jsx
public/
  images/
```
