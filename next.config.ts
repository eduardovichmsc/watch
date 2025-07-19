import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	allowedDevOrigins: ["https://wotchmodclub.com/"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};

export default nextConfig;
