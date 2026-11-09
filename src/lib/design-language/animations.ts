import { PAGE_TRANSITION_DURATION, PAGE_INTRODUCTION_DURATION } from "./timing";

type AnimationVariant = {
    keyframes: Keyframe[];
    options: KeyframeAnimationOptions;
};

const defaultPage = {
    transform: "translateY(0)",
    opacity: 1,
    filter: "blur(0)",
};

const offscreenTop = {
    transform: "translateY(50vh)",
    opacity: 0,
    filter: "blur(16px)",
};

const offscreenBottom = {
    transform: "translateY(-50vh)",
    opacity: 0,
    filter: "blur(16px)",
};

export const pageAnimation = {
    intro: {
        keyframes: [offscreenTop, defaultPage],
        options: {
            duration: PAGE_INTRODUCTION_DURATION,
            easing: "cubic-bezier(0, 1, 0, 1)",
            fill: "forwards" as FillMode,
        },
    },

    enter: {
        keyframes: [offscreenTop, defaultPage],
        options: {
            duration: PAGE_TRANSITION_DURATION,
            easing: "cubic-bezier(0, 1, 0, 1)",
            fill: "forwards" as FillMode,
        },
    },

    exit: {
        keyframes: [defaultPage, offscreenBottom],
        options: {
            duration: PAGE_TRANSITION_DURATION,
            easing: "cubic-bezier(1, 0, 0, 1)",
            fill: "forwards" as FillMode,
        },
    },
} satisfies Record<string, AnimationVariant>;

export const headerAnimation = {
    keyframes: [
        { transform: "translateY(-100%)" },
        { transform: "translateY(0)" },
    ],
    options: {
        duration: PAGE_INTRODUCTION_DURATION,
        easing: "cubic-bezier(0, 1, 0, 1)",
        fill: "forwards" as FillMode,
    },
} satisfies AnimationVariant;
