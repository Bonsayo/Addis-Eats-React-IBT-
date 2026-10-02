"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../CartProvider";

const areas = ["Bole", "Kazanchis", "Piassa", "Arada", "Kirkos", "Yeka", "CMC", "Lideta", "Other"];

export default function OrderForm() {
  const [form, setForm] = useState({ name: "", area: "Bole", phone: "" });
  const [orderNumber, setOrderNumber] = useState("");
  const { cart, total, ready, clearCart } = useCart();
  const router = useRouter();
  const phoneValid = /^(09|07)\d{8}$/.test(form.phone.trim());
  const formValid = form.name.trim().length > 1 && phoneValid && cart.length > 0;

  function handleSubmit(event) {
    event.preventDefault();
    if (!formValid) return;
    setOrderNumber(`AE-${Math.floor(100000 + Math.random() * 900000)}`);
  }

  if (!ready) return <p className="py-12 text-stone-600">Loading your order…</p>;
  if (orderNumber) {
    return (
      <section className="rounded-3xl bg-white px-6 py-14 text-center">
        <span className="text-4xl text-green-700" aria-hidden="true">✓</span>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-orange-700">Order received · {orderNumber}</p>
        <h2 className="mt-3 text-3xl font-black text-stone-900">We&apos;ll get cooking.</h2>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-stone-600">Your order is on its way to {form.area}. We&apos;ll contact you on {form.phone} with delivery updates.</p>
        <button
          className="mt-7 rounded-full bg-stone-900 px-6 py-3 font-bold text-white hover:bg-orange-800"
          type="button"
          onClick={() => { clearCart(); router.push("/"); }}
        >
          Back to home ↗
        </button>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="rounded-3xl bg-white px-6 py-14 text-center">
        <h2 className="text-2xl font-bold text-stone-900">Your bag is empty.</h2>
        <Link className="mt-4 inline-block font-bold text-orange-800 hover:text-orange-950" href="/menu">Explore the menu ↗</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <form className="rounded-3xl bg-white p-6 sm:p-8" onSubmit={handleSubmit} noValidate>
        <h2 className="text-2xl font-extrabold text-stone-900">Delivery details</h2>
        <p className="mt-2 text-stone-600">Tell us where to bring your meal.</p>
        <label className="mt-6 block text-sm font-bold text-stone-800">
          Your name
          <input className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-normal outline-none focus:border-orange-700 focus:ring-2 focus:ring-orange-100" name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" placeholder="e.g. Selam Tesfaye" required minLength={2} />
        </label>
        <label className="mt-5 block text-sm font-bold text-stone-800">
          Delivery area
          <select className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal outline-none focus:border-orange-700 focus:ring-2 focus:ring-orange-100" name="area" value={form.area} onChange={(event) => setForm({ ...form, area: event.target.value })}>
            {areas.map((area) => <option key={area} value={area}>{area}</option>)}
          </select>
        </label>
        <label className="mt-5 block text-sm font-bold text-stone-800">
          TeleBirr phone number
          <input className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-normal outline-none focus:border-orange-700 focus:ring-2 focus:ring-orange-100" name="phone" type="tel" inputMode="numeric" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} autoComplete="tel" placeholder="09XXXXXXXX or 07XXXXXXXX" required aria-describedby="phone-help" aria-invalid={form.phone.length > 0 && !phoneValid} />
        </label>
        <p id="phone-help" className={`mt-2 text-sm ${form.phone.length > 0 && !phoneValid ? "text-red-700" : "text-stone-500"}`}>
          {form.phone.length > 0 && !phoneValid ? "Enter 10 digits starting with 09 or 07." : "10 digits, starting with 09 or 07."}
        </p>
        <button className="mt-7 w-full rounded-full bg-stone-900 px-5 py-3.5 font-bold text-white hover:bg-orange-800 disabled:cursor-not-allowed disabled:opacity-40" type="submit" disabled={!formValid}>
          Place order · {total.toLocaleString()} ETB
        </button>
        <p className="mt-3 text-center text-xs text-stone-500">Your details are only used to deliver this order.</p>
      </form>
      <aside className="h-fit rounded-3xl bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-orange-700">Your order</p>
        <h2 className="mt-2 text-xl font-extrabold text-stone-900">In the bag</h2>
        <div className="mt-5 space-y-4">
          {cart.map((item) => (
            <div className="flex items-center justify-between gap-3 text-sm" key={item.id}>
              <span className="text-stone-600">{item.quantity} × {item.name}</span>
              <strong className="whitespace-nowrap text-stone-900">{(item.price * item.quantity).toLocaleString()} ETB</strong>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between border-t border-stone-200 pt-5 font-extrabold text-stone-900"><span>Total</span><span>{total.toLocaleString()} ETB</span></div>
      </aside>
    </div>
  );
}
