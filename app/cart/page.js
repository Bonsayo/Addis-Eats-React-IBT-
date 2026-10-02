import CartContents from "./CartContents";

export const metadata = { title: "Your bag | Addis Eats" };

export default function CartPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <p className="text-xs font-bold uppercase tracking-[.24em] text-orange-700">Your order</p>
      <h1 className="mb-10 mt-3 text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">Your bag, <span className="font-serif italic text-orange-700">your table.</span></h1>
      <CartContents />
    </section>
  );
}
