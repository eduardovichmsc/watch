import { SITE } from "@/constants";

const API_BASE_URL = SITE.API_URL;

export async function getToken() {
	try {
		const response = await fetch(`${API_BASE_URL}/token/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: process.env.API_USERNAME,
				password: process.env.API_PASSWORD,
			}),
			cache: "no-store",
		});

		if (!response.ok) {
			console.error("Failed to fetch token:", await response.text());
			throw new Error(`Failed to authenticate. Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Get token error:", error);
		throw new Error("Could not fetch auth token.");
	}
}
