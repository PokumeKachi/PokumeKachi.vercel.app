<script lang="ts">
    const links = [
        {
            name: "GitHub",
            icon: "https://www.svgrepo.com/show/447165/github-outline.svg",
            url: "https://github.com/PokumeKachi",
        },
        {
            name: "Discord",
            icon: "https://www.svgrepo.com/show/447163/discord-outline.svg",
            url: "https://discord.com/users/1401468404367491135",
        },
        {
            name: "Instagram",
            icon: "https://www.svgrepo.com/show/447167/instagram-outline.svg",
            url: "https://www.instagram.com/kachiyes",
        },
    ] as const;
</script>

<header>
    <h1>Contact.</h1>
</header>

<section aria-label="Social links">
    <div class="grid">
        {#each links as { name, icon, url }}
            <a href={url}>
                <article>
                    <strong>{name}</strong>
                </article>
            </a>
        {/each}
    </div>
</section>
