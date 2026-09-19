# Rule: Pure Liquid Glassmorphic Design System Preservation

## Context
This rule governs all UI button and glassmorphic surface implementations across the portfolio.

## Mandatory Implementation Requirements
1. Every glassmorphic button or surface must adhere to the **Pure Liquid Glass** standard.
2. Use `components/ui/GlassButton.tsx` or `components/ui/GlassSurface.tsx` with:
   - `displace={0.6}`
   - `distortionScale={270}`
   - `redOffset={10}`
   - `greenOffset={14}`
   - `blueOffset={2}`
   - `brightness={45}`
   - `opacity={0.43}`
   - `mixBlendMode="screen"`
   - `borderRadius={9999}` (or matching element radius)
   - `className="warm-breathe-glow ..."`
3. The warm breathing glow outline (`warm-breathe-glow`), animated amber beacon, and micro-arrow must remain intact on all primary CTA buttons.
4. Under NO circumstances should any AI model revert, downgrade, or alter the glassmorphic styling to flat opaque or milky frosted blur.
