# Jay — Portfolio

React + TypeScript + Vite. Static portfolio for https://Jayyy0809.github.io.

## Run locally

```sh
npm ci
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution is restricted.
`npm run build` checks TypeScript and produces `dist/`. `npm run preview` serves the build.

## Edit content

- `src/projects.ts`: titles, categories, descriptions, and concept artwork themes.
- `src/main.tsx`: introduction, about text, GitHub link, and detail dialog.
- `src/style.css`: responsive layout, artwork, and animation.
- `index.html`: document title and search description.

All four projects are explicitly labeled placeholder concepts, not claims of client work. Replace them with real content before treating this as a finished portfolio. Artwork is original CSS; no third-party project images are included. Google Fonts is used with local fallback fonts.

## Publish

The repository owner must open **Settings → Pages → Build and deployment → Source → GitHub Actions**. Pushes to `main` then build and deploy automatically. To retry after enabling Pages, open Actions and run the deployment workflow manually.

No backend, account system, or secret keys are required. Project details use an accessible dialog so direct routes do not require a Pages SPA fallback. Respect system reduced-motion preferences; the footer also has a motion toggle.
