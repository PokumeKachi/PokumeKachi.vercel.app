
<script lang="ts">
    import { onNavigate } from "$app/navigation";

    let { children } = $props();

    onNavigate((navigation) => {
        if (navigation.from?.url.href === navigation.to?.url.href) {
            return;
        }

        const doc = document as Document & {
            startViewTransition?: (
                callback: () => Promise<void>,
            ) => unknown;
        };

        if (
            !doc.startViewTransition ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        // Reverse the transition when navigating backward.
        const direction =
            navigation.type === "popstate" &&
            navigation.delta !== undefined &&
            navigation.delta < 0
                ? "back"
                : "forward";

        document.documentElement.dataset.navigationDirection = direction;

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
    :global(:root) {
        --route-duration: 420ms;
        --route-easing: cubic-bezier(0.22, 1, 0.36, 1);
        --route-exit-duration: 180ms;
    }

    .page-transition {
        min-width: 0;
        view-transition-name: route-content;
    }

    /* =========================================
       VIEW TRANSITION BASE
       ========================================= */

    :global(::view-transition) {
        pointer-events: none;
    }

    :global(::view-transition-group(route-content)),
    :global(::view-transition-image-pair(route-content)),
    :global(::view-transition-old(route-content)),
    :global(::view-transition-new(route-content)) {
        pointer-events: none;
    }

    :global(::view-transition-group(route-content)) {
        animation-duration: var(--route-duration);
        animation-timing-function: var(--route-easing);
    }

    :global(::view-transition-image-pair(route-content)) {
        isolation: isolate;
    }

    /* =========================================
       OUTGOING PAGE
       ========================================= */

    :global(::view-transition-old(route-content)) {
        animation: route-exit var(--route-exit-duration)
            cubic-bezier(0.4, 0, 1, 1) both;

        backface-visibility: hidden;
    }

    /* =========================================
       INCOMING PAGE
       ========================================= */

    :global(::view-transition-new(route-content)) {
        animation: route-enter var(--route-duration)
            var(--route-easing) both;

        backface-visibility: hidden;
    }

    /* =========================================
       FORWARD NAVIGATION
       ========================================= */

    @keyframes route-exit {
        from {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }

        to {
            opacity: 0;
            transform: translate3d(0, -8px, 0) scale(0.995);
        }
    }

    @keyframes route-enter {
        from {
            opacity: 0;
            transform: translate3d(0, 12px, 0) scale(0.995);
        }

        to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    /* =========================================
       BACKWARD NAVIGATION
       ========================================= */

    :global(html[data-navigation-direction="back"]::view-transition-old(route-content)) {
        animation-name: route-exit-back;
    }

    :global(html[data-navigation-direction="back"]::view-transition-new(route-content)) {
        animation-name: route-enter-back;
    }

    @keyframes route-exit-back {
        from {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }

        to {
            opacity: 0;
            transform: translate3d(0, 8px, 0) scale(0.995);
        }
    }

    @keyframes route-enter-back {
        from {
            opacity: 0;
            transform: translate3d(0, -12px, 0) scale(0.995);
        }

        to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    /* =========================================
       REDUCED MOTION
       ========================================= */

    @media (prefers-reduced-motion: reduce) {
        :global(::view-transition-group(route-content)),
        :global(::view-transition-old(route-content)),
        :global(::view-transition-new(route-content)) {
            animation: none !important;
        }
    }
</style>
