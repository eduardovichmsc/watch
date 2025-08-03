// services/data.ts
import { SITE } from "@/constants/site";
import {
	PaginatedResponse,
	WatchCase,
	Bezel,
	Dial,
	Strap,
	WatchType,
	Hand,
	SecondHand,
	GMTHand,
	Build,
	Category,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || SITE.API_URL;

async function fetchAllPages<T>(resourcePath: string): Promise<T[]> {
	let results: T[] = [];
	let nextUrl: string | null = `${API_BASE_URL}/${resourcePath}`;
	const headers = { "Content-Type": "application/json" };

	try {
		while (nextUrl) {
			const response = await fetch(nextUrl, {
				headers,
				// cache: "no-store"
				cache: "force-cache",
			});
			if (!response.ok) {
				throw new Error(
					`API request for ${nextUrl} failed with status ${response.status}`
				);
			}
			const pageData: PaginatedResponse<T> = await response.json();
			if (pageData.results) {
				results = results.concat(pageData.results);
			}
			nextUrl = pageData.next;
		}
		return results;
	} catch (error) {
		console.error(`Error fetching all pages for ${resourcePath}:`, error);
		return [];
	}
}

async function fetchSingle<T>(resourcePath: string): Promise<T | null> {
	const url = `${API_BASE_URL}/${resourcePath}`;
	const headers = { "Content-Type": "application/json" };

	try {
		const response = await fetch(url, { headers, cache: "force-cache" });
		if (response.status === 404) {
			return null;
		}
		if (!response.ok) {
			throw new Error(
				`API request for ${url} failed with status ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(`Error fetching single resource for ${resourcePath}:`, error);
		return null;
	}
}

// Basics
export async function getCategories(): Promise<Category[]> {
	return fetchAllPages<Category>("categories/");
}

export async function getWatchTypes(): Promise<WatchType[]> {
	return fetchAllPages<WatchType>("watchtypes/");
}

export async function getWatchTypeById(
	id: string | number
): Promise<WatchType | null> {
	return fetchSingle<WatchType>(`watchtypes/${id}`);
}

export async function getBuilds(): Promise<Build[]> {
	return fetchAllPages<Build>("builds/");
}

export async function getBuildById(id: string | number): Promise<Build | null> {
	return fetchSingle<Build>(`builds/${id}`);
}

// Details
export async function getCases(): Promise<WatchCase[]> {
	return fetchAllPages<WatchCase>("cases/");
}

export async function getBezels(): Promise<Bezel[]> {
	return fetchAllPages<Bezel>("bezels/");
}

export async function getDials(): Promise<Dial[]> {
	return fetchAllPages<Dial>("dials/");
}

export async function getStraps(): Promise<Strap[]> {
	return fetchAllPages<Strap>("straps/");
}

export async function getHands(): Promise<Hand[]> {
	return fetchAllPages<Hand>("hands/");
}

export async function getSecondHands(): Promise<SecondHand[]> {
	return fetchAllPages<SecondHand>("secondhands/");
}

export async function getGMTHands(): Promise<GMTHand[]> {
	return fetchAllPages<GMTHand>("gmthands/");
}
