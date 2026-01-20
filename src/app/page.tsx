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
        title="Navigate AI Change with Confidence"
        subtitle="Expert guidance, strategy, and training to help your organisation adopt AI with confidence and drive measurable results."
        primaryCta={{ text: 'Explore Our Services', href: '/services' }}
        secondaryCta={{ text: 'Executive AI Training', href: '/executive-training' }}
      />

      <ServicesOverview />

      <Process />

      <WhyUs />

      <FeaturedGuides />

      <CtaBand
        title="Discover Your AI Potential"
        subtitle="Take the First Step Towards Smarter Business"
        primaryCta={{ text: 'Take the AI Readiness Survey', href: '/ai-readiness-survey' }}
      />
    </>
  );
}
