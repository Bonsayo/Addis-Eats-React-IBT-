"use client";

const categories = ["All dishes", "Signature", "Vegan", "Grill", "Breakfast", "Drinks"];

export default function CategoryBar({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Filter dishes by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={selected === category}
          onClick={() => onSelect(category)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            selected === category
              ? "border-stone-900 bg-stone-900 text-white"
              : "border-stone-300 bg-white text-stone-700 hover:border-orange-700 hover:text-orange-800"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
