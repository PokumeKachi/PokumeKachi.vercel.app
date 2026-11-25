<script lang="ts">
    import About from "$lib/components/About.svelte";
    import Hero from "$lib/components/Hero.svelte";
</script>

<main class="container">
    <div class="layer">
        <Hero />
        <About />
    </div>

    <footer class="site-footer">
        <p>© {new Date().getFullYear()} Pokume Kachi · Built carefully.</p>
        <nav aria-label="Footer">
            <a href="/projects">Projects</a>
            <a href="/blog">Writing</a>
            <a href="/contact">Contact</a>
        </nav>
    </footer>
</main>

<style>
    .container {
        position: relative;
        /* Entrance transforms park sections off-axis before their scroll
           range; clip horizontally so they never create a sideways scroll. */
        overflow-x: clip;
    }

    .layer {
        position: relative;
        z-index: 1;
    }

    .site-footer {
        position: relative;
        z-index: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin: clamp(2rem, 6vh, 4rem) 0 clamp(2rem, 5vh, 3rem);
        padding-top: 1.5rem;
        border-top: 1px solid var(--pico-border-color);
        color: var(--pico-muted-color);
        font-size: 0.8rem;
    }

    .site-footer p {
        margin: 0;
    }

    .site-footer nav {
        display: flex;
        gap: 1.25rem;
    }

    .site-footer a {
        color: var(--pico-muted-color);
        text-decoration: none;
    }

    .site-footer a:hover {
        color: var(--pico-primary);
    }
</style>
