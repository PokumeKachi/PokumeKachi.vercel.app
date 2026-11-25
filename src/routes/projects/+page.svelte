<script lang="ts">
    import { projects } from "$lib/content/projects";
</script>

<svelte:head>
    <title>Projects — Pokume Kachi</title>
</svelte:head>

<header>
    <hgroup>
        <h1>Projects</h1>
        <p>Things I've built.</p>
    </hgroup>
</header>

<section aria-label="Project list">
    {#each projects as project (project.slug)}
        <a href={`/projects/${project.slug}`}>
            <article>
                <header>
                    <h2>
                        {project.name}
                    </h2>
                </header>
                <p>{project.title}</p>
            </article>
        </a>
    {/each}
</section>
