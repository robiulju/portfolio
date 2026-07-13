# Robiul Islam — Portfolio

A responsive, zero-build portfolio website built with semantic HTML, CSS, and
vanilla JavaScript.

## Project structure

```text
.
├── index.html
└── assets
    ├── css
    │   └── styles.css
    └── js
        ├── app.js
        └── config.js
```

- `index.html` contains the page content and semantic structure.
- `assets/css/styles.css` contains the complete visual system and responsive rules.
- `assets/js/app.js` contains interactions and progressive enhancement.
- `assets/js/config.js` contains public external links that may change independently.

## Add the resume link

Open `assets/js/config.js` and set `resumeUrl` to a publicly accessible Google
Drive sharing URL:

```js
window.PORTFOLIO_CONFIG = Object.freeze({
  resumeUrl: 'https://drive.google.com/your-share-link',
});
```

The download button stays visibly disabled until a URL is configured.

## Run locally

This site does not require dependencies or a build step. Open `index.html`
directly, or serve the directory with any static web server.
