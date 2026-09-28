# Starloom — review platform demo

Homepage with a scroll-driven 3D journey (Three.js) plus login, sign-up and password reset.

## Run locally
Open `index.html` in a browser, or serve the folder:

    npx serve .

## Deploy on GitHub Pages
1. Push this folder to a new GitHub repo.
2. Repo → Settings → Pages → Source: `Deploy from a branch`, Branch: `main`, folder `/ (root)`.
3. Link appears in a minute: `https://<username>.github.io/<repo-name>/`

## Files
    index.html          page markup
    assets/style.css    all styles (tokens at the top in :root)
    assets/app.js       reviews, search, login flow, 3D scenes
    assets/favicon.svg

## Demo notes
- Any valid email + 8-char password logs in. Password `wrongpass` shows the error state.
- Open the login directly with `#login`, sign-up with `#signup`.
- All companies, reviews and numbers are placeholder content.
- Three.js r128 and Google Fonts load from CDN; no build step.
