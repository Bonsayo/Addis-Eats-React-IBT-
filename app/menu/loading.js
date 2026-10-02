export default function MenuLoading() {
  return (
    <section className="mx-auto max-w-6xl animate-pulse px-5 py-14" aria-label="Loading menu">
      <div className="mb-10 space-y-4">
        <div className="h-3 w-48 rounded bg-stone-200" />
        <div className="h-12 max-w-xl rounded bg-stone-200" />
        <div className="h-5 max-w-md rounded bg-stone-200" />
      </div>
      <div className="mb-8 h-11 w-full max-w-2xl rounded-full bg-stone-200" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="overflow-hidden rounded-3xl bg-white">
            <div className="aspect-[4/3] bg-stone-200" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-20 rounded bg-stone-200" />
              <div className="h-6 w-40 rounded bg-stone-200" />
              <div className="h-4 w-full rounded bg-stone-200" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading menu…</span>
    </section>
  );
}
