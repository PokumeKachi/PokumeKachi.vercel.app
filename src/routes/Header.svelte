<script lang="ts">
    import { page } from "$app/state";
    import { HEADER_LINKS } from "$lib/content/sitemap";
</script>

<header class="container glow">
    <nav aria-label="Primary">
        <ul>
            <li>
                <a
                    href="/"
                    aria-current={page.url.pathname === "/"
                        ? "page"
                        : undefined}
                >
                    <strong>Pokume Kachi</strong>
                </a>
            </li>

            {#each HEADER_LINKS.slice(1) as [label, href]}
                <li>
                    <a
                        {href}
                        aria-current={page.url.pathname === href ||
                        (href !== "/" &&
                            page.url.pathname.startsWith(`${href}/`))
                            ? "page"
                            : undefined}
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
        background-color: #ffffff;
    }
</style>
