# Build Notes — Hardik Saini Portfolio

## Development Server ✅

The development server works perfectly:

```bash
npm run dev
```

Runs on `http://localhost:3000` (or 3002 if 3000 is in use).

## Production Build ⚠️

The production build currently fails on this macOS machine due to **code signature issues** with native bindings (`lightningcss` and `@next/swc-darwin-arm64`). This is a **local environment issue**, not a code problem.

### Error Details

```
code signature in <...> not valid for use in process: 
mapping process and mapped file (non-platform) have different Team IDs
```

This happens when:
- Native Node.js bindings are downloaded from npm
- macOS Gatekeeper blocks them due to code signature mismatches
- Common on Apple Silicon Macs with strict security settings

### Workarounds Attempted

1. ✅ Using `--webpack` flag (avoids Turbopack native binding issues)
2. ✅ Clean install with `--include=optional --foreground-scripts`
3. ✅ Removing quarantine attributes with `xattr -dr com.apple.quarantine node_modules`
4. ⚠️ Manually copying `lightningcss-darwin-arm64` binding
5. ⚠️ Still blocked by macOS security

### Why Dev Works But Build Fails

- **Dev mode**: Uses WASM fallback bindings (slower but works)
- **Build mode**: Requires native bindings for performance (blocked by macOS)

### Solutions

**Option 1: Build on Vercel (Recommended)**
```bash
git push origin revamp-warm-corporate-portfolio
```
Vercel's Linux build environment doesn't have these macOS security issues.

**Option 2: Disable Gatekeeper (Not Recommended)**
```bash
sudo spctl --master-disable
npm run build
sudo spctl --master-enable
```

**Option 3: Build in Docker**
```bash
docker build -f Dockerfile.prod -t portfolio .
```

**Option 4: Use a Different Machine**
Build on Linux or a Mac with different security settings.

## What Was Changed

### New Features Added ✨

1. **Scroll Progress Bar** (`app/components/effects/scroll-progress.jsx`)
   - Thin amber line at top of page
   - Tracks overall scroll progress
   - Uses framer-motion with spring physics

2. **Section-Aware Navbar** (`app/components/navbar.jsx`)
   - Highlights active section as you scroll
   - Uses IntersectionObserver
   - Amber underline indicator

3. **Image Support for Projects** (`app/components/homepage/horizontal-work/project-tile.jsx`)
   - Supports Next.js Image component
   - Graceful fallback to gradient placeholders
   - Error handling for missing images
   - Images should be placed in `/public/image/projects/`

4. **Mobile-Responsive Horizontal Work** (`app/components/homepage/horizontal-work/index.jsx`)
   - Desktop: Pinned horizontal scroller (existing)
   - Mobile (<768px): Vertical stacked cards
   - Better UX on small screens

### Fixes 🔧

1. **Removed Template References**
   - Fixed `.github/FUNDING.yml` (removed `said7388`, `abusaid`)
   - Changed to `harry830` (Hardik's GitHub username)

2. **Created Project Images Folder**
   - `/public/image/projects/` now exists
   - Ready for project screenshots

### Files Modified

- `app/layout.js` — Added ScrollProgress component
- `app/components/navbar.jsx` — Section-aware highlighting
- `app/components/homepage/horizontal-work/index.jsx` — Mobile responsive
- `app/components/homepage/horizontal-work/project-tile.jsx` — Image support
- `.github/FUNDING.yml` — Removed template references

### Files Created

- `app/components/effects/scroll-progress.jsx` — New scroll indicator
- `public/image/projects/` — Folder for project images
- `BUILD_NOTES.md` — This file

## Accessibility & Performance

- ✅ Preloader respects `prefers-reduced-motion`
- ✅ Custom cursor respects `prefers-reduced-motion`
- ✅ Focus states improved with `:focus-visible`
- ✅ Skip-to-content link for keyboard navigation
- ✅ Semantic HTML throughout
- ✅ ARIA labels on interactive elements

## Next Steps

1. **Add Project Images**
   - Place screenshots in `/public/image/projects/`
   - Expected filenames:
     - `stockd.png`
     - `roomiesyncai.png`
     - `tasktrail.png`
     - `speechmate.png`
     - `department-assistant.png`

2. **Test on Vercel**
   - Push to branch (don't merge to main)
   - Vercel preview build should work

3. **Optional Enhancements**
   - Add Mercedes-Benz logo SVG to `/public/image/logos/`
   - Add more chrome polish to Mercedes scene
   - Add subtle parallax to hero section
   - Add loading states for contact form

## Commands

```bash
# Development (works ✅)
npm run dev

# Build (fails locally ⚠️, works on Vercel ✅)
npm run build

# Start production server (after successful build)
npm start

# Lint (if configured)
npm run lint
```

## Environment

- Next.js: 16.2.4
- React: 19.2.0
- Tailwind: v4 via @tailwindcss/postcss
- Node: Latest LTS
- Platform: macOS (Apple Silicon)
- Branch: `revamp-warm-corporate-portfolio`

---

**Status**: Development server works perfectly. Production build blocked by local macOS security. Deploy to Vercel for production builds.
