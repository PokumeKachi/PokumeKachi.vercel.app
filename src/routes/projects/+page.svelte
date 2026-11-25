<script lang="ts">
    import { projects } from "$lib/content/projects";
</script>

<header>
    <hgroup>
        <h1>Things I've built.</h1>
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
