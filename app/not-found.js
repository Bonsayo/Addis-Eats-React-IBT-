import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[.24em] text-orange-700">404 · Table not found</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-stone-900">This page isn&apos;t on our menu.</h1>
      <p className="mt-4 text-stone-600">The page may have moved, or that dish may have sold out.</p>
      <Link className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3 font-bold text-white hover:bg-orange-800" href="/">Back to home</Link>
    </section>
  );
}
