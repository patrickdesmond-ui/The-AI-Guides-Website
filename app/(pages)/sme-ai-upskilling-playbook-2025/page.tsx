import Image from "next/image";
import Button from "@/components/Button";
import pages from "@/data/pages.json";

export const metadata = {
  title: "SME AI Upskilling Playbook (2025)",
};

export default function UpskillingPlaybookPage() {
  const resource = pages.resources.featuredResources.find(
    (item) => item.title === "SME AI Upskilling Playbook (2025)"
  );

  if (!resource) {
    return null;
  }

  return (
    <section className="section">
      <div className="container-pad grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Featured Resource</p>
          <h1 className="text-4xl font-bold text-slate-900">{resource.title}</h1>
          <p className="text-lg text-slate-600">{resource.description}</p>
          <Button href="/contact">Talk to an AI Guide</Button>
        </div>
        <Image
          src={resource.image}
          alt={resource.title}
          width={520}
          height={360}
          className="rounded-3xl object-cover shadow-lg"
        />
      </div>
    </section>
  );
}
