<script lang="ts">
    import { PATH_TITLES } from "$lib/content/sitemap";

    import ScrollLock from "$lib/behaviors/ScrollLock.svelte";
</script>

<!-- <ScrollLock/> -->
<main class="container">
    <ul>
        <li>
            <h5>
                <a href="/projects/ybiau">ybiau</a> - {PATH_TITLES['/projects/ybiau']}
            </h5>
        </li>
        <li>
            <h5>
                <a href="/projects/loimon">Lối Mòn</a> - {PATH_TITLES['/projects/loimon']}
            </h5>
        </li>

    </ul>
</main>
