"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../CartProvider";
import CategoryBar from "./CategoryBar";

export default function DishList({ dishes }) {
  const [category, setCategory] = useState("All dishes");
  const [query, setQuery] = useState("");
  const { addToCart } = useCart();
  const filteredDishes = useMemo(() => {
    const search = query.trim().toLowerCase();
    return dishes.filter((dish) => {
      const matchesCategory = category === "All dishes" || dish.category === category;
      const matchesQuery = !search || `${dish.name} ${dish.description} ${dish.category}`.toLowerCase().includes(search);
      return matchesCategory && matchesQuery;
    });
  }, [category, dishes, query]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <CategoryBar selected={category} onSelect={setCategory} />
        <label className="flex items-center gap-3 rounded-full border border-stone-300 bg-white px-4 py-2.5 text-stone-500 lg:w-72">
          <span aria-hidden="true">⌕</span>
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find your favorite"
            aria-label="Search dishes"
          />
        </label>
      </div>
      {filteredDishes.length === 0 ? (
        <div className="rounded-3xl bg-white px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-stone-900">Nothing on the menu just yet.</h2>
          <p className="mt-2 text-stone-600">Try another search or category.</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-stone-500">{filteredDishes.length} dishes to make your day</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDishes.map((dish) => (
              <article key={dish.id} className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
                <Link href={`/menu/${dish.id}`} aria-label={`View ${dish.name}`}>
                  <Image className="aspect-[4/3] w-full object-cover" src={dish.image} alt={dish.imageAlt} width={900} height={675} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized />
                </Link>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-700">
                    {dish.category}{dish.spicy && <span className="ml-2" aria-label="Spicy">🌶</span>}
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <Link href={`/menu/${dish.id}`} className="text-xl font-extrabold text-stone-900 hover:text-orange-800">
                      {dish.name}
                    </Link>
                    <span className="whitespace-nowrap font-bold text-stone-800">{dish.price.toLocaleString()} ETB</span>
                  </div>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-stone-600">{dish.description}</p>
                  <button
                    className="mt-5 w-full rounded-full bg-orange-700 px-5 py-3 font-bold text-white transition hover:bg-orange-800"
                    type="button"
                    onClick={() => addToCart(dish)}
                  >
                    Add to bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}
