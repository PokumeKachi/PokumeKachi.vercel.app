<script lang="ts">
    import About from "$lib/components/About.svelte";
    import Hero from "$lib/components/Hero.svelte";
</script>

<main class="container">
    <div class="layer">
        <Hero />
        <div class="reveal"><About /></div>
    </div>
</main>

<style>
    .container {
        position: relative;
    }

    .layer {
        position: relative;
        z-index: 1;
    }
</style>
