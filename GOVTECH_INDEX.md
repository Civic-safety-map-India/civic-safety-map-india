# 🇮🇳 India GovTech & Anti-Corruption Project Index

> **Contribute before you build.** This document exists to stop good developers from rebuilding the same politician-tracker for the tenth time. Below: what already exists, what's genuinely missing, and where a few committed hours actually finish something.  
> *Compiled via live research, Nov 2026. Open-source projects move fast — before you cite a star count or "last updated" date publicly, re-check it.*

---

## Part 1 — Check this before you write a line of code

| Category | Already live | Reality check |
| :--- | :--- | :--- |
| **Politician transparency (assets, criminal records, wealth growth)** | [myneta.info](https://myneta.info/) (official ADR data), `AandK1412/myneta-dashboard` (asset-growth analytics 2004–2024), `NetaFilter.in`, `WiseVoter/wisevoter`, `anon-d3v/know-your-neta`, `yashodhan19/Sansad`, [politia.vercel.app](https://politia.vercel.app/) (active, ambitious "political data lakehouse") | **Saturated.** 8+ independent attempts. Most die after the creator's hackathon/semester ends. The real gap is maintenance, not another build. |
| **District civic dashboards** | `jayanthmb14/forthepeople` — 294★, 29 dashboard modules/district, live in 10 of 780+ districts | **Real traction**, actively maintained, openly asking for district contributors. |
| **Govt open data (raw)** | `ramSeraph/opendata`, `github.com/civictech-India` (Indian Law/Penal Code in JSON), `CivicDataLab` | Confirmed gap from the original list still holds: scripts and raw data exist, no consumer-facing visualization layer. |
| **Welfare scheme discovery** | `Yojana-Saathi/Yojana-Saathi`, `S-Raha23/JanSahayak`, `Yojna Sahayak` (solo project), `Haqdarshak` (funded startup, 7M+ reach) | **Crowded on discovery.** Nobody does fraud/middleman detection — that specific layer is still open. |
| **Electoral data** | `github.com/tcpd` / [lokdhaba.ashoka.edu.in](https://lokdhaba.ashoka.edu.in/) — Apache 2.0, APSA award-winning | Mature, official, open source. Confirmed gap: no real-time update layer. |
| **MP/MLA attendance & tracking** | TCPD's Political Career Tracker + Parliamentary Question Hour (alongside Lok Dhaba), `yashodhan19/Sansad` | Closer to "exists" than the original list suggested. |
| **Procurement/tender anomaly detection** | `TenderShield` (IIT Kanpur, flags single-bidder/spec-rigging patterns), `LiteralKrishu/TransparAI` (hackathon dashboard), `switchr24/mcp-india-tenders` (tender data access) | Fragmented, mostly hackathon/research-stage. None are maintained, citizen-facing products. |
| **Court case pendency** | National Judicial Data Grid — official, live, 16,000+ courts ([njdg.ecourts.gov.in](https://njdg.ecourts.gov.in/)); [DAKSH](https://www.dakshindia.org/) adds age/category breakdowns; `iamshouvikmitra/bharat-courts` (API/SDK) | Essentially done at the aggregate level. Any real gap is at the individual citizen level (next section). |
| **FIR tracking** | Each state runs its own eFIR portal on the CCTNS backend (Madhya Pradesh, Maharashtra, etc.); solo attempts: `Khurdhula-Harshavardhan/E-FIR`, `srikanta30/firsync`, `aakash18012/FIR` | Fragmented by state and by hackathon. A real cross-state citizen search layer doesn't appear to exist — but verify CCTNS data access is even legally/technically possible before committing to this. |
| **Crime mapping** | `Amandeep404/CrimeMapping` — Uttar Pradesh only, small | **Thin.** The project's own notes cite FIR data access as the hard blocker, not visualization. *(Note: Civic Safety Map bypasses this by mapping physical public camera infrastructure rather than unreleased FIR data).* |
| **Budget vs. actual spend** | `cbgaindia/district-dashboard-data-processing` ([openbudgetsindia.org](https://openbudgetsindia.org/)) | Already does district-level budget-vs-actual. Not a blank slate. |
| **Land records (LandChain)** | Not deeply verified this pass | Treat as unverified — do the same check above before building. |
| **Media ownership (PressureMap)** | Not deeply verified this pass | Same — unverified. |

---

## Part 2 — Where contribution has outsized impact right now

These are existing, active projects where a handful of PRs matters more than a new repo:
1. **Expand ForThePeople.in past 10 districts.** Codebase exists, pattern is established, 770 districts to go.
2. **Build the missing frontend for ramSeraph/opendata / civictech-India.** The data's already scraped and licensed — nobody has wrapped it in something a non-developer can read.
3. **Maintain / revive one of the stale politician-transparency repos** (e.g. `harrystevens/adr-election-node`, last pushed 2022) instead of starting a ninth tracker from zero.

---

## Part 3 — Gaps worth actually building (validated against what exists)

| Idea | Why it's different from what's already out there | Confidence |
| :--- | :--- | :--- |
| **RTI Outcome Tracker** | Existing RTI tools (`rti-db`, `RAACI/YourAdhikar`) cover filing, not what happens after — appeals, delays, final outcomes by department. Least crowded space I checked. | **High** |
| **TenderWatch** | A maintained, public-facing dashboard combining TenderShield's anomaly logic with live tender data (via something like `mcp-india-tenders`) — the existing pieces are backend tools or one-off demos, not a shipped product. | **Medium** |
| **CourtAlerts** | Not another pendency dashboard (NJDG already owns that) — a personal case-status notification layer on top of NJDG/bharat-courts data, so an individual citizen gets pinged on hearing dates instead of checking manually. | **Medium** |
| **SchemeRadar — fraud layer only** | Discovery tools already exist (Yojana-Saathi, JanSahayak). Nobody is detecting middleman/agent fraud in scheme applications. Build only that layer, don't rebuild discovery. | **Medium** |
| **Civic Safety Map (Current Project)** | Crowd-sourced operational verification of public surveillance nodes on OpenStreetMap (`man_made=surveillance`). Focuses on physical infrastructure blind-spots rather than blocked FIR databases. | **High** |

---

## Part 4 — Needs a validation pass before anyone commits (unverified)

- **LandChain** (blockchain land-mutation audit trail)
- **PressureMap** (media ownership concentration)
- **Cross-state FIR unification** (data access feasibility untested)
- **National crime heatmap** (FIR data availability is the known blocker)
- **SwachhBid** (Smart City delay tracking)

*Before putting any of these back on the "build" list, run the same search pass used for Parts 1–3 and update this file.*

---

## Guardrails before shipping anything in this space

1. **Defamation-law risk:** Don't name or rate individual officials, officers, or candidates beyond what's in a verified, citable public record (EC affidavits, court orders, official audits). This applies hardest to FIR-Tracker, PressureMap, and CrimeHeatMap.
2. **Respect ToS / scraping limits on government portals** (CCTNS, eCourts, GeM, data.gov.in). Several existing projects above cite this as their actual blocker, not lack of interest.
3. **Privacy of victims and the accused in any crime or FIR data** — anonymize before publishing anything geotagged.
4. **Always cite the original data source** (ECI, ADR, NJDG, data.gov.in, etc.) in whatever you build on top of it.

---

## How to contribute

1. Pick a track from Part 2 or Part 3 above.
2. Open an issue here describing what you're picking up, so two people don't duplicate work.
3. For anything touching Part 4, do the validation search first and post findings as an issue before writing code.
4. PRs welcome — no CLA, just cite your sources in the PR description.
