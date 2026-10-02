import Link from "next/link";
import "./globals.css";
import { CartProvider } from "./CartProvider";

export const metadata = {
  title: "Addis Eats | A taste of home",
  description: "Ethiopian favorites, made fresh and delivered across Addis Ababa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="border-b border-stone-200 bg-[#fffdf9]">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5" aria-label="Main navigation">
              <Link href="/" className="text-xl font-black tracking-tight text-stone-900">
                ADDIS <span className="text-orange-700">EATS</span>
              </Link>
              <div className="flex items-center gap-5 text-sm font-semibold text-stone-700">
                <Link className="hover:text-orange-700" href="/menu">Menu</Link>
                <Link className="hover:text-orange-700" href="/cart">Your bag</Link>
              </div>
            </nav>
          </header>
          <main className="min-h-[75vh]">{children}</main>
          <footer className="border-t border-stone-200 px-5 py-8 text-center text-sm text-stone-500">
            Made with care in Addis Ababa · Prices in Ethiopian birr (ETB)
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
