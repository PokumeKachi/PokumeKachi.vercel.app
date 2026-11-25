<script lang="ts">
    import DeviceFrame from "$lib/components/DeviceFrame.svelte";
    import { PATH_TITLES } from "$lib/content/sitemap";
</script>

<svelte:head>
    <title>ybiau — Pokume Kachi</title>
</svelte:head>

<DeviceFrame
    url="https://ybiau.vercel.app"
    title="ybiau"
    description={PATH_TITLES["/projects/ybiau"]}
/>
