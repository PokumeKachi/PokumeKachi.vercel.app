<script module lang="ts">
    import { browser } from "$app/environment";
    import type Lenis from "lenis";
    import getLenis from "$lib/singletons/lenis";

    let lockCount = 0;
    let savedHtml = "";
    let savedBody = "";
    let instance: Lenis | undefined;

    export function acquireScrollLock(): () => void {
        if (lockCount === 0) {
            instance = getLenis();
            savedHtml = document.documentElement.style.overflow;
            savedBody = document.body.style.overflow;

            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";

            instance.stop();
        }

        lockCount++;

        return () => {
            if (--lockCount === 0 && instance) {
                document.documentElement.style.overflow = savedHtml;
                document.body.style.overflow = savedBody;
                instance.start();
                instance = undefined;
            }
        };
    }

    if (import.meta.hot) {
        import.meta.hot.dispose(() => {
            if (!browser || lockCount === 0 || !instance) return;

            document.documentElement.style.overflow = savedHtml;
            document.body.style.overflow = savedBody;
            instance.start();

            lockCount = 0;
            instance = undefined;
        });
    }
</script>

<script lang="ts">
    import { onMount } from "svelte";

    onMount(acquireScrollLock);
</script>
