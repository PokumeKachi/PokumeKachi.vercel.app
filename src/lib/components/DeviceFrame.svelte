<script>
    import { onMount } from "svelte";

    let { url = "https://example.com" } = $props();

    let ratio = $state("16/9");

    function updateRatio() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        ratio = `${w}/${h}`;
        console.log('yuh');
    }

    onMount(() => {
        updateRatio();
        window.addEventListener("resize", updateRatio);
        return () => window.removeEventListener("resize", updateRatio);
    });
</script>

<div class="container">
    <iframe
        src={url}
        loading="lazy"
        title="Embedded content"
        sandbox="allow-scripts allow-same-origin allow-forms"
        allow="accelerometer; camera; encrypted-media; gyroscope; picture-in-picture"
        style="width:100%; aspect-ratio:{ratio}; border:0; display:block; background:#f0f0f0; border-radius:var(--pico-border-radius);"
    ></iframe>
</div>
