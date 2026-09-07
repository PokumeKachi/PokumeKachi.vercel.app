import type { Handle } from "@sveltejs/kit";
import { handleCliClient } from "$lib/server/route-handlers";

export const handle: Handle = async ({ event, resolve }) => {
	const userAgent = event.request.headers.get("user-agent") ?? "";
	const isCliClient = /curl|wget|httpie|libcurl/i.test(userAgent);

	if (isCliClient) {
		return handleCliClient({event, resolve});
	}

	return resolve(event);
};
