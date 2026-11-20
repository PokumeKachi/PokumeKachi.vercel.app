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
        inset: var(--header-height) 0 auto;
        z-index: 9999;

        width: 100%;
        background: var(--pico-primary);

        transform: scaleX(var(--progress));
        transform-origin: left;
        pointer-events: none;
    }
</style>
