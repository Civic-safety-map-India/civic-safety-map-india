# Civic Safety Map (India)
> **Public CCTV Operational Status & Infrastructure Transparency Map for Indian Metros.**  
> *Making blind spots visible before an investigation depends on them.*

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Geodata: OSM](https://img.shields.io/badge/Geodata-OpenStreetMap-orange)](https://www.openstreetmap.org/)

---

## The Problem

In Indian cities (starting with our pilot in **Delhi**), a recurring pattern occurs in hit-and-run and assault cases: CCTV footage is either missing, never retrieved in time, or the camera was physically non-functional when the incident occurred.

Meanwhile, citizens only see cameras being actively cited for traffic challans, leading to a deep cynicism that public surveillance infrastructure serves revenue extraction rather than civilian safety.

**Civic Safety Map does not attempt to fix policing.** It makes the physical **infrastructure gap** visible and verifiable by crowdsourcing camera operational status onto open maps.

> **Landscape Context:** Check out the [India GovTech & Anti-Corruption Project Index](GOVTECH_INDEX.md) for research on existing civic tools and why we specifically target open surveillance nodes over blocked FIR records.

---

## System Architecture

```text
 ┌────────────────────────────────────────────────────────┐
 │            OPENSTREETMAP OVERPASS API                  │
 │    Extracts nodes tagged [man_made=surveillance]       │
 └──────────────────────────┬─────────────────────────────┘
                            │ (GeoJSON camera coordinates)
                            ▼
 ┌────────────────────────────────────────────────────────┐
 │          CIVIC SAFETY MAP WEB CLIENT (React + Leaflet) │
 │                                                        │
 │  • Color-coded pins: 🟢 Working  🔴 Broken  🟡 Unsure  │
 │  • Anonymous crowd status submission form              │
 │  • Rate-limiting + client-side abuse mitigation        │
 └──────────────────────────┬─────────────────────────────┘
                            │ (Unpublished reports)
                            ▼
 ┌────────────────────────────────────────────────────────┐
 │        MODERATION & VERIFICATION GATEWAY               │
 │                                                        │
 │  • Human approval queue before live publishing         │
 │  • Hard filter: Strips officer names / defamatory text │
 │  • PostgreSQL / Supabase backend with RLS              │
 └────────────────────────────────────────────────────────┘
```

---

## Hard Constraints (Legal & Safety Shield)

These design constraints are strictly enforced in both architecture and contribution guidelines:

1. **Zero Officer Naming / Rating:** Defamation liability under BNS Section 356 (successor to IPC 499/500) makes crowdsourced officer ratings dangerous and prone to abuse. We map physical hardware and published institutional benchmarks, **never individual officers**.
2. **Zero Victim Exposure:** No personal identities, vehicle numbers, or victim narratives are accepted.
3. **Mandatory Moderation Gate:** All submitted operational statuses enter a review queue before public display.

---

## Quickstart

```bash
# 1. Clone repository
git clone https://github.com/shikharthakur2404/civic-safety-map.git
cd civic-safety-map

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev
```

Visit `http://localhost:5173` to interact with the map, submit reports, and test the moderation queue.

---

## Validation Milestone (MVP Gate)

Before building mobile wrappers or expanding beyond Delhi:
* **Target:** Collect **50 verified camera status reports across 3–5 known accident/incident hotspots in Delhi** (e.g. Connaught Place, Hauz Khas, Ring Road intersections).
* If baseline engagement is achieved organically, we will initiate **Module B (Institutional Accountability Layer)** using published data from the *India Justice Report (IJR)* and *Status of Policing in India Report (SPIR)*.

---

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for pull request guidelines, coding standards, and architectural guardrails.

### Good First Issues
- [ ] Connect Supabase client to replace in-memory moderation queue state with live Postgres tables (`schema/supabase_schema.sql`).
- [ ] Implement geographic cluster marker grouping (`Leaflet.markercluster`) for dense camera corridors.
- [ ] Add Overpass query presets for Bengaluru and Mumbai metropolitan regions.
- [ ] Add offline PWA caching service worker for field verification.

---

## License
* Software: [MIT](LICENSE)
* Geodata: Open Database License (ODbL) © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright).
