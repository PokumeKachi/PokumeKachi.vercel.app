<script lang="ts">
    import { page } from "$app/state";
    import { HEADER_LINKS } from "$lib/content/sitemap";
</script>

<header>
    <nav aria-label="Primary">
        <a class="brand" href="/">Pokume Kachi</a>

        <ul>
            {#each HEADER_LINKS.slice(1) as [label, href]}
                <li>
                    <a
                        {href}
                        aria-current={page.url.pathname === href ? "page" : undefined}
                    >
                        {label}
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
        z-index: 10;
        border-bottom: 1px solid var(--pico-muted-border-color);
        background: var(--pico-background-color);
    }

    nav {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem 1rem;
        width: min(100% - 2rem, 52rem);
        margin-inline: auto;
        padding-block: 0.75rem;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .brand {
        font-weight: 700;
        text-decoration: none;
    }

    [aria-current="page"] {
        text-decoration: underline;
        text-underline-offset: 0.3em;
    }
</style>
