<script module lang="ts">
    import getLenis from "$lib/singletons/lenis";

    let lockCount = 0;
    let savedHtml = "";
    let savedBody = "";

    export function acquireScrollLock(): () => void {
        if (lockCount++ === 0) {
            savedHtml = document.documentElement.style.overflow;
            savedBody = document.body.style.overflow;

            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";

            getLenis().stop();
        }

        let released = false;

        return () => {
            if (released) return;
            released = true;

            if (--lockCount === 0) {
                document.documentElement.style.overflow = savedHtml;
                document.body.style.overflow = savedBody;

                getLenis().start();
            }
        };
    }
</script>

<script lang="ts">
    import { onMount } from "$lib";
    onMount(acquireScrollLock);
</script>
