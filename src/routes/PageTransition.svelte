<script lang="ts">
    import { onNavigate } from "$app/navigation";

    let { children } = $props();

    let pageContent: HTMLDivElement;

    onNavigate((navigation) => {
        if (navigation.from?.url.href === navigation.to?.url.href) {
            return;
        }

        const startViewTransition =
            pageContent?.startViewTransition?.bind(pageContent) ??
            document.startViewTransition?.bind(document);

        if (
            !startViewTransition ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const direction =
            navigation.type === "popstate" &&
            navigation.delta !== undefined &&
            navigation.delta < 0
                ? "back"
                : "forward";

        document.documentElement.dataset.navigationDirection = direction;

        return new Promise<void>((resolve) => {
            startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<svelte:head>
    <style>
        :root {
            --route-duration: 420ms;
            --route-easing: cubic-bezier(0.22, 1, 0.36, 1);
            --route-exit-duration: 180ms;

            view-transition-name: none;
        }

        .page-transition {
            min-width: 0;
            view-transition-name: route-content;
        }

        ::view-transition,
        ::view-transition-group(*),
        ::view-transition-image-pair(*),
        ::view-transition-old(*),
        ::view-transition-new(*) {
            pointer-events: none !important;
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
            animation: none !important;
        }

        ::view-transition-group(route-content) {
            animation-duration: var(--route-duration);
            animation-timing-function: var(--route-easing);
        }

        ::view-transition-image-pair(route-content) {
            isolation: isolate;
        }

        ::view-transition-old(route-content) {
            animation: route-exit var(--route-exit-duration)
                cubic-bezier(0.4, 0, 1, 1) both;

            backface-visibility: hidden;
        }

        ::view-transition-new(route-content) {
            animation: route-enter var(--route-duration) var(--route-easing)
                both;

            backface-visibility: hidden;
        }

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

        html[data-navigation-direction="back"]
            ::view-transition-old(route-content) {
            animation-name: route-exit-back;
        }

        html[data-navigation-direction="back"]
            ::view-transition-new(route-content) {
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

        @media (prefers-reduced-motion: reduce) {
            ::view-transition-group(route-content),
            ::view-transition-old(route-content),
            ::view-transition-new(route-content) {
                animation: none !important;
            }
        }
    </style>
</svelte:head>

<div class="page-transition" bind:this={pageContent}>
    {@render children()}
</div>
