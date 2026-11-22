<script lang="ts">
    import { onMount, Spring } from "$lib";
    import getLenis from "$lib/singletons/lenis";
    import { SPRING } from "$lib/design-language";
    import { SCROLLBAR_THICKNESS } from "$lib/design-language/geometry";

    const progress = new Spring(0, SPRING);

    onMount(() => {
        const lenis = getLenis();

        const update = () => {
            const limit = lenis.limit;
            const scroll = lenis.targetScroll;

            progress.target =
                Number.isFinite(limit) && Number.isFinite(scroll) && limit > 0
                    ? Math.min(1, Math.max(0, scroll / limit))
                    : 0;
        };

        let resizeFrame = 0;

        const handleResize = () => {
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(update);
        };

        update();

        lenis.on("scroll", update);
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            lenis.off("scroll", update);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(resizeFrame);
        };
    });
</script>

<div
    class="scroll-progress"
    style:--progress={Math.min(1, Math.max(0, progress.current))}
    style:--progress-thickness={`${SCROLLBAR_THICKNESS}px`}
    aria-hidden="true"
>
    <div class="progress-track">
        <div class="progress-fill"></div>
    </div>

    <div class="progress-endpoint"></div>
</div>

<style>
    .scroll-progress {
        --endpoint-size: 6px;
        --endpoint-inset: 3px;

        position: fixed;
        inset: env(safe-area-inset-top, 0px) 0 auto;
        z-index: 9999;

        width: 100%;
        height: var(--progress-thickness);
    }

    .progress-track {
        position: absolute;
        inset-inline: 0;
        top: 50%;

        height: 100%;

        transform: translateY(-50%);

        background: color-mix(
            in srgb,
            var(--pico-muted-border-color) 35%,
            transparent
        );

        border-radius: 999px;
    }

    .progress-fill {
        position: absolute;
        inset: 0;

        overflow: hidden;
        border-radius: 0 999px 999px 0;

        background: linear-gradient(
            90deg,
            var(--pico-primary-hover) 0%,
            var(--pico-primary) 55%,
            var(--pico-primary-background) 100%
        );

        box-shadow:
            0 0 0.35rem var(--pico-primary-focus),
            0 0 0.75rem var(--pico-primary-underline);

        transform: scaleX(var(--progress));
        transform-origin: left center;

        will-change: transform;
    }

    /* Animated sheen, clipped to the fill */
    .progress-fill::before {
        content: "";

        position: absolute;
        inset: 0 auto 0 0;
        width: 35%;
        height: 100%;

        background: linear-gradient(
            90deg,
            transparent,
            rgb(255 255 255 / 35%),
            transparent
        );

        transform: translateX(-120%);
        animation: progress-sheen 1s ease-in-out infinite;
    }

    @keyframes progress-sheen {
        0% {
            transform: translateX(-120%);
            opacity: 0;
        }

        15% {
            opacity: 1;
        }

        65% {
            opacity: 1;
        }

        100% {
            transform: translateX(300%);
            opacity: 0;
        }
    }

    /* Independent, fixed-size endpoint */
    .progress-endpoint {
        position: absolute;
        top: 50%;
        left: clamp(
            var(--endpoint-inset),
            calc(var(--progress) * 100%),
            calc(100% - var(--endpoint-inset))
        );

        width: var(--endpoint-size);
        height: var(--endpoint-size);

        border-radius: 50%;
        background: white;

        transform: translate(-50%, -50%);

        box-shadow:
            0 0 4px 1px var(--pico-primary),
            0 0 10px 2px var(--pico-primary-focus);
    }

    /* Touch screens */
    @media (pointer: coarse) {
        .scroll-progress {
            --endpoint-size: 7px;
            --endpoint-inset: 3.5px;

            height: var(--progress-thickness);
        }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
        .progress-fill::before {
            animation: none;
            display: none;
        }
    }
</style>
