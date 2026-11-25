<script lang="ts">
    import DeviceFrame from "$lib/components/DeviceFrame.svelte";

    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>{data.project.name} — Pokume Kachi</title>
</svelte:head>

<DeviceFrame
    url={data.project.url}
    title={data.project.name}
    description={data.project.title}
/>
