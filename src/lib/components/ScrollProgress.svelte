<script lang="ts">
    import { onMount } from "svelte";
    import getLenis from "$lib/singletons/lenis";
    import { SCROLLBAR_THICKNESS } from "$lib/design-language/geometry";

    let progress = $state(0);

    onMount(() => {
        const update = () => (progress = getLenis().progress);
        update();
        getLenis().on("scroll", update);
        return () => getLenis().off("scroll", update);
    });
</script>

<div
    class="scroll-progress"
    style:transform={`scaleX(${progress})`}
    style:height={`${SCROLLBAR_THICKNESS}px`}
    aria-hidden="true"
></div>

<style>
    .scroll-progress {
        position: sticky;
        inset: 0 0 auto;
        z-index: 9999;

        width: 100%;

        background: var(--pico-primary);
        transform-origin: left;
        pointer-events: none;
    }
</style>
