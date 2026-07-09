---
name: Portfolio hero section decisions
description: Design decisions for the Raymond Bastasa portfolio Hero section.
---

The "View Portfolio" and "Contact Me" CTA buttons were intentionally removed from the Hero section because they duplicated nav links (Portfolio, Contact) that are always visible in the sticky navbar. Keeping them caused confusion (appeared unclickable on mobile due to z-index/animation stacking) and redundancy.

**Why:** User confirmed these were redundant — the sticky nav already provides direct access to both sections.

**How to apply:** Hero section should remain a clean badge → heading → tagline layout with no action buttons. Navigation is handled solely by the navbar.
