import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";

export const SOCIAL_MEDIA_LINKS = [
	{
		href: "https://www.instagram.com/wotch_mods_club/",
		label: "Instagram",
		icon: FaInstagram,
	},
	{
		href: "https://www.t.me/WotchModsClub",
		label: "Telegram",
		icon: FaTelegram,
	},
	{
		href: "https://wwww.wa.me/77082506510",
		label: "WhatsApp",
		icon: FaWhatsapp,
	},
] as const;
