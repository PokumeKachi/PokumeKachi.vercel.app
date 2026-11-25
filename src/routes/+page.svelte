<script lang="ts">
    import { projects } from "$lib/content/projects";
</script>

<svelte:head>
    <title>Pokume Kachi</title>
</svelte:head>

<main>
    <header class="hero">
        <h1>Pokume Kachi</h1>
        <p>Student and programmer from Vietnam.</p>

        <nav aria-label="Explore">
            <a href="/projects">Projects</a>
            <a href="/blog">Writing</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>

    <section id="about" aria-labelledby="about-title">
        <h2 id="about-title">About</h2>
        <p>
            I build clean, fast interfaces and small tools that make the web a
            little more useful.
        </p>
    </section>

    <section id="projects" aria-labelledby="projects-title">
        <h2 id="projects-title">Projects</h2>
        <ul>
            {#each projects as project (project.slug)}
                <li>
                    <a href={`/projects/${project.slug}`}>{project.name}</a>
                    — {project.title}
                </li>
            {/each}
        </ul>
    </section>

    <section id="writing" aria-labelledby="writing-title">
        <h2 id="writing-title">Writing</h2>
        <p><a href="/blog">Notes, thoughts, and things I've learned.</a></p>
    </section>

    <section id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Contact</h2>
        <p>
            <a href="https://github.com/PokumeKachi">GitHub</a>,
            <a href="https://discord.com/users/1401468404367491135">Discord</a>,
            <a href="https://www.instagram.com/kachiyes">Instagram</a>, or
            <a href="/contact">more ways to reach me</a>.
        </p>
    </section>
</main>

<style>
    .hero {
        padding-block: 2rem 4rem;
    }

    .hero nav {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1.5rem;
    }
</style>
