<script lang="ts">
    import "@picocss/pico/css/pico.css";
    import "./layout.css";

    import Lenis from "lenis";

    import { onMount, setContext } from "svelte";
    import { onNavigate } from "$app/navigation";

    import {
        PAGE_INTRODUCTION_DURATION,
        PAGE_TRANSITION_DURATION,
        LENIS_LERP,
    } from "$lib/animation";

    import Header from "./Header.svelte";

    let resolveLenis: (lenis: Lenis) => void;

    const lenisReady = new Promise<Lenis>((resolve) => {
        resolveLenis = resolve;
    });

    setContext("lenis", lenisReady);

    const defaultPage = {
        transform: "translateY(0)",
        opacity: 1,
        filter: "blur(0)",
    };

    const pageAnimation = {
        enter: {
            keyframes: [
                {
                    transform: "translateY(50vh)",
                    opacity: 0,
                    filter: "blur(16px)",
                },
                defaultPage,
            ],
            options: {
                duration: PAGE_TRANSITION_DURATION,
                easing: "cubic-bezier(0, 1, 0, 1)",
                fill: "forwards" as FillMode,
            },
        },

        exit: {
            keyframes: [
                defaultPage,
                {
                    transform: "translateY(-50vh)",
                    opacity: 0,
                    filter: "blur(16px)",
                },
            ],
            options: {
                duration: PAGE_TRANSITION_DURATION,
                easing: "cubic-bezier(1, 0, 0, 1)",
                fill: "forwards" as FillMode,
            },
        },
    };

    const headerAnimation = {
        keyframes: [
            { transform: "translateY(-100%)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 },
        ],
        options: {
            duration: PAGE_INTRODUCTION_DURATION,
            easing: "cubic-bezier(0, 1, 0, 1)",
            fill: "forwards" as FillMode,
        },
    };

    let { children } = $props();

    let navigating = $state(false);
    let introStarted = $state(false);

    $effect(() => {
        if (navigating) {
            document.documentElement.classList.add("navigating");
        } else {
            document.documentElement.classList.remove("navigating");
        }
    });

    let header: {
        morphTitle: (pathname: string) => void;
    };

    function animatePage(
        animation: typeof pageAnimation.enter,
        duration = animation.options.duration,
    ) {
        const page = document.querySelector<HTMLElement>(".page");
        if (!page) return;

        page.getAnimations().forEach((a) => a.cancel());

        return page.animate(animation.keyframes, {
            ...animation.options,
            duration,
        });
    }

    onMount(() => {
        const lenis = new Lenis({
            lerp: LENIS_LERP,
            autoRaf: true,
        });

        resolveLenis(lenis);

        animatePage(pageAnimation.enter, PAGE_INTRODUCTION_DURATION);

        const headerElement = document.querySelector<HTMLElement>("header");

        headerElement?.animate(
            headerAnimation.keyframes,
            headerAnimation.options,
        );

        requestAnimationFrame(() => {
            introStarted = true;
        });

        return () => {
            lenis.destroy();
        };
    });

    onNavigate((navigation) => {
        const from = navigation.from?.url.pathname;
        const to = navigation.to?.url.pathname;

        if (to === from) return;

        navigating = true;

        header?.morphTitle(to ?? "/");

        const exit = animatePage(pageAnimation.exit);

        if (!exit) {
            navigating = false;
            return;
        }

        return exit.finished.then(() => () => {
            animatePage(pageAnimation.enter);
            navigating = false;
        });
    });
</script>

<svelte:head>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" sizes="any" />

    <title>Pokume Kachi</title>
    <meta name="description" content="Crazy good website innit?" />

    <meta property="og:title" content="Pokume Kachi" />
    <meta
        property="og:description"
        content="Student and programmer from Vietnam."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://pokumekachi.vercel.app" />
</svelte:head>

<div class:loaded={introStarted} class="loading-overlay"></div>

<Header bind:this={header} {navigating} />

<div class="page">
    {@render children()}
</div>

<style>
    :global(html) {
        scrollbar-width: none;
    }

    :global(html::-webkit-scrollbar) {
        display: none;
    }

    :global(html.navigating),
    :global(html.navigating *) {
        cursor: wait !important;
    }

    .page {
        min-height: 100vh;
        transform-origin: center;
    }

    .loading-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;

        background: var(--pico-background-color);

        pointer-events: auto;
    }

    .loading-overlay.loaded {
        display: none;
    }
</style>
