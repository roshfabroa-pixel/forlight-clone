# Deploying SunPeak Solar

How the pieces fit together:

- **GitHub** stores your code and gives Vercel something to watch.
- **Vercel** builds the site (`npm run build`) and serves it on the internet for free, redeploying automatically every time you push to GitHub.
- **Supabase** is a hosted Postgres database. It's what makes the Contact form actually *do* something — right now submissions vanish into nothing; Supabase gives them somewhere to land, viewable in a spreadsheet-like table editor.

Total time: ~30 minutes the first time.

---

## Part 1 — Install Git

Git isn't installed on this machine yet.

1. Go to https://git-scm.com/downloads and download the Windows installer.
2. Run it. Default options are fine for every screen — just keep clicking "Next" then "Install".
3. Close and reopen any terminal, then confirm it worked:
   ```bash
   git --version
   ```
   You should see something like `git version 2.x.x`.
4. One-time setup (tells Git who you are, needed before your first commit):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your-email@example.com"
   ```
   Use the same email you'll use for GitHub in Part 2.

---

## Part 2 — Create a GitHub account and repository

1. Go to https://github.com and sign up (free).
2. Click the **+** icon top-right → **New repository**.
3. Name it `forlight-clone` (or anything you like). Leave it **Public** or **Private**, your choice — either works with Vercel's free tier. Do **not** check "Add a README" (we already have a project).
4. Click **Create repository**. GitHub shows you a page with setup commands — ignore it, use the commands below instead.

### Push your code

Open a terminal in your project folder and run these one at a time:

```bash
cd C:\Users\burat\Documents\forlight-clone
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/forlight-clone.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username (shown in the repo URL GitHub gave you).

The first `git push` will pop up a browser window asking you to sign in to GitHub — do that, it's a one-time authorization.

**Every time you make changes later** and want them live, you only need:
```bash
git add .
git commit -m "describe what you changed"
git push
```

---

## Part 3 — Create your Supabase project and table

1. Go to https://supabase.com and sign up (you can use your GitHub account to sign in — one less password).
2. Click **New project**. Pick any organization (it'll create one for you), name the project (e.g. `sunpeak-solar`), set a database password (save it somewhere — a password manager, not in chat), pick the region closest to you, click **Create new project**. Wait ~2 minutes while it provisions.
3. Once it's ready, go to the **SQL Editor** (left sidebar) → **New query**, paste this, and click **Run**:

   ```sql
   create table contact_submissions (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz default now(),
     name text not null,
     phone text,
     email text not null,
     interest text,
     message text
   );

   alter table contact_submissions enable row level security;

   create policy "Allow public inserts"
     on contact_submissions for insert
     to anon
     with check (true);
   ```

   What this does: creates the table, turns on Row Level Security (RLS — Supabase's permission system, on by default so nothing is readable/writable until you say so), then adds one policy that allows anyone to **insert** a row (submit the form) but — since there's no matching `select` policy — nobody can read submissions through the public API. You'll read them yourself in the table editor, where you're authenticated as the project owner and RLS doesn't apply.

4. Get your API keys: **Settings** (gear icon, left sidebar) → **API**. You need two values:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon / public key** (a long string starting with `eyJ...`)

   Keep this tab open — you'll paste these into both your local `.env.local` and Vercel in the next steps.

---

## Part 4 — Connect Supabase locally

In your project folder, create a file named `.env.local` (copy `.env.example` and rename it) with your real values:

```
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-real-key...
```

This file is already git-ignored (see `.gitignore`) — it will never be pushed to GitHub, which is correct: env files with real keys shouldn't be public, even though this particular key is safe-ish by design (RLS is what actually protects your data, not secrecy of the anon key).

Restart your dev server (`npm run dev`) and try the Contact form at `http://localhost:5173/contact` — submissions should now show up in Supabase under **Table Editor → contact_submissions**.

---

## Part 5 — Deploy to Vercel

1. Go to https://vercel.com and sign up using **"Continue with GitHub"** — this also grants Vercel permission to see your repos, which is what lets it auto-deploy.
2. Click **Add New… → Project**.
3. Find `forlight-clone` in the list and click **Import**.
4. Vercel auto-detects it's a Vite project — leave the build settings as-is (Build Command: `npm run build`, Output Directory: `dist`).
5. Before clicking Deploy, expand **Environment Variables** and add the same two values from Part 3:
   | Name | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | your Supabase project URL |
   | `VITE_SUPABASE_ANON_KEY` | your Supabase anon key |
6. Click **Deploy**. Wait ~1 minute.
7. You'll get a live URL like `forlight-clone.vercel.app` — that's your site, online, for anyone.

### After the first deploy

Any time you `git push` to the `main` branch, Vercel automatically rebuilds and redeploys within a minute or two — no extra steps. You'll see each deploy listed in your Vercel project dashboard.

### Custom domain (optional)

In the Vercel project → **Settings → Domains**, you can add a domain you own (e.g. from Namecheap, Google Domains) and Vercel will walk you through pointing its DNS at your site.

---

## Quick troubleshooting

- **Contact form shows the red error message** → your Supabase env vars are missing or wrong. Check `.env.local` locally, or the Environment Variables tab in Vercel for the live site (and redeploy after changing them — Vercel doesn't hot-reload env var changes).
- **`git push` asks for a password and rejects it** → GitHub no longer accepts account passwords over git; it should open a browser sign-in instead. If it doesn't, install GitHub Desktop (https://desktop.github.com) as an easier GUI alternative to the git CLI.
- **Vercel build fails** → click into the failed deployment's logs; almost always a typo'd import or a missing dependency that works locally but wasn't committed (check `package.json` was pushed).
