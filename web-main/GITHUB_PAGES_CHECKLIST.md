# GitHub Pages Deployment Checklist

This repo uses a manual Pages deploy from the `docs/` folder. No GitHub Action is required.

## 1) Commit Required Files

Make sure these files are committed:

- `docs/index.html`
- `docs/script.js`
- `docs/styles.css`
- `docs/firebase-config.js`
- `docs/data/*`
- `docs/images/*` (if used)
- `docs/.nojekyll`

## 2) Push to GitHub

Push your branch to GitHub:

```bash
git add .
git commit -m "Prepare GitHub Pages deployment"
git push origin <your-branch>
```

## 3) Enable GitHub Pages

In your repository:

1. Open **Settings**.
2. Open **Pages**.
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/docs`
4. Save.

If you update the site later, edit the files in `docs/`, then commit and push again. GitHub Pages will publish the latest `docs/` contents automatically from the selected branch.

## 4) Wait for Publish

GitHub will provide a URL like:

- `https://<username>.github.io/<repo-name>/`

## 5) Post-Deploy Checks

1. Open the site URL.
2. Sign in with your Firebase Authentication email and password.
3. Go to **Admin Panel > Database**.
4. Confirm Firebase connection status is successful.
5. Run **Seed Default DB** and verify progress log reports completion.

## Notes

- Firebase web config values are safe to be public in client-side apps.
- Enable **Email/Password** in Firebase Authentication before using the site.
- Create the admin user in Firebase Authentication so you can sign in from the landing page.
- Security is enforced by Firebase Realtime Database Rules.
- If your data does not load, verify rules allow read/write for your current test setup.

