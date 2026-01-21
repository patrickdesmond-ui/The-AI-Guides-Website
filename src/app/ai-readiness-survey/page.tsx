'use client';

import { useState, useCallback } from 'react';
import { Section } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIReadinessSurvey } from '@/components/survey/ai-readiness-survey';

const steps = [
  {
    number: 1,
    title: 'Answer the survey',
    description: 'About 5 minutes, 20+ targeted questions.',
  },
  {
    number: 2,
    title: 'Get your readiness snapshot',
    description: 'Instantly receive scores across five key areas.',
  },
  {
    number: 3,
    title: 'Act on the quick wins',
    description: 'Or book time with The AI Guides to tailor your next steps.',
  },
];

const benefits = [
  {
    title: 'Identify Strengths & Gaps',
    description: 'Understand where your organisation excels and where improvement is needed across people, processes, and data.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: 'Prioritise Initiatives',
    description: 'Focus on realistic AI opportunities that align with your current capabilities.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    title: 'Track Progress',
    description: 'Establish a baseline to measure your AI maturity journey over time.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: 'Actionable Recommendations',
    description: 'Receive practical next steps you can implement immediately.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function AIReadinessSurveyPage() {
  const [autoStart, setAutoStart] = useState(false);

  const handleStartSurvey = useCallback(() => {
    // Set autoStart first so when we scroll, the survey starts automatically
    setAutoStart(true);

    // Smooth scroll to the survey section
    const surveyElement = document.getElementById('survey');
    if (surveyElement) {
      surveyElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-6">AI Readiness Survey</h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8">
              Find out how prepared your business is to use AI — and get the 3–5 actions to take in
              the next 30 days.
            </p>
            <Button onClick={handleStartSurvey} size="lg">
              Start the Survey
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-4">How the AI Readiness Survey Works</h2>
          <p className="text-center text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto">
            Most SMEs can only focus on a few AI initiatives at a time.{' '}
            <strong className="text-[var(--color-text-primary)]">The problem is choosing the right ones</strong> —
            the ones your people can actually deliver, with the tools and data you already have. Our{' '}
            <strong className="text-[var(--color-text-primary)]">
              AI Readiness Survey gives you a quick, structured view of where you are now
            </strong>
            , across the areas that matter, so you can act with confidence.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[var(--color-text-secondary)]">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-[var(--color-bg-secondary)] rounded-lg text-center">
            <p className="text-sm text-[var(--color-text-muted)] italic">
              All responses are fully confidential and used only to generate your objective
              readiness assessment and personalised feedback. No individual data is shared or used
              for sales purposes.
            </p>
          </div>
        </div>
      </Section>

      {/* Why Establish Baseline */}
      <Section background="light">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">Why Establish an AI Readiness Baseline?</h2>
            <p className="text-[var(--color-text-secondary)] mb-4">
              AI is evolving at a remarkable pace, but many organisations find their internal
              capabilities struggling to keep up.{' '}
              <strong className="text-[var(--color-text-primary)]">
                Without a clear understanding of where your business currently stands, it becomes
                challenging to prioritise AI initiatives and accurately track progress.
              </strong>
            </p>
            <p className="text-[var(--color-text-secondary)]">
              Establishing a readiness baseline allows you to identify strengths and gaps across
              your people, processes, and data. This survey is designed to provide actionable
              insights, helping you focus on realistic AI opportunities that align with your current
              capabilities—ensuring your next steps are both practical and measurable.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} hover={false} className="bg-white">
                <div className="text-[var(--color-primary)] mb-3">{benefit.icon}</div>
                <CardTitle className="text-base mb-2">{benefit.title}</CardTitle>
                <CardDescription className="text-sm">{benefit.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Survey Embed Section */}
      <Section background="white" id="survey">
        <div className="max-w-4xl mx-auto">
          <AIReadinessSurvey autoStart={autoStart} />

          <p className="text-sm text-[var(--color-text-muted)] mt-8 text-center">
            Prefer to talk to someone first?{' '}
            <a href="/contact" className="text-[var(--color-primary)] hover:underline">
              Book a call with The AI Guides
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
