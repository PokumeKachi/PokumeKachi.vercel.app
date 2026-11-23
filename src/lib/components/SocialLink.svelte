<script lang="ts">
    import type { SocialLink } from "$lib/content/social";

    let { name, icon, url }: SocialLink = $props();
</script>

<li>
    <a href={url} aria-label={`Visit ${name}`}>
        <span class="badge fx-tilt">
            <img class="themed-image" src={icon} alt="" />
        </span>
        <span class="label">{name}</span>
    </a>
</li>

<style>
    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        width: 6.5rem;
        padding: 1rem 0.5rem;

        border: 1px solid transparent;
        border-radius: var(--ui-radius);
        text-align: center;
        text-decoration: none;
    }

    .badge {
        display: grid;
        place-items: center;
        width: 4.5rem;
        height: 4.5rem;

        border: 1px solid var(--pico-border-color);
        border-radius: 50%;
        background: var(--pico-card-background-color);
        box-shadow: var(--ui-shadow);
    }

    img {
        width: 2.25rem;
        height: 2.25rem;
    }

    .label {
        font-size: 0.85rem;
        font-weight: 600;
        opacity: 0.65;
        transition: opacity var(--ui-fast) ease;
    }

    @media (hover: hover) {
        a:hover .badge {
            border-color: var(--pico-primary);
            background: var(--pico-primary);
            color: var(--pico-primary-inverse);
        }

        a:hover img {
            filter: var(--theme-filter-inverse);
        }

        a:hover .label {
            opacity: 1;
        }
    }
</style>
