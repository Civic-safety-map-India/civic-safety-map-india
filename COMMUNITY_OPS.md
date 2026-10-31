# Zero-Maintenance Community Operations Guide
> **For Shikhar:** How to steward this project with < 15 minutes of attention per week while focusing on your 5th-semester exams and job search in Nuremberg.

---

## 1. 2-Minute GitHub Setup

1. **Option A (GitHub Organization - Recommended):**
   - Go to `github.com/account/organizations/new` (Free tier).
   - Name: `civic-safety-map-india` or `civic-safety-map`.
   - Create a new public repository: `civic-safety-map`.
   - Your personal GitHub profile still gets credit for every commit.
2. **Option B (Personal GitHub):**
   - Create `github.com/shikhar-thakur/civic-safety-map` directly.

Push the scaffold:
```bash
cd /Users/shikharthakur/Desktop/civic-safety-map
git init
git add .
git commit -m "feat: initial civic safety map MVP scaffold (Module A)"
git branch -M main
git remote add origin https://github.com/<your-username-or-org>/civic-safety-map.git
git push -u origin main
```

---

## 2. Reddit Posting

1. Open [`REDDIT_POST.md`](REDDIT_POST.md).
2. Replace `<your-username-or-org>` with your real GitHub repo link.
3. Post to **r/developersIndia** (best on weekday morning or Sunday afternoon IST).

---

## 3. Delegating Without Doing Heavy Work

- **Assign Maintainer / Triage Role:** When 1 or 2 enthusiastic Indian devs open clean PRs, invite them as collaborators / maintainers with triage access.
- **Enforce the Guardrails:** You don't need to review lines of CSS. Your only job as project originator is saying: *"Does this PR touch officer naming or victim info? If so, close it immediately."*
- **Protect Your Focus:** Keep your time locked on your M.Sc. exams (IIS FAU) and your German interview prep (Siemens/DATEV). Let the community do the feature coding.
