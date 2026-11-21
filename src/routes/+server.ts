const GIST_URL =
    "https://gist.githubusercontent.com/PokumeKachi/af266a673d3fe4e66ddd77863140d88a/raw";

export function GET({ request }) {
    const isCli = /curl|wget|httpie|python-requests/i.test(
        request.headers.get("user-agent") ?? "",
    );

    const message = isCli
        ? `# Script sourced from ${GIST_URL}
TMPFILE=$(mktemp) && curl -sL -o "$TMPFILE" "${GIST_URL}" && chmod 755 "$TMPFILE" && printf '\\n\\n\\n\\x1b[1;32mNext, run \\x1b[1;33m%s\\x1b[0m to \\x1b[1;36mexecute\\x1b[0m the script!\\n\\n' "$TMPFILE"`
        : "Hello from your browser!";

    return new Response(message, {
        headers: { "content-type": "text/plain; charset=utf-8" },
    });
}
