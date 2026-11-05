<script lang="ts">
    import { onMount, getContext } from "svelte";
    import Lenis from "lenis";

    const lenis = getContext<Promise<Lenis>>("lenis");

    let progress = $state(0);

    onMount(() => {
        let instance: Lenis | undefined;
        let active = true;

        const update = (lenis: Lenis) => {
            progress = lenis.progress;
        };

        lenis.then((value) => {
            if (!active) return;

            instance = value;
            update(value);
            value.on("scroll", update);
        });

        return () => {
            active = false;
            instance?.off("scroll", update);
        };
    });
</script>

<div
    class="scroll-progress"
    style:transform={`scaleX(${progress})`}
    aria-hidden="true"
/>

<style>
    .scroll-progress {
        position: sticky;
        inset: 0 0 auto;
        z-index: 9999;

        width: 100%;
        height: 5px;

        background: var(--pico-primary);
        transform-origin: left;
        pointer-events: none;
    }
</style>
