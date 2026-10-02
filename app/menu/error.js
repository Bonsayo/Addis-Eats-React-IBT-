"use client";

import { useEffect } from "react";

export default function MenuError({ error, retry }) {
  useEffect(() => {
    console.error("The Addis Eats menu segment failed to render.", error);
  }, [error]);

  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[.24em] text-orange-700">A little kitchen hiccup</p>
      <h1 className="mt-4 text-3xl font-black text-stone-900">We couldn&apos;t load the menu.</h1>
      <p className="mt-3 text-stone-600">Please try again. Your place at the table is saved.</p>
      {error.digest && <p className="mt-3 text-xs text-stone-400">Reference: {error.digest}</p>}
      <button
        className="mt-7 rounded-full bg-stone-900 px-6 py-3 font-bold text-white hover:bg-orange-800"
        type="button"
        onClick={() => retry()}
      >
        Try again
      </button>
    </section>
  );
}
