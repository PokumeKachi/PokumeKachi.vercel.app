<script lang="ts">
    import { onMount } from "svelte";
    import { Spring } from "svelte/motion";

    import { page } from "$app/state";
    import {
        PAGE_TRANSITION_DURATION,
        RADIUS,
        SPRING,
    } from "$lib/design-language";
    import MorphText from "$lib/components/MorphText.svelte";

    const titles: Record<string, string> = {
        "/": "Pokume Kachi.",
        "/projects": "Products, delivered.",
        "/contact": "Communication, simplified.",
        "/projects/loimon": "The one true LMS solution.",
        "/projects/ybiau": "The personal knowledge base.",
    } as const;

    const links = [
        ["Home", "/"],
        ["Projects", "/projects"],
        ["Contact", "/contact"],
    ] as const;

    let { navigating, headerHeight = $bindable(0) } = $props<{
        navigating: boolean;
        headerHeight?: number;
    }>();

    let activePath: string = $state(page.url.pathname);

    let morphText: {
        morphTo: (text: string) => void;
    };

    $effect(() => {
        activePath = page.url.pathname;
    });

    export function morphTitle(pathname: string) {
        morphText?.morphTo(titles[pathname] ?? "Pokume Kachi");
    }

    function navigate(href: string, event: MouseEvent) {
        if (navigating || href === page.url.pathname) {
            event.preventDefault();
            return;
        }

        activePath = href;
    }

    const compact = new Spring(0, SPRING);

    let viewportWidth = $state<number | null>(null);

    const headerWidth = $derived(
        viewportWidth === null
            ? "100%"
            : `${viewportWidth - 16 * compact.current}px`,
    );

    onMount(() => {
        function update() {
            viewportWidth = document.documentElement.clientWidth;
            compact.target = window.scrollY > 10 ? 1 : 0;
        }

        update();

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    });
</script>

<header
    bind:clientHeight={headerHeight}
    style={`
        --transition-duration: ${PAGE_TRANSITION_DURATION * 2}ms;
        --radius: ${RADIUS}rem;

        width: ${headerWidth};
        top: ${12 * compact.current}px;
    `}
>
    <nav>
        <ul class="nav-title">
            <li>
                <div
                    class="morph-background"
                    style={`
                        background: color-mix(
                            in srgb,
                            var(--pico-card-background-color)
                            ${60 * compact.current}%,
                            transparent
                        );

                        -webkit-backdrop-filter:
                            blur(${28 * compact.current}px)
                            saturate(${100 + 80 * compact.current}%);

                        backdrop-filter:
                            blur(${28 * compact.current}px)
                            saturate(${100 + 80 * compact.current}%);

                        border-color: color-mix(
                            in srgb,
                            var(--pico-muted-border-color)
                            ${70 * compact.current}%,
                            transparent
                        );

                        box-shadow:
                            0 ${8 * compact.current}px
                            ${28 * compact.current}px
                            color-mix(
                                in srgb,
                                var(--pico-color)
                                ${8 * compact.current}%,
                                transparent
                            ),
                            inset 0 1px 0
                            color-mix(
                                in srgb,
                                var(--pico-background-color)
                                ${12 * compact.current}%,
                                transparent
                            );
                    `}
                >
                    <MorphText
                        bind:this={morphText}
                        text={titles[page.url.pathname] ?? "Pokume Kachi"}
                        duration={PAGE_TRANSITION_DURATION}
                    />
                </div>
            </li>
        </ul>

        <ul class="nav-links">
            {#each links as [name, href], i}
                <li
                    style={`animation-delay: ${
                        PAGE_TRANSITION_DURATION * 2 +
                        i * (PAGE_TRANSITION_DURATION * 0.5)
                    }ms`}
                >
                    <a
                        {href}
                        class:active={activePath === href}
                        aria-current={activePath === href ? "page" : undefined}
                        onclick={(event) => navigate(href, event)}
                    >
                        {name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</header>

<style>
    header {
        position: sticky;
        top: 0;
        z-index: 100;

        margin-inline: auto;
        box-sizing: border-box;
        padding-inline: 1rem;
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;

        min-width: 0;
        gap: 1rem;
    }

    .nav-title {
        display: block;
        flex: 1 1 0;

        min-width: 0;
        margin: 0;
        padding: 0;

        list-style: none;
    }

    .nav-title > li {
        width: 100%;
        min-width: 0;
        margin: 0;
        padding: 0;

        animation: nav-enter-slide var(--transition-duration)
            cubic-bezier(0, 1, 0, 1) both;
    }

    @keyframes nav-enter-slide {
        from {
            transform: translateY(-0.75rem);
        }

        to {
            transform: translateY(0);
        }
    }

    .morph-background {
        width: fit-content;
        max-width: 100%;
        min-width: 0;
        box-sizing: border-box;

        padding: 0.25rem 0.75rem;
        border: 2px solid transparent;
        border-radius: var(--radius);
    }

    .nav-links {
        display: flex;
        flex: 0 0 auto;
        align-items: center;

        gap: 0;
        margin: 0;
        padding-inline: 1rem;

        list-style: none;
        white-space: nowrap;

        background: var(--pico-card-background-color);
        border: 1px solid var(--pico-muted-border-color);
    }

    .nav-links > li {
        flex: 0 0 auto;

        animation: nav-enter var(--transition-duration) cubic-bezier(0, 1, 0, 1)
            both;
    }

    @keyframes nav-enter {
        from {
            opacity: 0;
            transform: translateY(-0.75rem);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-links a {
        position: relative;
        display: inline-flex;
        align-items: center;

        padding: 0.4rem 0.65rem;

        border-style: solid;
        border-width: 1px 0 0;
        border-color: transparent;

        font-family: "Geist", sans-serif;
        font-weight: 500;

        transition: border-color var(--pico-transition);
    }

    .nav-links a:hover {
        border-color: var(--pico-primary-hover-border);
        text-decoration: none;
    }

    .nav-links a::after {
        content: "";
        position: absolute;

        left: 0;
        right: 0;
        bottom: -0.25rem;

        height: 2px;

        background: currentColor;

        transform: scaleX(0);
        transform-origin: center;

        transition: transform var(--transition-duration)
            cubic-bezier(0, 1, 0, 1);
    }

    .nav-links a.active::after {
        transform: scaleX(1);
    }

    * {
        user-select: none;
    }

    .morph-background,
    .nav-links,
    .nav-links a,
    .nav-links a::after {
        border-radius: var(--radius);
    }

    @supports (corner-shape: squircle) {
        .morph-background,
        .nav-links,
        .nav-links a,
        .nav-links a::after {
            corner-shape: squircle;
        }
    }
</style>
