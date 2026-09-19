# Glassmorphic Design System — Permanent Rules & Preservation

> **CRITICAL ARCHITECTURAL DIRECTIVE — DO NOT MODIFY OR OVERRIDE**
>
> The liquid glassmorphic design system in this repository is **permanently locked**.
> Under no circumstances may any AI assistant replace, simplify, dull, or alter the glassmorphic styling, displacement parameters, or warm breathing glow of buttons and surfaces.
> Whenever adding new buttons or glass surfaces in the future, you **MUST** consume these exact specifications.

---

## 1. The Pure Liquid Glassmorphic Specification

All primary CTA buttons and interactive glass surfaces must adhere to the following exact configuration:

### A. Displacement & Chromatic Aberration Props (`GlassSurface`)
```tsx
import GlassSurface from '@/components/ui/GlassSurface';
// OR import GlassButton from '@/components/ui/GlassButton';

<GlassSurface
  displace={0.6}
  distortionScale={270}
  redOffset={10}
  greenOffset={14}
  blueOffset={2}
  brightness={45}
  opacity={0.43}
  mixBlendMode="screen"
  borderRadius={9999}
  className="warm-breathe-glow ..."
>
  ...
</GlassSurface>
```

### B. Core Material Anatomy (`components/ui/GlassSurface.tsx`)
1. **Multi-Stop Crystal Refraction Gradient**:
   `linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.02) 42%, rgba(245, 158, 11, 0.04) 75%, rgba(255, 255, 255, 0.09) 100%)`
   - High optical clarity (NOT flat opaque/frosted white like `rgba(255, 255, 255, 0.08)`).
2. **Optical Refraction Backdrop Filter**:
   `blur(16px) saturate(190%) brightness(1.15) contrast(102%)`
   - Supported across all platforms via CSS feature detection.
3. **Physical Specular Highlights (Apple / VisionOS Sheen)**:
   - **Curved upper glaze**: `linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%)` on top 50% of the button.
   - **Razor-thin 1px top highlight rim**: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.85) 50%, transparent 100%)`.

### C. Warm Breathing Glow Outline (`app/globals.css`)
Keyframe `@keyframes warm-breathe` and class `.warm-breathe-glow`:
- Blends an outer breathing amber aura (`box-shadow: 0 0 22px 6px rgba(245, 158, 11, 0.45)`) with an inner razor-sharp glass bevel highlight (`inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.95)` and `inset 0 -1px 1px 0 rgba(255, 255, 255, 0.25)`).
- Border: `rgba(245, 158, 11, 0.55)` pulsing to `rgba(251, 191, 36, 0.95)`.

### D. Interactive Button Elements
1. **Pulsating Amber Beacon**:
   ```tsx
   <span className="relative flex h-2.5 w-2.5">
     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_10px_#F59E0B]" />
   </span>
   ```
2. **Micro-Arrow**:
   `<ArrowUpRight className="w-4 h-4 text-amber-500/85 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400" />`
3. **Typography**:
   `font-dmSans font-semibold text-ink tracking-wide group-hover:text-amber-400`
4. **Magnetic wrapper**:
   Wrap button in `<Magnetic>` for smooth cursor attraction.

---

## 2. Standardized Component for All Future Buttons

Whenever creating any new button in this codebase, **always use `GlassButton`**:
```tsx
import GlassButton from '@/components/ui/GlassButton';

// Standard action button:
<GlassButton onClick={handleClick}>
  Explore More
</GlassButton>

// Link button:
<GlassButton href="/demo" target="_blank" rel="noopener noreferrer">
  View Live Demo
</GlassButton>
```

---

## 3. Strict Prohibitions
- **NEVER** replace this design with standard flat Tailwind classes like `bg-primary`, `bg-white/10`, or generic frosted blurs.
- **NEVER** remove the warm breathing glow (`warm-breathe-glow`), amber beacon, or micro-arrow from primary CTA buttons.
- **NEVER** alter the three existing CTA buttons:
  1. `Hero.tsx`: "See My Work"
  2. `Hero.tsx`: "Get in Touch"
  3. `Contact.tsx`: "Send Me a Mail"
