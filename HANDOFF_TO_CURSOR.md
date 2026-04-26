# Complete Handoff - Portfolio Project

## Project Overview
Next.js 16.2.4 portfolio for Hardik Saini with cinematic warm corporate design.

**Current Status**: Running in Docker at `http://localhost:3003`

---

## ✅ What's Been Completed

### 1. **Hero Section**
- **Location**: `app/components/homepage/hero-section/index.jsx`
- Text changed to "Hey I'm Hardik Saini" (3 separate lines)
- Profile photo added on the right side with elegant borders
- Photo: `/public/profile-cutout.jpg` (professional blue suit photo)
- Elegant corner accents with gradient lines
- Subtle inner glow border
- Floating geometric shapes behind
- Hover effects (scale + lift)
- **Issue**: Text clipping was fixed by changing `.word-mask` overflow to `visible`

### 2. **Scroll Progress Bar**
- **Location**: `app/components/effects/scroll-progress.jsx`
- Thin amber line at top of page
- Tracks overall scroll progress
- Added to `app/layout.js`

### 3. **Section-Aware Navbar**
- **Location**: `app/components/navbar.jsx`
- Highlights active section as you scroll
- Uses IntersectionObserver
- Amber underline indicator on active section

### 4. **Project Tiles with Image Support**
- **Location**: `app/components/homepage/horizontal-work/project-tile.jsx`
- Supports Next.js Image component
- Graceful fallback to gradient placeholders
- Images expected at `/public/image/projects/*.png`

### 5. **Mobile-Responsive Horizontal Work**
- **Location**: `app/components/homepage/horizontal-work/index.jsx`
- Desktop: Pinned horizontal scroller
- Mobile (<768px): Vertical stacked cards

### 6. **Design System**
- **Location**: `app/css/globals.scss`
- Warm cream + ink charcoal + amber palette
- Cinematic typography (Fraunces display font)
- Premium shadows and effects
- Reduced-motion support

### 7. **Template Cleanup**
- Removed references to "said7388", "abusaid" from `.github/FUNDING.yml`
- Changed to `harry830` (Hardik's GitHub username)
- No other template leftovers found

---

## ⚠️ Known Issues

### 1. **Mercedes Star Animation** (NEEDS WORK)
- **Location**: `app/components/homepage/mercedes-feature/index.jsx`
- **Current State**: Basic animation that triggers on scroll into view
- **Desired Effect**: 
  - Page should STOP scrolling when Mercedes section comes into view
  - Star builds spoke by spoke (like clock hands rotating into place)
  - First spoke appears and rotates to 12 o'clock
  - Second spoke rotates to 8 o'clock (bottom-left)
  - Third spoke rotates to 4 o'clock (bottom-right)
  - Center circle and rings appear
  - Complete Mercedes star formed
  - THEN allow user to continue scrolling
- **Challenge**: Scroll-jacking conflicts with Lenis smooth scroll library
- **Attempted Solutions**:
  - Tried `document.body.style.overflow = 'hidden'` (didn't work with Lenis)
  - Tried time-based animation with scroll lock (buggy)
  - Currently using simple `useInView` trigger (no scroll lock)

### 2. **Native Binding Issues (macOS)**
- **Issue**: `lightningcss-darwin-arm64` and `@next/swc-darwin-arm64` blocked by macOS Gatekeeper
- **Workaround**: Running in Docker (works perfectly)
- **Impact**: 
  - ❌ `npm run build` fails locally on Mac
  - ✅ `npm run dev` works in Docker
  - ✅ Vercel builds will work fine (Linux environment)

### 3. **Missing Project Images**
- **Location**: `/public/image/projects/`
- Expected images (currently showing gradient placeholders):
  - `stockd.png`
  - `roomiesyncai.png`
  - `tasktrail.png`
  - `speechmate.png`
  - `department-assistant.png`

---

## 🐳 Docker Setup

### Current Container
```bash
# Container is running on port 3003
docker ps | grep portfolio

# View logs
docker logs portfolio-container

# Stop container
docker rm -f portfolio-container
```

### Rebuild & Run
```bash
# From project root
docker build -f Dockerfile.local -t portfolio-dev .
docker run -d -p 3003:3000 --name portfolio-container portfolio-dev

# Access at: http://localhost:3003
```

### Dockerfile
- **Location**: `Dockerfile.local`
- Base: `node:20-alpine`
- Runs: `npm run dev`
- Port: 3000 (mapped to 3003 on host)

---

## 📁 Key Files & Structure

### Components
```
app/components/
├── effects/
│   ├── cursor.jsx                    # Custom cursor (respects reduced-motion)
│   ├── preloader.jsx                 # Loading animation
│   ├── magnetic.jsx                  # Magnetic button effect
│   ├── marquee-strip.jsx             # Scrolling text strips
│   └── scroll-progress.jsx           # NEW: Top progress bar
├── homepage/
│   ├── hero-section/index.jsx        # MODIFIED: "Hey I'm Hardik Saini" + photo
│   ├── mercedes-feature/index.jsx    # NEEDS WORK: Star animation
│   ├── horizontal-work/
│   │   ├── index.jsx                 # MODIFIED: Mobile responsive
│   │   └── project-tile.jsx          # MODIFIED: Image support
│   ├── experience/index.jsx
│   ├── programs/index.jsx
│   ├── about/index.jsx
│   ├── skills/index.jsx
│   ├── contact/index.jsx
│   └── ...
├── navbar.jsx                        # MODIFIED: Section-aware
└── footer.jsx
```

### Data Files
```
utils/data/
├── personal-data.js      # Hardik's info (clean, no template data)
├── projects-data.js      # 5 projects (Stockd, RoomieSyncAI, etc.)
├── experience.js         # Mercedes, ARCTIC, GSU tutoring
├── programs.js           # CreateX, Startup Exchange
└── skills.js
```

### Styles
```
app/css/
├── globals.scss          # MODIFIED: Design tokens, word-mask fix
└── card.scss
```

### Config
```
package.json              # Scripts use --webpack flag
tailwind.config.js        # Tailwind v4 config
Dockerfile.local          # NEW: Docker setup
.dockerignore            # NEW: Docker ignore rules
```

---

## 🎨 Design System

### Colors (CSS Variables)
```scss
--bg-cream: #f6f2ea        // Main background
--ink: #16161a             // Primary text
--amber: #c8843d           // Accent color
--amber-deep: #a26425      // Darker accent
--paper: #fbf8f1           // Card backgrounds
--charcoal: #0e0e10        // Mercedes section bg
```

### Typography
- **Display**: Fraunces (serif, for headlines)
- **Body**: Inter (sans-serif)
- **Mono**: JetBrains Mono

### Key Classes
- `.editorial` - Display font, tight tracking
- `.editorial-italic` - Italic display
- `.eyebrow` - Small caps labels
- `.display-xxl`, `.display-xl`, etc. - Responsive display sizes
- `.btn-primary`, `.btn-ghost` - Button styles
- `.surface-paper`, `.surface-ink` - Card surfaces

---

## 🔧 Scripts

```bash
# Development (with webpack, avoids Turbopack issues)
npm run dev

# Development (Turbopack - has native binding issues on Mac)
npm run dev:turbo

# Build (fails on Mac, works in Docker/Vercel)
npm run build

# Production
npm start
```

---

## 🎯 Task for Claude Opus 4.7

### Primary Goal: Fix Mercedes Star Animation

**Requirements**:
1. When user scrolls to Mercedes section, **lock/pause scrolling**
2. Play animation sequence (3-4 seconds):
   - Spoke 1 rotates into place (top, 12 o'clock)
   - Spoke 2 rotates into place (bottom-left, 8 o'clock)
   - Spoke 3 rotates into place (bottom-right, 4 o'clock)
   - Center circle + rings appear
   - Complete Mercedes star formed
3. **Unlock scrolling** after animation completes
4. Animation plays only once (not on scroll back)

**Challenges**:
- Lenis smooth scroll library is active (`app/components/providers/smooth-scroll.jsx`)
- Need to pause Lenis, not just `overflow: hidden`
- Should feel cinematic, not janky
- Must work in Docker environment

**Files to Modify**:
- `app/components/homepage/mercedes-feature/index.jsx` (main file)
- Possibly `app/components/providers/smooth-scroll.jsx` (to expose Lenis instance)

**Reference**:
- Current animation uses `useInView` from framer-motion
- Each spoke uses `pathLength` animation
- Rotation uses `rotate` transform with `originX/originY`

---

## 📦 Dependencies

### Key Libraries
- **Next.js**: 16.2.4 (App Router)
- **React**: 19.2.0
- **Framer Motion**: 12.4.0 (animations)
- **Lenis**: 1.1.18 (smooth scroll)
- **Tailwind**: v4 via @tailwindcss/postcss
- **SCSS**: sass 1.69.5

### Full List
See `package.json` for complete dependencies.

---

## 🚀 Deployment Notes

### Vercel (Recommended)
- Push to branch: `revamp-warm-corporate-portfolio`
- **DO NOT merge to main**
- **DO NOT deploy to production yet**
- Vercel preview builds will work (Linux environment, no native binding issues)

### Environment Variables
- None currently required for build
- `NEXT_PUBLIC_GTM` for Google Tag Manager (optional)

---

## 📝 Additional Context

### User Preferences
- Wants cinematic, premium feel
- Likes motion-rich interactions
- Wants Mercedes section to be a "wow" moment
- Professional/corporate aesthetic (not gamer/cyberpunk)
- Warm palette (cream, amber, ink)

### Content
- CS junior at Georgia State University
- ARCTIC HPC team member
- Mercedes-Benz USA SAP & Innovation Intern (Summer 2026)
- CreateX participant
- Startup Exchange Genesis Spring Batch graduate
- Builds practical AI, cloud, and enterprise tools

---

## 🔗 Important Links

- **GitHub Repo**: https://github.com/Harry830/portfolio
- **Branch**: `revamp-warm-corporate-portfolio`
- **Local Docker**: http://localhost:3003
- **Resume**: `/public/Hardik Saini Resume.pdf`
- **Profile Photo**: `/public/profile-cutout.jpg`

---

## ✅ Pre-Handoff Checklist

- [x] All changes documented
- [x] Docker container running successfully
- [x] No git commits made (changes are local)
- [x] No pushes to remote
- [x] No merges to main
- [x] Template references removed
- [x] Data files accurate for Hardik
- [x] Known issues documented
- [x] File structure explained
- [x] Design system documented

---

## 🎬 Next Steps for You

1. **Stop Docker container** (if you want to work locally):
   ```bash
   docker rm -f portfolio-container
   ```

2. **Open in Cursor** with Claude Opus 4.7

3. **Focus on**: `app/components/homepage/mercedes-feature/index.jsx`

4. **Goal**: Implement scroll-jacking for Mercedes star animation

5. **Test in Docker** when done:
   ```bash
   docker build -f Dockerfile.local -t portfolio-dev .
   docker run -d -p 3003:3000 --name portfolio-container portfolio-dev
   ```

---

## 💡 Tips for Claude Opus 4.7

1. **Lenis Integration**: You'll need to access the Lenis instance to pause/resume scroll
   - Check `app/components/providers/smooth-scroll.jsx`
   - May need to use React Context to expose Lenis instance
   - Lenis API: `lenis.stop()` and `lenis.start()`

2. **Scroll Detection**: Use IntersectionObserver or scroll position
   - Trigger when section is ~30-50% in viewport
   - Lock scroll immediately
   - Play animation
   - Unlock after completion

3. **Animation Timing**: Current delays are:
   - Spoke 1: 0.3s delay
   - Spoke 2: 1.0s delay
   - Spoke 3: 1.7s delay
   - Center: 2.5s delay
   - Total: ~3 seconds

4. **Testing**: The Docker environment is the source of truth
   - Local Mac has native binding issues
   - Always test in Docker before considering it done

---

Good luck! The Mercedes animation is the last major piece. Everything else is polished and working great. 🚀
