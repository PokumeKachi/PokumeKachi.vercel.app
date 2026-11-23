<script lang="ts">
    import { projects } from "$lib/content/projects";
</script>

<main class="container">
    <header class="intro">
        <p class="eyebrow">Selected work</p>
        <h1>Things I've built.</h1>
    </header>

    <ul class="grid">
        {#each projects as project, i (project.slug)}
            <li>
                <a class="fx-tilt fx-sheen" href={`/projects/${project.slug}`}>
                    <span class="num">0{i + 1}</span>
                    <h2>{project.name}</h2>
                    <p>{project.title}</p>
                    <span class="arrow" aria-hidden="true">↗</span>
                </a>
            </li>
        {/each}
    </ul>
</main>

<style>
    .intro {
        margin-block: clamp(2.5rem, 8vh, 5rem) 2rem;
    }

    .eyebrow {
        margin: 0 0 0.75rem;
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        opacity: 0.55;
    }

    h1 {
        margin: 0;
        font-size: clamp(2rem, 6vw, 3.5rem);
        line-height: 1.1;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
        gap: 1rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .grid li {
        list-style: none;
    }

    .grid a {
        position: relative;
        display: block;
        height: 100%;
        padding: 1.5rem;

        border: 1px solid var(--pico-border-color);
        border-radius: var(--ui-radius);
        background: var(--pico-card-background-color);
        box-shadow: var(--ui-shadow);
        text-decoration: none;

        transition:
            transform var(--ui-fast) var(--ui-ease),
            border-color var(--ui-fast) ease,
            box-shadow var(--ui-fast) ease;
    }

    .num {
        font-size: 0.8rem;
        opacity: 0.45;
    }

    h2 {
        margin: 0.6rem 0 0.35rem;
        font-size: 1.4rem;
    }

    p {
        max-width: 32ch;
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.5;
        opacity: 0.68;
    }

    .arrow {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        opacity: 0.4;
        transition:
            transform var(--ui-fast) var(--ui-ease),
            opacity var(--ui-fast) ease;
    }

    @media (hover: hover) {
        .grid a:hover {
            border-color: var(--pico-primary);
            box-shadow: var(--ui-shadow-lift);
        }

        .grid a:hover .arrow {
            transform: translate(3px, -3px);
            opacity: 1;
        }
    }
</style>
