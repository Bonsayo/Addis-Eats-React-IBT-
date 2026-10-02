import { dishes } from "./dishes";
import DishList from "./DishList";

export const metadata = {
  title: "Menu | Addis Eats",
  description: "Browse Ethiopian dishes, from slow-cooked classics to freshly brewed coffee.",
};

export default function MenuPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-orange-700">Cooked with heart in Addis</p>
        <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight text-stone-900 sm:text-6xl">
          Good things are <span className="font-serif italic text-orange-700">on the menu.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
          From slow-cooked classics to the perfect coffee, there&apos;s a little something for everyone.
        </p>
      </div>
      <DishList dishes={dishes} />
    </section>
  );
}
