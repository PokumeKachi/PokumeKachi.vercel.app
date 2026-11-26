<script lang="ts">
    import { marked } from "marked";

    let problemStatement = $state("");
    let essay = $state("");
    let feedbackHtml = $state("");
    let loading = $state(false);
    let error = $state("");

    async function checkEssay(event: SubmitEvent) {
        event.preventDefault();

        if (!essay.trim() || loading) return;

        loading = true;
        error = "";
        feedbackHtml = "";

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    problemStatement: problemStatement.trim(),
                    essay: essay.trim(),
                }),
            });

            const text = await response.text();

            let data: { response?: string; error?: string };

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(
                    `Invalid server response (${response.status}).`,
                );
            }

            if (!response.ok) {
                throw new Error(data.error || "Failed to grade essay.");
            }

            if (typeof data.response !== "string") {
                throw new Error("Invalid feedback returned by the server.");
            }

            const html = await marked.parse(data.response);

            const DOMPurify = (await import("dompurify")).default;

            feedbackHtml = DOMPurify.sanitize(html);
        } catch (err) {
            error =
                err instanceof Error ? err.message : "Something went wrong.";
        } finally {
            loading = false;
        }
    }

    function handleEssayKeydown(event: KeyboardEvent) {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();

            if (!loading && essay.trim()) {
                event.currentTarget instanceof HTMLTextAreaElement &&
                    event.currentTarget.form?.requestSubmit();
            }
        }
    }
</script>

<main class="container">
    <header>
        <hgroup>
            <h1>Essay Checker</h1>
            <p>Get detailed feedback on your English writing.</p>
        </hgroup>
    </header>

    <form onsubmit={checkEssay}>
        <fieldset>
            <label for="problem-statement">
                IELTS problem statement
                <small>(Optional)</small>
            </label>

            <textarea
                id="problem-statement"
                name="problemStatement"
                bind:value={problemStatement}
                onkeydown={handleEssayKeydown}
                placeholder="Paste the IELTS Writing Task 1 or Task 2 question here..."
                required
                disabled={loading}></textarea>

            <small>{problemStatement.length} characters</small>
        </fieldset>

        <fieldset>
            <label for="essay">Your essay</label>

            <textarea
                id="essay"
                name="essay"
                bind:value={essay}
                onkeydown={handleEssayKeydown}
                placeholder="Paste your essay here..."
                required
                disabled={loading}></textarea>

            <small>
                {essay.length} characters · Ctrl/Cmd + Enter to submit
            </small>
        </fieldset>

        <button
            type="submit"
            disabled={loading || !essay.trim()}
            aria-busy={loading}
        >
            {loading ? "Analyzing essay..." : "Check essay"}
        </button>
    </form>

    {#if error}
        <article aria-live="assertive">
            <header><strong>Error</strong></header>
            {error}
        </article>
    {/if}

    {#if loading}
        <section aria-live="polite">
            <progress></progress>
            <p>Analyzing your essay. This may take a few seconds.</p>
        </section>
    {/if}

    {#if feedbackHtml}
        <section aria-labelledby="feedback-heading">
            <h2 id="feedback-heading">Feedback</h2>

            <article class="markdown">
                {@html feedbackHtml}
            </article>

            <button
                type="button"
                class="secondary"
                onclick={() => {
                    feedbackHtml = "";
                    error = "";
                }}
            >
                Clear feedback
            </button>
        </section>
    {/if}

    <footer>
        <small>
            Powered by Groq AI. Feedback is AI-generated and should be reviewed
            critically.
        </small>
    </footer>
</main>

<style>
    textarea {
        field-sizing: content;
        min-height: 3rem;
        resize: vertical;
    }
</style>
