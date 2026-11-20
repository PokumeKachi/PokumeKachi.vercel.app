<script module lang="ts">
    import getLenis from "$lib/singletons/lenis";

    let lockCount = 0;
    let releaseLock: (() => void) | undefined;

    export function acquireScrollLock(): () => void {
        if (lockCount++ === 0) {
            const { documentElement: html, body } = document;
            const savedHtml = html.style.overflow;
            const savedBody = body.style.overflow;

            html.style.overflow = "hidden";
            body.style.overflow = "hidden";
            getLenis().stop();

            releaseLock = () => {
                html.style.overflow = savedHtml;
                body.style.overflow = savedBody;
                getLenis().start();
                releaseLock = undefined;
            };
        }

        let released = false;

        return () => {
            if (released) return;
            released = true;

            if (--lockCount === 0) releaseLock?.();
        };
    }
</script>

<script lang="ts">
    import { onMount } from "$lib";
    onMount(acquireScrollLock);
</script>
