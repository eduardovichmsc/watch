// src/app/contacts/page.tsx
import { Metadata } from "next";
import { ContactsWrapper } from "@/components/sections/contacts";

export const metadata: Metadata = {
	title: "Свяжитесь с нами | WotchModClub",
	description: "Кастомная сборка часов Seikomod | WotchModClub",
};

export default function ContactsPage() {
	return <ContactsWrapper />;
}
