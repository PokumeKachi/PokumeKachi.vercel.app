<script lang="ts">
    import "../layout.css";

    import Header from "./Header.svelte";

    let { children } = $props();
</script>

<Header />

{@render children()}

<footer class="site-footer">
    <small>© {new Date().getFullYear()} Pokume Kachi</small>
    <nav aria-label="Footer">
        <a href="/projects">Projects</a>
        <a href="/blog">Writing</a>
        <a href="/contact">Contact</a>
    </nav>
</footer>

<style>
    .site-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: min(100% - 2rem, 52rem);
        margin-inline: auto;
        padding-block: 1.5rem 2rem;
        border-top: 1px solid var(--pico-muted-border-color);
    }

    .site-footer nav {
        display: flex;
        gap: 1rem;
    }
</style>
