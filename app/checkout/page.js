import Link from "next/link";
import OrderForm from "./OrderForm";

export const metadata = { title: "Checkout | Addis Eats" };

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <Link className="text-sm font-bold text-orange-800 hover:text-orange-950" href="/cart">← Back to your bag</Link>
      <div className="mb-10 mt-8 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-orange-700">Almost there</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">Let&apos;s get this <span className="font-serif italic text-orange-700">to your door.</span></h1>
      </div>
      <OrderForm />
    </section>
  );
}
