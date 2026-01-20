import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import site from "@/data/site.json";

export default function Header() {
  return (
    <header className="border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="container-pad flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={site.logo}
            alt={`${site.siteName} logo`}
            width={160}
            height={48}
            className="h-10 w-auto"
          />
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-700">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/contact">Talk to an AI Guide</Button>
      </div>
    </header>
  );
}
