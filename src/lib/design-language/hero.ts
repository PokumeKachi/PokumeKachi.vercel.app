/** Tuning for the homepage pointer parallax and WebGL backdrop. */

export const TILT_SENSITIVITY = 0.005;
export const TILT_MAX = 5;

export const SCENE = {
    maxPixelRatio: 1.5,
    pointCount: 140,
    opacity: 0.2,
    pointOpacity: 0.3,
    spin: Math.PI * 3,
    swing: 3,
    pointer: 0.8,
} as const;
