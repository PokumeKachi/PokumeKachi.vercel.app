<script lang="ts">
    import { page } from "$app/state";
    import { HEADER_LINKS } from "$lib/content/sitemap";
</script>

<header class="container">
    <nav aria-label="Primary">
        <ul>
            {#each HEADER_LINKS.slice(0) as [label, href]}
                <li>
                    <a
                        {href}
                        aria-current={page.url.pathname === href ||
                        (href !== "/" &&
                            page.url.pathname.startsWith(`${href}/`))
                            ? "page"
                            : undefined}
                    >
                        {#if href == page.url.pathname}
                            <strong>{label}</strong>
                        {:else}
                            {label}
                        {/if}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</header>
