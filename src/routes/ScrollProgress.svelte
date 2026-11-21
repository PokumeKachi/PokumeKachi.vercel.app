<script lang="ts">
    import { onMount, Spring } from "$lib";
    import getLenis from "$lib/singletons/lenis";
    import { SPRING } from "$lib/design-language";
    import { SCROLLBAR_THICKNESS } from "$lib/design-language/geometry";

    const progress = new Spring(0, SPRING);

    onMount(() => {
        const lenis = getLenis();

        const update = () => {
            progress.target =
                lenis.limit > 0
                    ? Math.min(1, Math.max(0, lenis.targetScroll / lenis.limit))
                    : 0;
        };

        update();

        lenis.on("scroll", update);

        return () => lenis.off("scroll", update);
    });
</script>

<div
    id="scroll-progress"
    style:--progress={Math.min(1, Math.max(0, progress.current))}
    style:height={`${SCROLLBAR_THICKNESS}px`}
    aria-hidden="true"
></div>

<style>
    #scroll-progress {
        position: fixed;
        inset: 0 0 auto;
        z-index: 9999;

        width: 100%;

        background: linear-gradient(
            90deg,
            var(--pico-primary-hover) 0%,
            var(--pico-primary) 55%,
            var(--pico-primary-background) 100%
        );

        border-radius: 0 var(--pico-border-radius) var(--pico-border-radius) 0;

        box-shadow:
            0 0 0.35rem var(--pico-primary-focus),
            0 0 0.75rem var(--pico-primary-underline);

        transform: scaleX(var(--progress));
        transform-origin: left;
        will-change: transform;
        pointer-events: none;
    }
</style>
