<script lang="ts">
    import DeviceFrame from "$lib/components/DeviceFrame.svelte";
    import { PATH_TITLES } from "$lib/content/sitemap";
</script>

<svelte:head>
    <title>Lối Mòn — Pokume Kachi</title>
</svelte:head>

<DeviceFrame
    url="https://loimon.vercel.app"
    title="Lối Mòn"
    description={PATH_TITLES["/projects/loimon"]}
/>
