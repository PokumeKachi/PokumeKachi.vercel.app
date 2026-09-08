<script lang="ts">
    import { page } from "$app/state";
    import { PAGE_TRANSITION_DURATION } from "$lib/animation";

    let { navigating } = $props();

    let activePath = $state(page.url.pathname);

    $effect(() => {
        activePath = page.url.pathname;
    });

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

<header
    class="container"
    style={`--transition-duration: ${PAGE_TRANSITION_DURATION * 2}ms`}
>
    <nav>
        <ul class="nav-title">
            <li>
                <h1>Pokume Kachi</h1>
            </li>
        </ul>

        <!-- Key the list so it re‑renders when the URL changes -->
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
                        <em>{name}</em>
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</header>

<style>
    .nav-title > li {
        animation: nav-enter var(--transition-duration) cubic-bezier(0, 1, 0, 1)
            both;
        animation-delay: 0ms;
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
