<script lang="ts">
    import ScrollLock from "$lib/behaviors/ScrollLock.svelte";
    import PageIntro from "$lib/components/PageIntro.svelte";
    import SocialLink from "$lib/components/SocialLink.svelte";

    import { pageCopy } from "$lib/content/pages";
    import { socialLinks } from "$lib/content/social";
</script>

<ScrollLock />

<main class="container">
    <PageIntro {...pageCopy.contact} />

    <ul>
        {#each socialLinks as link (link.name)}
            <SocialLink {...link} />
        {/each}
    </ul>
</main>

<style>
    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        padding: 0;
    }
</style>
