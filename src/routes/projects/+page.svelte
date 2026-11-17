<script lang="ts">
    import { projects } from "$lib/content/projects";
</script>

<main class="container">
    <ul>
        {#each projects as project (project.slug)}
            <li>
                <h5>
                    <a href={`/projects/${project.slug}`}>{project.name}</a> - {project.title}
                </h5>
            </li>
        {/each}
    </ul>
</main>
