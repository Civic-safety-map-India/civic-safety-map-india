# Contributing to Civic Safety Map (India)

Thank you for your interest in contributing to **Civic Safety Map (India)**.

Our objective is **infrastructure transparency**: making public CCTV operational blind spots visible so accident and assault investigations aren't derailed by missing or broken cameras, and surfacing credible state-level police/justice accountability data.

---

## ⚠️ Non-Negotiable Hard Constraints

Before writing code or opening a PR, understand these rules. **Pull requests violating these boundaries will be closed immediately without merge debate**:

1. **Strictly NO Rating, Naming, or Reviewing of Individual Police Officers:**
   - Under Indian law (Bharatiya Nyaya Sanhita Section 356, formerly IPC 499/500 criminal defamation), naming individual personnel creates severe legal exposure and turns the platform into a harassment / vigilante vector.
   - We map **infrastructure**, not people.
   - We track aggregate institutional benchmarks from published reports (India Justice Report, Status of Policing in India Report), **never** crowdsourced individual officer ratings.

2. **Strictly NO Victim Identifiable Information:**
   - No names, addresses, vehicle registration numbers, or identifiable victim details may be submitted or stored.

3. **Mandatory Moderation Interlock:**
   - No user-submitted report or node may be published to the public map automatically. Every submission must pass through an admin/moderator verification queue (`moderation_status = 'approved'`).

---

## How the Architecture Works

- **Module A (Current Phase — MVP):**
  - Pulls public surveillance camera locations from **OpenStreetMap** via Overpass API (`man_made=surveillance`).
  - Stores crowd-reported operational status (`working`, `broken`, `unsure`) in a lightweight PostgreSQL/Supabase database.
  - Exposes an admin moderation review queue to prevent spam and defamatory submissions.

- **Module B (Future Phase):**
  - Aggregated city/state-level justice and police performance context sourced from public IJR/SPIR publications.

---

## Getting Started Locally

```bash
# 1. Clone repository
git clone https://github.com/Civic-safety-map-India/civic-safety-map.git
cd civic-safety-map

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run production build
npm run build
```

---

## PR Checklist

Before submitting a Pull Request, verify:
- [ ] Code compiles with `npm run build` without TypeScript errors.
- [ ] PR does **not** introduce any feature or field for naming/reviewing individual police officers.
- [ ] PR does **not** bypass the moderation queue for public reports.
- [ ] Changes are minimal, modular, and focused.
