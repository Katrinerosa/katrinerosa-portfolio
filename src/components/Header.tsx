import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="hidden font-semibold uppercase tracking-[0.15em] hover:text-coral sm:block"
        >
          Katrine Rosa
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-3 text-xs font-medium sm:gap-5 sm:text-sm">
            <li>
              <Link href="/" className="hover:text-coral">
                Home
              </Link>
            </li>

            <li>
              <Link href="/#work" className="hover:text-coral">
                Gallery
              </Link>
            </li>

            <li>
              <Link href="/tarot" className="hover:text-coral">
                Draw a card
              </Link>
            </li>

            <li>
              <Link href="/#about" className="hover:text-coral">
                About
              </Link>
            </li>

            <li>
              <Link href="/#contact" className="hover:text-coral">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
