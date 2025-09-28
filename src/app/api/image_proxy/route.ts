// src/app/api/image_proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const imageUrl = searchParams.get("url");

	if (!imageUrl) {
		return new NextResponse("Image URL is required", { status: 400 });
	}

	try {
		// Делаем запрос к внешнему URL с нашего сервера
		const response = await fetch(imageUrl);

		if (!response.ok) {
			return new NextResponse("Failed to fetch image", {
				status: response.status,
			});
		}

		const imageBlob = await response.blob();
		const headers = new Headers();
		headers.set(
			"Content-Type",
			response.headers.get("Content-Type") || "image/png"
		);
		headers.set("Cache-Control", "public, max-age=31536000, immutable");

		return new NextResponse(imageBlob, { status: 200, headers });
	} catch (error) {
		console.error("Image proxy error:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
