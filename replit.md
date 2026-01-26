# Maicol Parker-Chavez Portfolio Website

## Overview

This is a personal portfolio website for an Enterprise AI Strategist. The site showcases professional case studies and work experience through a modern, grid-based design. It's a static website with multiple HTML pages for the main portfolio and individual case study pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static HTML/CSS Website**
- The site uses vanilla HTML, CSS, and minimal JavaScript
- No frontend framework or build system - files are served directly
- Tailwind CSS is loaded via CDN for utility-first styling
- Custom CSS in `styles.css` handles grid layouts, typography, and design tokens

**Design System**
- CSS custom properties (variables) define the color palette and spacing
- Three-font system: Inter Tight (headings), Playfair Display (accents), Space Mono (monospace)
- 12-column grid system for layout with responsive breakpoints
- Lucide icons loaded via unpkg CDN

**Page Structure**
- `index.html` - Main portfolio landing page
- `capital-group.html` - Case study page
- `innovation-sprints.html` - Case study page  
- `strategy-horizon.html` - Case study page

### Responsive Design (Updated)

**Mobile-first breakpoints:**
- Extra small: 390px and below
- Mobile: up to 639px
- Tablet: 640px - 1023px
- Desktop: 1024px and up

**Mobile Responsiveness Features:**
- `overflow-x: hidden` on html/body prevents horizontal scrolling
- All text elements have `word-wrap: break-word` for proper text wrapping
- Project cards stack vertically (single column) under 1024px
- All hover effects wrapped in `@media (hover: hover)` to disable on touch devices
- Footer CTA "Let's Talk" is prominently sized: 3.5rem on mobile, 4.5rem on tablet
- Hero headline: 2.25rem minimum on mobile with 900 weight
- Project card headlines: 2rem minimum on mobile with 700 weight
- Footer navigation stacks vertically on mobile with touch-friendly 44px targets

### External Dependencies

**CDN Resources**
- Tailwind CSS - Utility-first CSS framework loaded from cdn.tailwindcss.com
- Google Fonts - Inter Tight, Playfair Display, Space Mono font families
- Lucide Icons - Icon library loaded from unpkg.com

### No Database
- This is a purely static site with no data persistence layer
- All content is hardcoded in HTML files

## Recent Changes

**January 26, 2026 - Mobile Responsiveness Fixes**
- Added overflow-x: hidden to html/body to prevent horizontal scrolling
- Implemented proper grid stacking for mobile (grid-template-columns: 1fr under 1024px)
- Wrapped all hover effects in @media (hover: hover) for touch device compatibility
- Improved typography hierarchy for mobile (larger CTA, bolder headlines)
- Added tablet-specific styles (640-1023px)
- Added touch-friendly targets (44px minimum height for links/buttons)
