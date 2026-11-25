<script lang="ts">
    import { projects } from "$lib/content/projects";
</script>

<svelte:head>
    <title>Projects — Pokume Kachi</title>
</svelte:head>

<main>
    <header>
        <h1>Projects</h1>
        <p>Things I've built.</p>
    </header>

    <section aria-label="Project list">
        <ul>
            {#each projects as project (project.slug)}
                <li>
                    <a href={`/projects/${project.slug}`}>{project.name}</a>
                    — {project.title}
                </li>
            {/each}
        </ul>
    </section>
</main>
