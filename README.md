# Engineering Portfolio Workshop Starter

Build and publish a personal portfolio site from this starter. It was created by [Travis Minor](https://github.com/Tmino1) for workshop participants.

## Start your copy

1. Click **Fork** at the top of this repository and create a copy in your GitHub account. Forking keeps a visible link back to this workshop starter.
2. In your new repository, click **Code**, then **Open with GitHub Desktop**. Choose where to save the project and clone it.
3. Install [Node.js LTS](https://nodejs.org/) if it is not already installed. In a terminal opened in the project folder, run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local address Vite prints, usually `http://localhost:5173`. Leave `npm run dev` running while you edit.

## Customize your portfolio

Most workshop edits happen in [`src/content/content.json`](src/content/content.json). Replace the guided example text with your own information.

- `site`: your name, tagline, contact email, location, availability, optional resume path, and optional starter credit.
- `about`, `skills`, `education`, and `experience`: the Home and Experience pages.
- `projects`: your work. Each project needs a unique lowercase `slug`; its `order` controls its position. GitHub and live links are optional.
- `contact`: the links shown on the Home, Contact, and footer areas. Use `mailto:your-email@example.com` for email.

### Add project images

Create a folder at `public/projects/<project-slug>/` and put web-ready `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`, or `.svg` files there. The site displays them in filename order, so `01-photo.jpg` comes before `02-diagram.png`.

Add a matching entry under that project's `captions` field when you want a caption. You can add an `images` array to choose a specific order; otherwise every supported image in the folder is used automatically.

### Brand the browser tab

Update the title in `index.html` and replace `public/favicon.svg` with your own SVG favicon. You can also set `site.photo` to a path such as `/profile.jpg` after adding that image to `public/`.

Paths to files in `public/` may start with `/` or omit it. The starter adds the correct repository path when it builds for GitHub Pages.

The default footer includes a link to this workshop starter. Keep it to make your project visibly connected to the workshop, or remove `site.templateCredit` from `content.json` when you are ready to remove it.

## Publish your site

1. In GitHub Desktop, review your changes, write a short commit message, and click **Commit to main**.
2. Click **Push origin**.
3. On your fork's GitHub page, open the **Actions** tab. If GitHub asks you to enable workflows for the fork, confirm that you understand the workflows and enable them.
4. Open **Settings** → **Pages**. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Return to the **Actions** tab and wait for **Deploy to GitHub Pages** to finish. The deployment link appears in the successful job and under **Settings** → **Pages**.

Future pushes to `main` redeploy the site automatically.

## Check your work

Run these commands before publishing if you can:

```bash
npm run lint
npm run build
```

`npm run build` creates a local `dist/` folder, which Git ignores.

## License

This starter is available under the [MIT License](LICENSE).
