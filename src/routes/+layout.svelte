<script lang="ts">
    import Glow from "./Glow.svelte";
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
    import PageTransition from "./PageTransition.svelte";

    let { children } = $props();
</script>

<Glow />
<Header />

<main class="container">
    <PageTransition>
        {@render children()}
    </PageTransition>
</main>

<Footer />
