<script lang="ts">
    import { onMount, Spring, page } from "$lib";
    import getLenis from "$lib/singletons/lenis";
    import {
        PAGE_TRANSITION_DURATION,
        STAGGER_INTERVAL,
        RADIUS,
        SPRING,
        SURFACE_BLUR,
    } from "$lib/design-language";
    import MorphText from "$lib/components/MorphText.svelte";
    import { PATH_TITLES, HEADER_LINKS } from "$lib/content/sitemap";

    const entranceDuration = PAGE_TRANSITION_DURATION * 2;

    type Props = {
        navigating: boolean;
        headerHeight?: number;
    };

    let { navigating, headerHeight = $bindable(0) }: Props = $props();

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
        morphTitle(href);
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
        morphTitle(page.url.pathname);

        const update = () => {
            compact.target = (getLenis().scroll <= headerHeight && getLenis().targetScroll <= 2) ? 0 : 1;
        };

        update();

        getLenis().on("scroll", update);

        return () => getLenis().off("scroll", update);
    });
</script>

<header
    bind:clientHeight={headerHeight}
    style={`
        --transition-duration: ${entranceDuration}ms;
        --radius: ${RADIUS}rem;

        --compact: ${compact.current};

    `}
>
    <nav>
        <ul id="nav-title">
            <li>
                <div class="cluster-background" style={morphBackgroundStyle}>
                    <MorphText
                        bind:this={morphText}
                        duration={PAGE_TRANSITION_DURATION}
                    />
                </div>
            </li>
        </ul>

        <ul id="nav-links">
            <div class="cluster-background" style={morphBackgroundStyle}>
                {#each HEADER_LINKS as [name, href], i}
                    <li
                        style:animation-delay={`${
                            PAGE_TRANSITION_DURATION + i * STAGGER_INTERVAL
                        }ms`}
                    >
                        <a
                            {href}
                            class:active={activePath === href}
                            aria-current={activePath === href
                                ? "page"
                                : undefined}
                            onclick={(event) => navigate(href, event)}
                        >
                            {name}
                        </a>
                    </li>
                {/each}
            </div>
        </ul>
    </nav>
</header>

<style>
    header {
        position: fixed;
        inset: 0 0 auto;
        z-index: 100;

        width: calc(100% - 64px * var(--compact));
        margin-inline: auto;

        box-sizing: border-box;
        padding: 1rem;

        pointer-events: none;
        transform-origin: center;
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;

        min-width: 0;
        gap: 0;
    }

    #nav-title {
        display: block;
        flex: 1 1 0;

        min-width: 0;
        margin: 0;
        padding: 0;

        list-style: none;
    }

    #nav-title > li {
        width: 100%;
        min-width: 0;
        margin: 0;
        padding: 0;
    }

    .cluster-background {
        width: fit-content;
        max-width: 100%;
        min-width: 0;
        box-sizing: border-box;

        padding: 0.25rem 0.75rem;
        border: 2px solid transparent;
        border-radius: var(--radius);
    }

    li {
        animation: nav-enter var(--transition-duration) cubic-bezier(0, 1, 0, 1)
            both;
    }

    @keyframes nav-enter {
        from {
            opacity: 0;
            transform: translateY(-0.75rem);
        }
    }

    #nav-links a {
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

    #nav-links a:hover {
        border-color: var(--pico-primary-hover-border);
        text-decoration: none;
    }

    #nav-links a::after {
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

    #nav-links a.active::after {
        transform: scaleX(1);
    }

    .cluster-background,
    #nav-links,
    #nav-links a,
    #nav-links a::after {
        border-radius: var(--radius);
    }

    a {
        pointer-events: auto;
    }
</style>
