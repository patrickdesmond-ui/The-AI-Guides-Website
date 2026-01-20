import Link from 'next/link';
import { Section, SectionHeader } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

const services = [
  {
    title: 'AI Strategy & Roadmaps',
    description:
      'Develop a clear, actionable AI strategy tailored to your business goals. We guide you in prioritising opportunities, ensuring governance, and creating a roadmap for sustainable AI growth.',
    href: '/services',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Executive & Team Training',
    description:
      'Upskill your leadership and teams with practical, real-world AI training. Our programs are designed to foster understanding, build confidence, and drive effective AI adoption across your organisation.',
    href: '/executive-training',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    title: 'Implementation Support',
    description:
      'Receive end-to-end support for AI solution deployment. We help you manage change, integrate new technologies, and ensure your AI investments deliver measurable value.',
    href: '/contact',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
];

export function ServicesOverview() {
  return (
    <Section background="white">
      <SectionHeader
        title="Empowering Your Business with Practical AI Solutions"
        subtitle="Artificial intelligence is transforming the business landscape at an unprecedented pace. For Australian SMEs, keeping up can be challenging, with uncertainty around where to start and how to ensure responsible, effective adoption. The AI Guides specialises in equipping Australian SMEs with the strategies, knowledge, and support needed to navigate AI adoption confidently."
      />

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.title} className="group">
            <div className="text-[var(--color-primary)] mb-4">{service.icon}</div>
            <CardTitle className="mb-3">{service.title}</CardTitle>
            <CardDescription className="mb-4">{service.description}</CardDescription>
            <Link
              href={service.href}
              className="inline-flex items-center text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-dark)] transition-colors group"
            >
              Learn more
              <svg
                className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
