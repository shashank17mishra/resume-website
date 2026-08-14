# Design System — Shashank Mishra Portfolio

A light, clean, sophisticated aesthetic combining high-end creative agency design, Pinterest editorial layouts, premium SaaS websites, and modern full-stack developer portfolios.

## Color Palette Tokens

```css
:root {
  /* Background Colors */
  --bg-primary: #FAF9F5;      /* Warm off-white / ivory main background */
  --bg-surface: #F2EFE9;      /* Subtle beige/grey secondary surface */
  --bg-card: #FFFFFF;         /* Soft rounded white card background */
  --bg-card-hover: #FCFCF9;   /* Micro hover tone for cards */
  --bg-dark: #141414;         /* Soft black for inverted accent badges */

  /* Typography Colors */
  --text-primary: #141414;    /* Main headlines & strong titles */
  --text-body: #363636;       /* Body copy and descriptions */
  --text-muted: #6B6B6B;      /* Secondary text, captions & metadata */
  --text-light: #949494;      /* Eyebrow and subtle indicators */
  --text-inverse: #FAF9F5;    /* Light text on dark surfaces */

  /* Borders & Dividers */
  --border-subtle: rgba(20, 20, 20, 0.08); /* 1px thin border */
  --border-medium: rgba(20, 20, 20, 0.16);
  --border-hover: rgba(20, 20, 20, 0.35);

  /* Accents & Status */
  --accent-dot: #10B981;      /* Green live availability dot */
  --accent-badge: #EBE7DF;    /* Pill badge background */
  --accent-shadow: rgba(20, 20, 20, 0.03);
  
  /* Typography Scale */
  --font-family-base: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-display: 'Outfit', 'Plus Jakarta Sans', sans-serif;

  /* Spacing & Radii */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-smooth: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Typography Hierarchy

1. **Hero Display Heading**: `Plus Jakarta Sans` / `Outfit`, 3.5rem to 5.5rem, semi-bold (`600`), line-height 1.08, negative letter-spacing (`-0.03em`).
2. **Section Titles**: 2.25rem to 3.25rem, medium/semi-bold (`500`-`600`), negative letter-spacing (`-0.02em`).
3. **Subtitles & Eyebrow**: 0.75rem to 0.875rem, uppercase tracking (`0.1em`), muted charcoal (`--text-muted`).
4. **Body Text**: 1rem to 1.125rem, regular (`400`), line-height 1.6, `--text-body`.

## Layout Architecture

- **Generous Whitespace**: Minimum section padding `100px 0` on desktop, `60px 0` on mobile.
- **Asymmetric Editorial Layouts**: Alternating project showcase rows, offset grid cards, staggered tech badges, and clean numbered list items for archives.
- **Placeholder Visual Frames**: High-contrast, clean SVG/CSS UI wireframe placeholders allowing easy drop-in replacement with real screenshots or images.

## Replacing Placeholders with Custom Images

To replace placeholder image containers in `index.html` with your actual screenshots:
Replace the placeholder `<div class="project-img-placeholder">...</div>` with:
```html
<img src="path/to/your/image.jpg" alt="Project Name Mockup" class="project-img" />
```
