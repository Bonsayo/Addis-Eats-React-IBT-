import Link from "next/link";
import Image from "next/image";
import { dishes } from "./menu/dishes";

const specials = dishes.filter((dish) => dish.popular).slice(0, 3);

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-orange-700">Good food. Good mood.</p>
          <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight text-stone-900 sm:text-7xl">
            The taste of <span className="font-serif italic text-orange-700">home,</span> delivered.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">
            A little Addis on your table. Discover the dishes we grew up with, made fresh and brought right to your door.
          </p>
          <Link className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3.5 font-bold text-white transition hover:bg-orange-800" href="/menu">
            Explore the menu <span className="ml-3" aria-hidden="true">↗</span>
          </Link>
          <p className="mt-5 text-sm text-stone-500">Fast delivery across the city · Freshly prepared every day</p>
        </div>
        <div className="relative">
          <Image
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-xl"
            src={specials[0].image}
            alt={specials[0].imageAlt}
            width={1200}
            height={900}
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
          <div className="absolute -bottom-5 left-5 rounded-2xl bg-white px-5 py-4 shadow-lg sm:left-8">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-700">A guest favorite</p>
            <p className="mt-1 font-bold text-stone-900">{specials[0].name}</p>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-orange-700">Straight from the kitchen</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">Today&apos;s favorites</h2>
          </div>
          <Link className="shrink-0 font-bold text-orange-800 hover:text-orange-950" href="/menu">Full menu ↗</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specials.map((dish) => (
            <Link key={dish.id} href={`/menu/${dish.id}`} className="group overflow-hidden rounded-3xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <Image className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.02]" src={dish.image} alt={dish.imageAlt} width={900} height={675} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-700">{dish.category}</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-extrabold text-stone-900">{dish.name}</h3>
                  <span className="whitespace-nowrap font-bold text-stone-800">{dish.price.toLocaleString()} ETB</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">{dish.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
