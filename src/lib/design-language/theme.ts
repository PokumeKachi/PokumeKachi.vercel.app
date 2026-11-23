import { TILT_MAX } from "./hero";
import { RADIUS, SCROLLBAR_THICKNESS } from "./geometry";
import { PAGE_TRANSITION_DURATION } from "./timing";
import { SURFACE_BLUR } from "./visual";

/**
 * Single source of truth for visual defaults. Values are injected as CSS
 * custom properties by the root layout, so the same numbers drive both
 * component scripts and stylesheets.
 */
export const theme = {
    radius: `${RADIUS}rem`,
    radiusSm: `${RADIUS / 2}rem`,
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    fast: "160ms",
    entrance: "700ms",
    tilt: `${TILT_MAX}deg`,
    container: "52rem",
    scrollbar: `${SCROLLBAR_THICKNESS}px`,
    blur: `${SURFACE_BLUR}px`,
    glow: "13%",
    glowAlt: "9%",
    navDelay: `${PAGE_TRANSITION_DURATION}ms`,
} as const;

export const themeStyle = `:root {
  --ui-radius: ${theme.radius};
  --ui-radius-sm: ${theme.radiusSm};
  --ui-ease: ${theme.ease};
  --ui-fast: ${theme.fast};
  --ui-entrance: ${theme.entrance};
  --ui-tilt: ${theme.tilt};
  --ui-container: ${theme.container};
  --ui-glow: ${theme.glow};
  --ui-glow-alt: ${theme.glowAlt};
}`;
