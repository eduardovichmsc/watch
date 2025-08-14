// app/components/sections/cart/order_summary.tsx
"use client";

export const OrderSummary = ({ subtotal }: { subtotal: number }) => {
	return (
		<div className="self-start bg-white p-6 border border-slate-200 rounded-none">
			<h2 className="font-light text-3xl tracking-tighter text-black mb-6">
				Сводка заказа.
			</h2>

			<dl className="space-y-4 text-sm">
				<div className="flex justify-between">
					<dt className="text-slate-600">Промежуточный итог:</dt>
					<dd className="font-medium text-black">
						{subtotal.toLocaleString("ru-RU")} KZT
					</dd>
				</div>
				<div className="flex justify-between">
					<dt className="text-slate-600">Доставка:</dt>
					<dd className="font-mono text-xs uppercase text-slate-500">
						Рассчитывается далее
					</dd>
				</div>
			</dl>
		</div>
	);
};
