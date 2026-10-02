"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../CartProvider";

export default function CartContents() {
  const { cart, total, ready, setQuantity, removeFromCart } = useCart();

  if (!ready) return <p className="py-12 text-stone-600">Loading your bag…</p>;
  if (cart.length === 0) {
    return (
      <div className="rounded-3xl bg-white px-6 py-14 text-center">
        <h2 className="text-2xl font-bold text-stone-900">Your bag is waiting for something good.</h2>
        <p className="mt-2 text-stone-600">Find a favorite and we&apos;ll get cooking.</p>
        <Link className="mt-6 inline-flex rounded-full bg-stone-900 px-6 py-3 font-bold text-white hover:bg-orange-800" href="/menu">Browse the menu ↗</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        {cart.map((item) => (
          <article key={item.id} className="flex flex-wrap items-center gap-4 rounded-3xl border border-stone-200 bg-white p-4 sm:flex-nowrap">
            <Image className="h-24 w-24 rounded-2xl object-cover" src={item.image} alt={item.imageAlt} width={160} height={160} unoptimized />
            <div className="min-w-36 flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-700">{item.category}</p>
              <h2 className="mt-1 text-lg font-extrabold text-stone-900">{item.name}</h2>
              <p className="mt-1 text-sm text-stone-500">{item.price.toLocaleString()} ETB each</p>
              <button type="button" className="mt-2 text-sm font-semibold text-stone-500 underline hover:text-red-700" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-stone-200 px-3 py-1.5">
              <button type="button" className="h-8 w-8 rounded-full hover:bg-stone-100" onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
              <span className="min-w-5 text-center font-bold">{item.quantity}</span>
              <button type="button" className="h-8 w-8 rounded-full hover:bg-stone-100" onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
            </div>
            <strong className="w-full text-right text-stone-900 sm:w-28">{(item.price * item.quantity).toLocaleString()} ETB</strong>
          </article>
        ))}
      </div>
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-orange-700">At a glance</p>
        <h2 className="mt-2 text-xl font-extrabold text-stone-900">Order summary</h2>
        <div className="mt-6 flex justify-between text-stone-600"><span>Subtotal</span><span>{total.toLocaleString()} ETB</span></div>
        <div className="mt-3 flex justify-between text-stone-600"><span>Delivery</span><span className="font-semibold text-green-700">Included</span></div>
        <div className="mt-5 flex justify-between border-t border-stone-200 pt-5 text-lg font-extrabold text-stone-900"><span>Total</span><span>{total.toLocaleString()} ETB</span></div>
        <Link className="mt-6 block rounded-full bg-stone-900 px-5 py-3.5 text-center font-bold text-white hover:bg-orange-800" href="/checkout">Continue to checkout ↗</Link>
        <Link className="mt-4 block text-center text-sm font-semibold text-orange-800 hover:text-orange-950" href="/menu">← Add something else</Link>
      </aside>
    </div>
  );
}
