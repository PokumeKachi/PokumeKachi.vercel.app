import { PAGE_INTRODUCTION_DURATION, PAGE_TRANSITION_DURATION } from "./timing";

type AnimationVariant = {
    keyframes: Keyframe[];
    options: KeyframeAnimationOptions;
};

const visible = { transform: "translateY(0)", opacity: 1, filter: "blur(0)" };
const above = {
    transform: "translateY(50dvh)",
    opacity: 0,
    filter: "blur(8px)",
};
const below = {
    transform: "translateY(-50dvh)",
    opacity: 0,
    filter: "blur(8px)",
};

const options = (duration: number, easing: string): KeyframeAnimationOptions => ({
    duration,
    easing,
    fill: "forwards",
});

export const pageAnimation = {
    intro: {
        keyframes: [above, visible],
        options: options(PAGE_INTRODUCTION_DURATION, "cubic-bezier(0, 1, 0, 1)"),
    },
    enter: {
        keyframes: [above, visible],
        options: options(PAGE_TRANSITION_DURATION, "cubic-bezier(0, 1, 0, 1)"),
    },
    exit: {
        keyframes: [visible, below],
        options: options(PAGE_TRANSITION_DURATION, "cubic-bezier(1, 0, 0, 1)"),
    },
} satisfies Record<string, AnimationVariant>;

export const headerAnimation = {
    keyframes: [
        { transform: "translateY(-100%)" },
        { transform: "translateY(0)" },
    ],
    options: options(PAGE_INTRODUCTION_DURATION, "cubic-bezier(0, 1, 0, 1)"),
} satisfies AnimationVariant;
