---
name: NixOS browser automation limits
description: Headless Chromium/Playwright cannot run in this Replit NixOS sandbox due to missing system libs.
---

Headless Chromium (via Playwright or puppeteer) fails in this sandbox with `libglib-2.0.so.0 not found` and similar missing system library errors. Version-mismatched cached browsers also cause failures.

**Why:** The NixOS container does not include the full set of shared libraries that Chromium requires for headless operation.

**How to apply:** For visual verification of UI changes, use the `Screenshot` tool (appPreview mode) with viewport size tuning. For mobile tap-target and interaction verification where a screenshot cannot confirm the behavior, use direct code audit + temporary state toggles (e.g. force `mobileMenuOpen = true`) + Screenshot to confirm layout, then revert.
