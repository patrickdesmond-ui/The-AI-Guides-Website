import Link from "next/link";
import Image from "next/image";
import site from "@/data/site.json";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="container-pad grid gap-8 py-12 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <Image
            src={site.logo}
            alt={`${site.siteName} logo`}
            width={160}
            height={48}
            className="h-10 w-auto"
          />
          <p className="text-sm text-slate-600">{site.footer.tagline}</p>
          <p className="text-sm text-slate-600">{site.contactEmail}</p>
        </div>
        <div className="grid gap-2 text-sm text-slate-700">
          {site.footer.links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-700">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-100 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.siteName}. All rights reserved.
      </div>
    </footer>
  );
}
