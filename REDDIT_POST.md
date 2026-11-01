# Ready-to-Paste Reddit Post

**Target Subreddits:** `r/developersIndia` · `r/opensource`  
**Flair:** Project / Open Source / Discussion

---

### Title:
**Built a lightweight crowd-map for public CCTV operational status in Indian cities (starting Delhi) — need open-source contributors**

---

### Body:

Hey everyone,

Whenever a hit-and-run, harassment, or assault case happens in Indian cities, there’s an almost predictable headline a few days later: *“The CCTV at the spot was not working / footage could not be retrieved.”*

At the same time, people see speed cameras flashing challans every 500 meters, which builds this frustrating public sense that cameras only work when money is being collected, not when someone’s safety is on the line.

Instead of waiting for an RTI or complaining on Twitter, I wanted to see if we could make the **actual infrastructure gap visible beforehand**.

OpenStreetMap already has thousands of public cameras mapped across Indian metros (under `man_made=surveillance` — Bengaluru volunteers have mapped hundreds of them since 2019). But OSM only records *where* a camera exists, not whether it’s actually working right now.

I’ve scaffolded an open-source MVP called **Civic Safety Map (India)**:
* **Frontend:** React + Leaflet map rendering live surveillance nodes via OSM Overpass API.
* **Status Layer:** Lets anyone flag whether a camera is physically working, offline/broken, or a blind spot, with optional photo verification.
* **Moderation Queue:** Submissions don't go live immediately — they land in a review queue first so the map doesn't get flooded with spam.

### Hard boundaries we're keeping (non-negotiable):
1. **No naming or rating individual police officers.** In India, this is an instant BNS Section 356 defamation liability risk and attracts troll reviews. We track hardware and institutional stats, not personnel.
2. **No victim details or crime reporting.** This is strictly an infrastructure transparency tool, not an FIR portal or vigilante tracker.
3. **Mandatory moderation before publishing.**

### How you can help:
I’m a master’s student dealing with exams and a job hunt, so I cannot build this entire system alone. I’ve put the codebase together with a working UI, seeded Delhi nodes, Supabase schema, and clear "good first issues" so the community can run with it.

If you know React, TypeScript, Leaflet/GIS, or Python/Supabase backend, or want to help add bounding boxes for Bengaluru, Mumbai, Pune, or Chandigarh — PRs and feedback are very welcome:

👉 **GitHub:** `https://github.com/Civic-safety-map-India/civic-safety-map-india`

Let me know what you think of the concept or if you’ve run into similar mapping efforts in your city.
