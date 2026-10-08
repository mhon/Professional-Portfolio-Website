---
name: NixOS browser automation limits
description: Headless Chromium/Playwright cannot run in this Replit NixOS sandbox due to missing system libs.
---

Headless Chromium (via Playwright or puppeteer) fails in this sandbox with `libglib-2.0.so.0 not found` and similar missing system library errors. Version-mismatched cached browsers also cause failures. The Screenshot browser also cannot create WebGL2 contexts here, so Three.js previews render their non-WebGL fallback instead of the live 3D scene.

**Why:** The NixOS container does not include the full set of shared libraries that Chromium requires for headless operation, and the screenshot browser's GPU/WebGL context is unavailable.

**How to apply:** Use appPreview screenshots to verify layout and graceful fallbacks, not actual WebGL rendering. For Three.js changes, also audit geometry/material/resource lifecycle in code and verify on a WebGL-capable browser/device when actual GPU output is critical. For mobile tap-target and interaction verification, use direct code audit plus screenshot of the relevant state.
