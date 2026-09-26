---
name: Skills graph alignment
description: Constraint for keeping the responsive Skills graph nodes aligned with SVG connection endpoints.
---

## Rule
The Skills graph's SVG lines and HTML node centers must share the same fixed geometry. Do not animate node position with `x` or `y` transforms independently of the SVG.

**Why:** The SVG scales with the graph container, while independently animated HTML nodes move away from their line endpoints on desktop, tablet, and mobile layouts.

**How to apply:** Use percentage-based node positions derived from the SVG viewBox and preserve the node wrapper's centering transform. If motion is added, limit it to non-position-changing effects such as opacity or an inner icon treatment.