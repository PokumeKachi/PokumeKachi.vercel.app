<script lang="ts">
    import { onNavigate } from "$app/navigation";

    let { children } = $props();

    onNavigate((navigation) => {
        if (navigation.from?.url.href === navigation.to?.url.href) {
            return;
        }

        const doc = document as Document & {
            startViewTransition?: (callback: () => Promise<void>) => unknown;
        };

        if (
            !doc.startViewTransition ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        return new Promise<void>((resolve) => {
            doc.startViewTransition!(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<div class="page-transition">
    {@render children()}
</div>

<style>
    .page-transition {
        min-width: 0;
        view-transition-name: route-content;
    }

    :global(::view-transition),
    :global(::view-transition-group(route-content)),
    :global(::view-transition-image-pair(route-content)),
    :global(::view-transition-old(route-content)),
    :global(::view-transition-new(route-content)) {
        pointer-events: none;
    }

    :global(::view-transition-group(route-content)) {
        animation-duration: 900ms;
        animation-timing-function: ease-in-out;
    }

    :global(::view-transition-image-pair(route-content)) {
        isolation: isolate;
    }

    :global(::view-transition-old(route-content)) {
        animation:
            route-exit 360ms ease-in both,
            route-fade-out 140ms ease-out both;

        transform-origin: center;
        backface-visibility: hidden;
    }

    :global(::view-transition-new(route-content)) {
        animation:
            route-enter 650ms ease-out both,
            route-fade-in 900ms ease-in-out both;

        transform-origin: center;
        backface-visibility: hidden;
    }

    @keyframes route-exit {
        from {
            transform: translateZ(0) scale(1);
            filter: blur(0);
        }

        to {
            transform: translateZ(-50px) scale(0.985);
            filter: blur(3px);
        }
    }

    @keyframes route-enter {
        from {
            transform: translateZ(-80px) scale(0.96);
            filter: blur(4px);
        }

        to {
            transform: translateZ(0) scale(1);
            filter: blur(0);
        }
    }

    @keyframes route-fade-out {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @keyframes route-fade-in {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        :global(::view-transition-group(route-content)),
        :global(::view-transition-old(route-content)),
        :global(::view-transition-new(route-content)) {
            animation: none !important;
        }
    }
</style>
