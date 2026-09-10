<script lang="ts">
    import { getContext, onMount } from "svelte";
    import type Lenis from "lenis";

    const lenisReady = getContext<Promise<Lenis>>("lenis");

    onMount(() => {
        let cleanup: (() => void) | undefined;

        lenisReady.then((lenis) => {
            const previousHtmlOverflow =
                document.documentElement.style.overflow;
            const previousBodyOverflow = document.body.style.overflow;

            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";

            lenis.stop();

            cleanup = () => {
                document.documentElement.style.overflow = previousHtmlOverflow;
                document.body.style.overflow = previousBodyOverflow;

                lenis.start();
            };
        });

        return () => {
            cleanup?.();
        };
    });
</script>

<main class="container">
    <ul>
        <li>
            <h5>
                <a href="/projects/loimon">Lối Mòn</a> - The optimally distributed
                knowledge system.
            </h5>
        </li>
    </ul>
</main>
