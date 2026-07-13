import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-40 pb-24 text-center px-6">
      <p className="font-display font-bold text-ink text-xl mb-4">
        We couldn&apos;t find that page.
      </p>
      <Link href="/" className="text-sm font-bold" style={{ color: "#631DFE" }}>
        &larr; Back to home
      </Link>
    </section>
  );
}
