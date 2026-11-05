<script lang="ts">
    import { getContext, onMount } from "svelte";
    import type Lenis from "lenis";

    const lenisReady = getContext<Promise<Lenis>>("lenis");

    onMount(() => {
        let active = true;
        let instance: Lenis | undefined;

        let previousHtmlOverflow = "";
        let previousBodyOverflow = "";

        lenisReady.then((lenis) => {
            if (!active) return;

            instance = lenis;

            previousHtmlOverflow = document.documentElement.style.overflow;
            previousBodyOverflow = document.body.style.overflow;

            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";

            lenis.stop();
        });

        return () => {
            active = false;

            if (!instance) return;

            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.overflow = previousBodyOverflow;

            instance.start();
        };
    });
</script>
