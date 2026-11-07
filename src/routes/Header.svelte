<script lang="ts">
    import { onMount } from "svelte";
    import { Spring } from "svelte/motion";

    import { page } from "$app/state";

    import {
        PAGE_TRANSITION_DURATION,
        STAGGER_INTERVAL,
        RADIUS,
        SPRING,
        SURFACE_BLUR,
        MorphText,
    } from "$lib";
    import { PATH_TITLES, HEADER_LINKS } from "$lib/content/sitemap";

    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    const entranceDuration = PAGE_TRANSITION_DURATION * 2;

    let { navigating, headerHeight = $bindable(0) } = $props<{
        navigating: boolean;
        headerHeight?: number;
    }>();

    let activePath: string = $state(page.url.pathname);

    let morphText:
        | {
              morphTo: (text: string) => void;
          }
        | undefined;

    $effect(() => {
        activePath = page.url.pathname;
    });

    export function morphTitle(pathname: string) {
        morphText?.morphTo(PATH_TITLES[pathname] ?? PATH_TITLES["/"]);
    }

    function navigate(href: string, event: MouseEvent) {
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        )
            return;

        if (navigating || href === page.url.pathname) {
            event.preventDefault();
            return;
        }

        activePath = href;
    }

    const compact = new Spring(0, SPRING);

    const morphBackgroundStyle = $derived(`
        background: color-mix(
            in srgb,
            var(--pico-card-background-color)
            ${60 * compact.current}%,
            transparent
        );

        -webkit-backdrop-filter:
            blur(${SURFACE_BLUR * compact.current}px)
            saturate(${100 + 80 * compact.current}%);

        backdrop-filter:
            blur(${SURFACE_BLUR * compact.current}px)
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
    `);

    onMount(() => {
        function update() {
            compact.target = window.scrollY > 10 ? 1 : 0;
        }

        update();
        morphTitle(page.url.pathname);

        window.addEventListener("scroll", update, { passive: true });

        return () => {
            window.removeEventListener("scroll", update);
        };
    });
</script>

<header
    bind:clientHeight={headerHeight}
    style={`
        --transition-duration: ${entranceDuration}ms;
        --radius: ${RADIUS}rem;

        --compact: ${compact.current};

        width: calc(100% - 16px * var(--compact));
        top: calc(12px * var(--compact));
    `}
>
    <nav>
        <ul class="nav-title">
            <li
                in:fly={{
                    y: -12,
                    duration: entranceDuration,
                    easing: cubicOut,
                }}
            >
                <div class="morph-background" style={morphBackgroundStyle}>
                    <MorphText
                        bind:this={morphText}
                        duration={PAGE_TRANSITION_DURATION}
                    />
                </div>
            </li>
        </ul>

        <ul class="nav-links">
            {#each HEADER_LINKS as [name, href], i}
                <li
                    style={`animation-delay: ${
                        PAGE_TRANSITION_DURATION + i * STAGGER_INTERVAL
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
        gap: 0;
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
        background: var(--pico-card-background-color);
        border: 1px solid var(--pico-muted-border-color);
    }

    .nav-links > li {
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
