# Wedding Invitation

An elegant, responsive Indian wedding invitation starter built with vanilla HTML, CSS and JavaScript. It has no build step and can be hosted on GitHub Pages.

## Project structure

```text
wedding-invitation/
├── .github/workflows/deploy.yml
├── assets/images/
├── assets/music/
├── css/style.css
├── js/config.js
├── js/main.js
├── index.html
├── .gitignore
└── README.md
```

## Customize the invitation

Edit `js/config.js` to update:

- Couple names and page title
- Wedding date and display date
- City, venue, address and map link
- Welcome message and event schedule
- RSVP destination and deadline
- Optional background music path and volume

Use an ISO 8601 wedding date with an explicit timezone, for example `2027-02-14T10:00:00+05:30`. Replace all sample values before sharing the invitation.

## Preview locally

From the project root:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Deploy to GitHub Pages

1. Push the project to the repository's `main` branch.
2. In **Settings → Pages**, select **GitHub Actions** as the build and deployment source.
3. The included workflow deploys the repository root on every push to `main`.

## Notes

- The site is mobile responsive and respects reduced-motion preferences.
- Music is opt-in and does not autoplay. Add only audio you have permission to use.
- The page includes `noindex` metadata as a courtesy, not access control. A public repository and its Pages website can be viewed by anyone with the link.
- Do not commit private guest lists, personal contact details, credentials or photos without permission.
