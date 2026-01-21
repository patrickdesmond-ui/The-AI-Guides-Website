import {
  Hero,
  ServicesOverview,
  Process,
  WhyUs,
  FeaturedGuides,
  CtaBand,
} from '@/components/sections';

export default function HomePage() {
  return (
    <>
      <Hero
        title="Make AI Practical in Your Business"
        subtitle="Strategy, governance and training for Australian SMEs — standardise 2-3 AI-enabled workflows safely in 90 days."
        primaryCta={{ text: 'Free AI Readiness Survey', href: '/ai-readiness-survey' }}
        secondaryCta={{ text: 'Book a 30-Minute Call', href: '/contact' }}
      />

      <ServicesOverview />

      <Process />

      <WhyUs />

      <FeaturedGuides />

      <CtaBand
        title="Discover Your AI Potential"
        subtitle="Take the First Step Towards Smarter Business"
        primaryCta={{ text: 'Free AI Readiness Survey', href: '/ai-readiness-survey' }}
        secondaryCta={{ text: 'Book a 30-Minute Call', href: '/contact' }}
      />
    </>
  );
}
