<script lang="ts">
    import { page } from "$app/state";
    import { HEADER_LINKS } from "$lib/content/sitemap";
</script>

<header class="container">
    <nav aria-label="Primary">
        <h2><a class="brand" href="/">Pokume Kachi</a></h2>

        <ul>
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
    [aria-current="page"] {
        text-decoration: underline;
    }
</style>
