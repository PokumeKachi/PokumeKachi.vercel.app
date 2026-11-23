<script lang="ts">
    type Props = {
        eyebrow: string;
        title: string;
        description?: string;
        center?: boolean;
    };

    let {
        eyebrow,
        title,
        description,
        center = false,
    }: Props = $props();
</script>

<header class:center class="intro">
    <p class="eyebrow">{eyebrow}</p>
    <h1 class="page-title">{title}</h1>
    {#if description}
        <p class="description">{description}</p>
    {/if}
</header>

<style>
    .intro {
        margin-bottom: 2.5rem;
    }

    .intro.center {
        margin-block: clamp(2.5rem, 8vh, 5rem) 3rem;
        text-align: center;
    }

    .description {
        margin-top: 1rem;
        line-height: 1.7;
        opacity: 0.7;
    }
</style>
