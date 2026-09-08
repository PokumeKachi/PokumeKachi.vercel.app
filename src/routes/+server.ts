export async function GET({ request }) {
    const isCurl = /curl|wget|httpie|python-requests/i.test(
        request.headers.get("user-agent") ?? "",
    );

    const targetUrl =
        "https://raw.githubusercontent.com/PokumeKachi/dotfiles-stow/refs/heads/main/bootstrap.sh";

    const command = `# Script sourced from ${targetUrl}
TMPFILE=$(mktemp) && curl -sL -o "$TMPFILE" "${targetUrl}" && chmod 755 "$TMPFILE" && printf '\\n\\n\\n\\x1b[1;32mNext, run \\x1b[1;33m%s\\x1b[1;32m to \\x1b[1;36mexecute\\x1b[1;32m the script!\\x1b[0m\\n\\n' "$TMPFILE"`;

    const message = isCurl
        ? command
        : "Hello from your browser!";

    return new Response(message, {
        status: 200,
        headers: {
            "content-type": "text/plain; charset=utf-8",
        },
    });
}
