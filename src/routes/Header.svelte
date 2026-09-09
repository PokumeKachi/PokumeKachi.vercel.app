<script lang="ts">
    import { page } from "$app/state";
    import { PAGE_TRANSITION_DURATION } from "$lib/animation";
    import MorphText from "$lib/components/MorphText.svelte";

    const titles: Record<string, string> = {
        "/": "Pokume Kachi.",
        "/projects": "Products, delivered.",
        "/contact": "Communication, simplified.",
        "/loimon": "The one true LMS solution.",
    };

    let { navigating } = $props<{
        navigating: boolean;
    }>();

    let activePath = $state(page.url.pathname);

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
        if (navigating) {
            event.preventDefault();
            return;
        }

        activePath = href;
    }

    const links = [
        ["Home", "/"],
        ["Projects", "/projects"],
        ["Contact", "/contact"],
    ] as const;
</script>

<header style={`--transition-duration: ${PAGE_TRANSITION_DURATION * 2}ms`}>
    <nav>
        <ul class="nav-title">
            <li>
                <MorphText
                    bind:this={morphText}
                    text={titles[page.url.pathname] ?? "Pokume Kachi"}
                    duration={PAGE_TRANSITION_DURATION}
                />
            </li>
        </ul>

        <ul class="nav-links">
            {#each links as [name, href], i}
                <li
                    style={`animation-delay: ${PAGE_TRANSITION_DURATION * 2 + i * (PAGE_TRANSITION_DURATION * 0.5)}ms`}
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
        padding-inline: 1rem;
        z-index: 1;
    }

    .nav-title > li {
        animation: nav-enter var(--transition-duration) cubic-bezier(0, 1, 0, 1)
            both;
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
        font-family: "Geist", sans-serif;
        font-weight: 500;
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
</style>
