// services/data.ts
import { SITE } from "@/constants";
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

const API_BASE_URL = SITE.API_URL;

async function fetchAllPages<T>(
	resourcePath: string,
	watchTypeId?: number | string
): Promise<T[]> {
	let results: T[] = [];
	let nextUrl: string | null = `${API_BASE_URL}/${resourcePath}${
		watchTypeId ? `?watch_type=${watchTypeId}` : ""
	}`;
	const headers = { "Content-Type": "application/json" };

	try {
		while (nextUrl) {
			const response = await fetch(nextUrl, { headers, cache: "no-store" });
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
		const response = await fetch(url, { headers, cache: "default" });
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
export async function getCases(
	watchTypeId?: number | string
): Promise<WatchCase[]> {
	return fetchAllPages<WatchCase>("cases/", watchTypeId);
}
export async function getBezels(
	watchTypeId?: number | string
): Promise<Bezel[]> {
	return fetchAllPages<Bezel>("bezels/", watchTypeId);
}
export async function getDials(watchTypeId?: number | string): Promise<Dial[]> {
	return fetchAllPages<Dial>("dials/", watchTypeId);
}
export async function getStraps(
	watchTypeId?: number | string
): Promise<Strap[]> {
	return fetchAllPages<Strap>("straps/", watchTypeId);
}
export async function getHands(watchTypeId?: number | string): Promise<Hand[]> {
	return fetchAllPages<Hand>("hands/", watchTypeId);
}
export async function getSecondHands(
	watchTypeId?: number | string
): Promise<SecondHand[]> {
	return fetchAllPages<SecondHand>("secondhands/", watchTypeId);
}
export async function getGMTHands(
	watchTypeId?: number | string
): Promise<GMTHand[]> {
	return fetchAllPages<GMTHand>("gmthands/", watchTypeId);
}
