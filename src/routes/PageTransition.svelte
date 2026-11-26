<script lang="ts">
    import { onNavigate } from "$app/navigation";

    let { children } = $props();

    let pageContent: HTMLDivElement;

    onNavigate((navigation) => {
        if (
            !pageContent ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            !document.startViewTransition ||
            navigation.from?.url.href === navigation.to?.url.href
        ) {
            return;
        }

        const direction =
            navigation.type === "popstate" &&
            (navigation.delta ?? 0) < 0
                ? "back"
                : "forward";

        document.documentElement.dataset.navigationDirection = direction;

        return new Promise<void>((resolve) => {
            const transition = document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });

            transition.finished.then(
                () => {
                    delete document.documentElement.dataset.navigationDirection;
                },
                () => {
                    delete document.documentElement.dataset.navigationDirection;
                },
            );
        });
    });
</script>

<svelte:head>
    <style>
        :root {
            --route-transition: var(--pico-transition, 0.2s ease-in-out);
            --route-exit-transition: var(--pico-transition, 0.2s ease-in-out);

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
            animation: var(--route-transition);
        }

        ::view-transition-image-pair(route-content) {
            isolation: isolate;
        }

        ::view-transition-old(route-content) {
            animation: route-exit var(--route-exit-transition) both;
        }

        ::view-transition-new(route-content) {
            animation: route-enter var(--route-transition) both;
        }

        @keyframes route-exit {
            to {
                opacity: 0;
                transform: translateY(-8px) scale(0.995);
            }
        }

        @keyframes route-enter {
            from {
                opacity: 0;
                transform: translateY(12px) scale(0.995);
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
            to {
                opacity: 0;
                transform: translateY(8px) scale(0.995);
            }
        }

        @keyframes route-enter-back {
            from {
                opacity: 0;
                transform: translateY(-12px) scale(0.995);
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
