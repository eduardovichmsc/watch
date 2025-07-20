// src/components/forms/contact-form.tsx
"use client";

import { useState } from "react";
import { useAlertStore } from "@/stores/alert";
import { useCursorStore } from "@/stores/cursor";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export const ContactForm = () => {
	const showAlert = useAlertStore((state) => state.showAlert);
	const { setVariant } = useCursorStore();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<SubmissionStatus>("idle");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("submitting");
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setStatus("success");

		// try {
		// 	await new Promise((resolve) => setTimeout(resolve, 1500));
		// 	if (Math.random() < 0.1) throw new Error("Server error");
		// 	setStatus("success");
		// 	showAlert("Ваше сообщение успешно отправлено!", "success");
		// 	setName("");
		// 	setEmail("");
		// 	setMessage("");
		// } catch (error) {
		// 	setStatus("error");
		// 	showAlert("Произошла ошибка. Попробуйте снова.", "error");
		// } finally {
		// 	setTimeout(() => setStatus("idle"), 2000);
		// }
	};

	const isSubmitting = status === "submitting";

	return (
		<div className="w-full">
			<h2 className="font-light text-3xl md:text-4xl tracking-tight text-black mb-8">
				Напишите нам
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label htmlFor="name" className="sr-only">
						Ваше имя
					</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Ваше имя"
						required
						disabled={isSubmitting}
						className="w-full p-4 text-lg bg-transparent border-b-2 border-slate-200 focus:border-black focus:ring-0 focus:outline-none transition-colors"
					/>
				</div>
				<div>
					<label htmlFor="email" className="sr-only">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email для связи"
						required
						disabled={isSubmitting}
						className="w-full p-4 text-lg bg-transparent border-b-2 border-slate-200 focus:border-black focus:ring-0 focus:outline-none transition-colors"
					/>
				</div>
				<div>
					<label htmlFor="message" className="sr-only">
						Сообщение
					</label>
					<textarea
						id="message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Расскажите, что вас интересует..."
						required
						rows={5}
						disabled={isSubmitting}
						className="w-full p-4 text-lg bg-transparent border-b-2 border-slate-200 focus:border-black focus:ring-0 focus:outline-none transition-colors resize-none"
					/>
				</div>
				<div>
					<button
						type="submit"
						disabled={isSubmitting}
						onMouseEnter={() => setVariant("link")}
						onMouseLeave={() => setVariant("default")}
						className="w-full h-16 flex items-center justify-center bg-black text-white font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed">
						Отправить
					</button>
				</div>
			</form>
		</div>
	);
};
