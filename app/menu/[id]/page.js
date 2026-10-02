import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { dishes } from "../dishes";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = dishes.find((item) => item.id === id);
  return {
    title: dish ? `${dish.name} | Addis Eats` : "Dish not found | Addis Eats",
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = dishes.find((item) => item.id === id);

  if (!dish) notFound();

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
      <Image className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lg" src={dish.image} alt={dish.imageAlt} width={1200} height={900} sizes="(max-width: 1024px) 100vw, 50vw" unoptimized />
      <div>
        <Link href="/menu" className="text-sm font-bold text-orange-800 hover:text-orange-950">← Back to menu</Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-orange-700">{dish.category}{dish.spicy && " · Spicy"}</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-stone-900">{dish.name}</h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">{dish.description}</p>
        <p className="mt-7 text-2xl font-extrabold text-stone-900">{dish.price.toLocaleString()} <span className="text-base font-semibold text-stone-500">ETB</span></p>
        <Link href="/menu" className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3.5 font-bold text-white hover:bg-orange-800">
          Add it from the menu <span className="ml-3" aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
