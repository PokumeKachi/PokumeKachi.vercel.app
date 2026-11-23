import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () =>
    new Response(null, {
        status: 307,
        headers: { location: "/" },
    });
