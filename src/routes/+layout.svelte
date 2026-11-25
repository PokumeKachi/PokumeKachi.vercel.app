<script lang="ts">
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
    import PageTransition from "./PageTransition.svelte";

    let { children } = $props();
</script>

<Header />

<main class="container">
    <PageTransition>
        {@render children()}
    </PageTransition>
</main>

<Footer />
