# Deploy to Vercel

Your portfolio is ready to deploy. Choose one option:

---

## Option A: Deploy with Vercel (GitHub)

1. **Push your project to GitHub**
   - Create a repo at [github.com/new](https://github.com/new).
   - In your project folder run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in (use **Continue with GitHub**).
   - Click **Add New…** → **Project**.
   - Import your GitHub repo. Vercel will detect Next.js and set build settings.
   - Click **Deploy**. Your site will be live in about a minute.

3. **Optional:** Add a custom domain in the project **Settings → Domains**.

---

## Option B: Deploy with Vercel CLI

1. **Log in**
   ```bash
   npx vercel login
   ```
   Follow the link or email to log in.

2. **Deploy**
   ```bash
   npx vercel
   ```
   For production:
   ```bash
   npx vercel --prod
   ```

---

## Build

- **Build command:** `npm run build`
- **Output:** Next.js default (`.next` + static assets)
- **Node:** 18.x or 20.x (set in Vercel project **Settings → General** if needed)

No environment variables are required unless you add them later.
