'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';

// Module navigation data
const modules = [
  { id: 'module-1', title: 'AI Foundations', number: 1, depth: 'detailed' },
  { id: 'module-2', title: 'Finding Opportunities', number: 2, depth: 'detailed' },
  { id: 'module-3', title: 'Evaluating Tools', number: 3, depth: 'detailed' },
  { id: 'module-4', title: 'Business Case', number: 4, depth: 'overview' },
  { id: 'module-5', title: 'Leading Adoption', number: 5, depth: 'overview' },
  { id: 'module-6', title: 'Governance & Risk', number: 6, depth: 'overview' },
  { id: 'module-7', title: 'Measuring Success', number: 7, depth: 'overview' },
];

// AI Capability Spectrum data
const capabilitySpectrum = [
  {
    level: 1,
    category: 'Task Automation',
    whatItDoes: 'Follows rules, handles repetitive work',
    example: 'Auto-sorting emails, invoice processing',
  },
  {
    level: 2,
    category: 'Assisted Intelligence',
    whatItDoes: 'Surfaces insights, supports human decisions',
    example: 'Sales forecasting, recommendation engines',
  },
  {
    level: 3,
    category: 'Augmented Intelligence',
    whatItDoes: 'Collaborates with humans, handles complex tasks',
    example: 'Document drafting, code assistance, research synthesis',
  },
  {
    level: 4,
    category: 'Autonomous Intelligence',
    whatItDoes: 'Acts independently within defined boundaries',
    example: 'Automated customer service, dynamic pricing',
  },
];

// Tool Scorecard criteria
const scorecardCriteria = [
  {
    criteria: 'Problem-Solution Fit',
    weight: '25%',
    questions: 'Does this solve a validated problem we have, or a problem the vendor convinced us we have?',
  },
  {
    criteria: 'Accuracy & Reliability',
    weight: '20%',
    questions: 'What\'s the error rate for our specific use case? How does performance degrade at edge cases?',
  },
  {
    criteria: 'Data Security & Compliance',
    weight: '20%',
    questions: 'Where is data processed and stored? What\'s retained? Who can access it? Does it meet our regulatory requirements?',
  },
  {
    criteria: 'Integration',
    weight: '15%',
    questions: 'How does it connect with our existing systems? What\'s the implementation burden?',
  },
  {
    criteria: 'Total Cost',
    weight: '10%',
    questions: 'What\'s the full cost including implementation, training, and ongoing maintenance?',
  },
  {
    criteria: 'Vendor Stability',
    weight: '10%',
    questions: 'Is this vendor likely to exist in three years? What\'s their support model?',
  },
];

// Helper Components
function ModuleDepthIndicator({ depth }: { depth: 'detailed' | 'overview' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        depth === 'detailed'
          ? 'bg-[var(--color-primary)] text-white'
          : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
      }`}
    >
      {depth === 'detailed' ? (
        <>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          Detailed
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Overview
        </>
      )}
    </span>
  );
}

function CurriculumItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-[var(--color-text-primary)]">
        <strong>{title}</strong> — {description}
      </p>
    </div>
  );
}

function TryThisBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="font-semibold text-amber-800">Try This</span>
      </div>
      <div className="text-amber-900 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function KeyQuestionsList({ questions }: { questions: string[] }) {
  return (
    <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-6">
      <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Key Questions We Address
      </h4>
      <ul className="space-y-3">
        {questions.map((question, i) => (
          <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
            <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WhyItMattersBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border-l-4 border-[var(--color-primary)] rounded-r-xl p-5">
      <div className="font-semibold text-[var(--color-primary)] mb-2">Why It Matters</div>
      <div className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function OpportunityMatrix() {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
      <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 text-center">The AI Opportunity Matrix</h4>
      <div className="flex gap-4">
        {/* Y-axis label */}
        <div className="flex items-center justify-center w-6 flex-shrink-0">
          <div className="-rotate-90 text-xs text-[var(--color-text-muted)] font-medium whitespace-nowrap flex items-center gap-1">
            <span>BUSINESS IMPACT</span>
            <svg className="w-3 h-3 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        </div>

        <div className="flex-1">
          {/* Labels row */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="text-center text-xs text-[var(--color-text-muted)] font-medium">Low Complexity</div>
            <div className="text-center text-xs text-[var(--color-text-muted)] font-medium">High Complexity</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Top row - High Impact */}
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
              <div className="font-semibold text-green-800 mb-1">Quick Wins</div>
              <div className="text-xs text-green-700 mb-2">High impact, low complexity</div>
              <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Start here
              </div>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="font-semibold text-blue-800 mb-1">Strategic Bets</div>
              <div className="text-xs text-blue-700 mb-2">High impact, high complexity</div>
              <div className="text-xs text-blue-600 font-medium">Plan carefully</div>
            </div>

            {/* Bottom row - Low Impact */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-700 mb-1">Easy Experiments</div>
              <div className="text-xs text-gray-600 mb-2">Low impact, low complexity</div>
              <div className="text-xs text-gray-500 font-medium">Learning opportunities</div>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="font-semibold text-red-700 mb-1">Avoid</div>
              <div className="text-xs text-red-600 mb-2">Low impact, high complexity</div>
              <div className="text-xs text-red-500 font-medium">Deprioritise ruthlessly</div>
            </div>
          </div>

          {/* X-axis label */}
          <div className="text-center text-xs text-[var(--color-text-muted)] font-medium mt-3 flex items-center justify-center gap-1">
            <span>COMPLEXITY</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function AILeadershipEssentialsPage() {
  const [activeModule, setActiveModule] = useState('');

  // Track scroll position for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveModule(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    modules.forEach((module) => {
      const element = document.getElementById(module.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToModule = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-sm font-medium text-[var(--color-primary)] bg-blue-50 px-3 py-1 rounded-full mb-4">
              Executive AI Training Curriculum
            </span>
            <h1 className="mb-6">AI Leadership Essentials</h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-6">
              A practical curriculum for executives navigating AI adoption — from foundations to implementation.
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Every executive we speak with has the same question: <em>Where do we actually start?</em>
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed mt-4">
              This curriculum covers the seven core modules business leaders need to navigate AI adoption with confidence. It&apos;s the framework we use with clients — from AI fundamentals through to measuring what&apos;s working. Some modules go deep. Others sketch the territory. All of them reflect what we&apos;ve learned works in practice, not just theory.
            </p>
          </div>

          <div className="text-center">
            <Button href="/contact" size="lg">
              Reach out for a customised executive workshop
            </Button>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <Section background="white" id="toc">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-8">What We Cover</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => scrollToModule(module.id)}
                className="flex items-center gap-4 p-4 bg-[var(--color-bg-secondary)] rounded-xl hover:bg-blue-50 hover:border-[var(--color-primary)] border border-transparent transition-all text-left group"
              >
                <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold flex-shrink-0">
                  {module.number}
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    {module.title}
                  </div>
                </div>
                <ModuleDepthIndicator depth={module.depth as 'detailed' | 'overview'} />
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-text-muted)] flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-medium">Module:</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1">
              <svg className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => scrollToModule(module.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeModule === module.id
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]'
                  }`}
                >
                  <span className="sm:hidden">{module.number}</span>
                  <span className="hidden sm:inline">{module.number}. {module.title}</span>
                </button>
              ))}
              <svg className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Module 1: AI Foundations */}
      <Section background="white" id="module-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
                1
              </span>
              <h2 className="mb-0">AI Foundations</h2>
            </div>
            <ModuleDepthIndicator depth="detailed" />
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-6">
            Most executives feel behind on AI. They&apos;re not.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-6">
            The gap isn&apos;t intelligence or capability — it&apos;s that AI has been explained poorly. Too much jargon, too much hype, not enough clarity on what actually matters for business decisions.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            This module builds genuine AI literacy. Not the technical depth your engineers need, but the conceptual foundation that lets you ask better questions, spot overpromises, and make confident calls on where AI fits in your organisation. The goal isn&apos;t to make you an AI expert. It&apos;s to make you a better decision-maker about AI.
          </p>

          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Core Curriculum</h3>
            <div className="space-y-4">
              <CurriculumItem
                title="How AI actually works"
                description="a clear, jargon-free explanation of machine learning, neural networks, and why these systems behave the way they do. Enough to understand capabilities and limitations, not enough to build one yourself."
              />
              <CurriculumItem
                title="Generative AI vs. traditional AI"
                description="what changed with ChatGPT and why it matters. The shift from prediction to creation, and what that unlocks for business applications."
              />
              <CurriculumItem
                title="Terminology decoded"
                description="LLMs, prompts, fine-tuning, agents, automation, RAG, hallucinations. We cut through the alphabet soup so you can follow technical conversations without getting lost."
              />
              <CurriculumItem
                title="Capabilities and limitations"
                description="what AI genuinely does well, where it consistently fails, and how to calibrate expectations. This is where most hype-driven disappointment originates."
              />
              <CurriculumItem
                title="The AI landscape"
                description="major players, key tools, emerging categories, and where things are heading. A map of the territory so you can orient yourself."
              />
              <CurriculumItem
                title="Australian context"
                description="local adoption trends, the policy environment, what's different about our market, and what that means for your decisions."
              />
            </div>
          </div>

          {/* AI Capability Spectrum Framework */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Framework: The AI Capability Spectrum
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Not all AI is created equal. This spectrum helps categorise what you&apos;re looking at — and set realistic expectations.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded-xl overflow-hidden border border-[var(--color-border)]">
                <thead className="bg-[var(--color-bg-secondary)]">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">Level</th>
                    <th className="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">What It Does</th>
                    <th className="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {capabilitySpectrum.map((row) => (
                    <tr key={row.level} className="border-t border-[var(--color-border)]">
                      <td className="py-3 px-4">
                        <span className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold">
                          {row.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-[var(--color-primary)]">{row.category}</td>
                      <td className="py-3 px-4 text-[var(--color-text-secondary)]">{row.whatItDoes}</td>
                      <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-4 bg-amber-50 p-4 rounded-lg">
              Most tools sit at Levels 2-3. Vendors often market at Level 4. Knowing the difference protects you from overpromising and helps you set appropriate oversight for each category.
            </p>
          </div>

          <TryThisBox>
            <p className="font-semibold mb-2">Audit your current tools.</p>
            <p className="mb-3">
              List five software tools your organisation uses daily — your CRM, accounting package, project management system, communication tools. Research whether each has AI features you&apos;re not currently using. Most platforms have quietly added AI capabilities in the past 18 months.
            </p>
            <p>
              Categorise each on the Capability Spectrum above. You&apos;ll likely discover untapped AI capability in tools you already pay for — often the fastest path to early wins.
            </p>
          </TryThisBox>
        </div>
      </Section>

      {/* Module 2: Finding Opportunities */}
      <Section background="light" id="module-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
                2
              </span>
              <h2 className="mb-0">Finding Opportunities</h2>
            </div>
            <ModuleDepthIndicator depth="detailed" />
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-6">
            &quot;Start small&quot; is common advice. It&apos;s also unhelpful without a framework for <em>where</em> to start small.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            The challenge isn&apos;t finding AI opportunities — it&apos;s finding the <em>right</em> ones. Every process in your business could theoretically be touched by AI. That doesn&apos;t mean it should be. The organisations seeing real returns aren&apos;t the ones doing the most with AI. They&apos;re the ones doing the right things.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            This module builds systematic capability for identifying high-value AI opportunities specific to your context. We move from vague possibility to concrete priority.
          </p>

          <div className="bg-white rounded-xl p-6 mb-8 border border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Core Curriculum</h3>
            <div className="space-y-4">
              <CurriculumItem
                title="Process mapping for AI"
                description="how to analyse workflows and spot where AI creates genuine leverage, not just novelty."
              />
              <CurriculumItem
                title="Build vs. buy vs. configure"
                description="the decision framework for whether you need custom development, off-the-shelf tools, or configuration of existing platforms."
              />
              <CurriculumItem
                title="Prioritisation methods"
                description="practical approaches for evaluating effort against impact when everything feels important."
              />
              <CurriculumItem
                title="Use cases by function"
                description="common high-value patterns across operations, sales, finance, HR, and customer service. Where others have found traction."
              />
              <CurriculumItem
                title="Industry-specific patterns"
                description="how opportunity profiles differ across sectors, and what's working in your industry specifically."
              />
              <CurriculumItem
                title="Avoiding solution-seeking"
                description="how to prevent the trap of finding problems for your shiny new AI solution, rather than solutions for your actual problems."
              />
              <CurriculumItem
                title="Building a pipeline"
                description="creating an ongoing system for identifying and evaluating AI opportunities, not just a one-time exercise."
              />
            </div>
          </div>

          {/* Opportunity Matrix */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Framework: The AI Opportunity Matrix
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-4">
              A simple tool for prioritising where to focus.
            </p>
            <OpportunityMatrix />
            <p className="text-sm text-[var(--color-text-muted)] mt-4">
              Plot your potential initiatives on this matrix. If you&apos;re starting your AI journey, you want a portfolio weighted heavily toward Quick Wins with one or two Strategic Bets on the horizon.
            </p>
          </div>

          <TryThisBox>
            <p className="font-semibold mb-2">Run a 15-minute opportunity scan.</p>
            <p className="mb-3">
              Pick one business process that frustrates your team — something that causes complaints, delays, or errors.
            </p>
            <p className="mb-3">Break it into 5-7 discrete steps. For each step, ask:</p>
            <ul className="list-disc list-inside mb-3 space-y-1">
              <li>Is this repetitive?</li>
              <li>Does it involve pattern recognition?</li>
              <li>Does it require synthesising information from multiple sources?</li>
              <li>Is there a clear &quot;right answer&quot; we could train toward?</li>
            </ul>
            <p>
              Steps with multiple &quot;yes&quot; answers are strong AI candidates. You&apos;ve just done a basic opportunity assessment — the same logic scales to more rigorous analysis.
            </p>
          </TryThisBox>
        </div>
      </Section>

      {/* Module 3: Evaluating Tools */}
      <Section background="white" id="module-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
                3
              </span>
              <h2 className="mb-0">Evaluating Tools</h2>
            </div>
            <ModuleDepthIndicator depth="detailed" />
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-6">
            The AI tool market is overwhelming. New products launch weekly, every vendor claims transformative results, and traditional software evaluation frameworks don&apos;t quite fit.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            AI tools require different evaluation criteria than conventional software. Accuracy varies by use case. Outputs aren&apos;t always predictable. Data handling matters in new ways. The cost of a poor choice isn&apos;t just wasted subscription fees — it&apos;s lost time, frustrated teams, and eroded confidence in AI initiatives.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            This module builds practical evaluation capability. Not to make you a procurement specialist, but to make you a more discerning buyer who asks the right questions.
          </p>

          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Core Curriculum</h3>
            <div className="space-y-4">
              <CurriculumItem
                title="The AI tool landscape"
                description="categories, major players, where the market is consolidating, and where it's still fragmented."
              />
              <CurriculumItem
                title="Evaluation criteria for AI"
                description="what to assess beyond features: accuracy, reliability, explainability, data handling, integration depth."
              />
              <CurriculumItem
                title="Red flags and green flags"
                description="what vendor claims should raise concerns, and what signals genuine capability."
              />
              <CurriculumItem
                title="Security and compliance"
                description="data processing, storage, privacy implications, and regulatory considerations specific to AI tools."
              />
              <CurriculumItem
                title="Proof of concept design"
                description="how to structure meaningful tests before committing, and what 'success' should look like."
              />
              <CurriculumItem
                title="Total cost of ownership"
                description="the full picture beyond subscription fees: implementation, training, maintenance, integration, and the hidden costs of switching."
              />
              <CurriculumItem
                title="Building internal capability"
                description="developing your team's ability to evaluate AI tools systematically, not just for this decision but for all future ones."
              />
            </div>
          </div>

          {/* Tool Scorecard Framework */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Framework: The AI Tool Scorecard
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-4">
              A weighted evaluation framework for AI tool decisions.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded-xl overflow-hidden border border-[var(--color-border)]">
                <thead className="bg-[var(--color-bg-secondary)]">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">Criteria</th>
                    <th className="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">Weight</th>
                    <th className="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">Questions to Ask</th>
                    <th className="text-center py-3 px-4 font-semibold text-[var(--color-text-primary)]">Score (1-5)</th>
                  </tr>
                </thead>
                <tbody>
                  {scorecardCriteria.map((row, i) => (
                    <tr key={i} className="border-t border-[var(--color-border)]">
                      <td className="py-3 px-4 font-medium text-[var(--color-primary)]">{row.criteria}</td>
                      <td className="py-3 px-4 text-[var(--color-text-secondary)]">{row.weight}</td>
                      <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">{row.questions}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="w-12 h-8 border border-[var(--color-border)] rounded bg-gray-50 mx-auto"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-[var(--color-bg-secondary)] rounded-lg">
              <p className="font-semibold text-[var(--color-text-primary)] mb-2">Scoring guidance:</p>
              <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                <li><span className="text-green-600 font-medium">4.0+ overall:</span> Strong candidate, proceed with confidence</li>
                <li><span className="text-amber-600 font-medium">3.0-3.9:</span> Viable but address weaknesses before committing</li>
                <li><span className="text-red-600 font-medium">Below 3.0:</span> Significant concerns, explore alternatives</li>
              </ul>
              <p className="text-sm text-[var(--color-text-muted)] mt-3">
                Any single criterion scoring below 2 should trigger pause regardless of overall score — a tool that&apos;s perfect except for data security isn&apos;t a tool you should use.
              </p>
            </div>
          </div>

          <TryThisBox>
            <p className="font-semibold mb-2">Pressure-test one AI tool.</p>
            <p className="mb-3">
              Pick an AI tool you&apos;re currently evaluating or already using. Get answers to these questions:
            </p>
            <ol className="list-decimal list-inside mb-3 space-y-1">
              <li>What data is used to train or improve the model?</li>
              <li>Where is our data processed and stored?</li>
              <li>What&apos;s the accuracy rate for our specific use case (not general benchmarks)?</li>
              <li>Can we audit or explain outputs when needed?</li>
              <li>What happens to our data if we cancel?</li>
            </ol>
            <p>
              Vendors who can&apos;t answer clearly aren&apos;t necessarily hiding something — but the gaps tell you where your risk sits. Incomplete answers are informative answers.
            </p>
          </TryThisBox>
        </div>
      </Section>

      {/* Module 4: Building the Business Case */}
      <Section background="light" id="module-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
                4
              </span>
              <h2 className="mb-0">Building the Business Case</h2>
            </div>
            <ModuleDepthIndicator depth="overview" />
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            AI investments don&apos;t fit neatly into traditional ROI models. Productivity gains are real but hard to measure. Value accrues over time as capability builds. Some benefits are defensive — avoiding future costs rather than generating immediate returns.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            This module addresses how to build rigorous business cases that account for AI&apos;s unique characteristics, satisfy sceptical stakeholders, and protect against both over-investment and under-investment.
          </p>

          <KeyQuestionsList
            questions={[
              'How do we quantify productivity gains that don\'t show up cleanly in headcount or hours?',
              'What costs are routinely overlooked in AI implementation planning?',
              'How do we model the learning curve and adoption lag realistically?',
              'What does a credible AI ROI timeline actually look like?',
              'How do we present AI investments to boards who\'ve been burned by tech hype before?',
            ]}
          />

          <WhyItMattersBox>
            A weak business case leads to one of two bad outcomes: good initiatives get killed by scepticism, or bad initiatives get funded by enthusiasm. Rigorous thinking protects against both — and builds the credibility that makes future investments easier to approve.
          </WhyItMattersBox>
        </div>
      </Section>

      {/* Module 5: Leading Adoption */}
      <Section background="white" id="module-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
                5
              </span>
              <h2 className="mb-0">Leading Adoption</h2>
            </div>
            <ModuleDepthIndicator depth="overview" />
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Most AI initiatives don&apos;t fail because the technology doesn&apos;t work. They fail because people don&apos;t use it, don&apos;t trust it, or actively resist it.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            This module focuses on the human side of AI implementation — building genuine buy-in, managing legitimate concerns, developing capability across the organisation, and maintaining momentum when initial excitement fades.
          </p>

          <KeyQuestionsList
            questions={[
              'How do we address fear and resistance without dismissing legitimate concerns?',
              'What does effective AI change management actually look like in practice?',
              'How do we build AI capability across the organisation, not just in technical teams?',
              'Who needs to be involved in AI initiatives, and when?',
              'How do we sustain momentum after the novelty wears off?',
            ]}
          />

          <WhyItMattersBox>
            The pattern is consistent: organisations that treat AI as a technology project struggle; organisations that treat it as a change management challenge succeed. The technology is the easy part. Bringing people along is where leadership earns its keep.
          </WhyItMattersBox>
        </div>
      </Section>

      {/* Module 6: Governance & Risk */}
      <Section background="light" id="module-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
                6
              </span>
              <h2 className="mb-0">Governance & Risk</h2>
            </div>
            <ModuleDepthIndicator depth="overview" />
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            AI introduces risks that traditional governance frameworks don&apos;t fully address: outputs that can&apos;t always be explained, biases that emerge from training data, hallucinations presented with confidence, security vulnerabilities in new shapes.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            This module covers how to implement proportionate governance — enough structure to manage genuine risks without creating bureaucracy that kills innovation.
          </p>

          <KeyQuestionsList
            questions={[
              'What are the specific risks AI introduces that other technologies don\'t?',
              'What does right-sized AI governance look like for SMEs (not enterprise bureaucracy)?',
              'How do we stay compliant as regulations evolve across jurisdictions?',
              'What policies should be in place before we scale AI use?',
              'How do we balance moving quickly with appropriate caution?',
            ]}
          />

          <WhyItMattersBox>
            Good governance isn&apos;t a brake on AI adoption — it&apos;s an accelerator. Clear policies and understood boundaries let teams move faster with confidence, rather than slower with anxiety. The organisations scaling AI effectively aren&apos;t the ones ignoring risk; they&apos;re the ones managing it systematically.
          </WhyItMattersBox>
        </div>
      </Section>

      {/* Module 7: Measuring Success */}
      <Section background="white" id="module-7">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
                7
              </span>
              <h2 className="mb-0">Measuring Success</h2>
            </div>
            <ModuleDepthIndicator depth="overview" />
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Knowing whether AI initiatives are working sounds straightforward. It isn&apos;t.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Attribution is complex — isolating AI&apos;s impact from other variables requires thought. Metrics that matter vary by use case. Leading indicators differ from lagging ones. And &quot;everyone seems to like it&quot; isn&apos;t a measurement strategy.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-8">
            This module covers how to build meaningful measurement frameworks that tell you what&apos;s actually working, what needs adjustment, and when to scale, pivot, or stop.
          </p>

          <KeyQuestionsList
            questions={[
              'What metrics matter for different types of AI implementation?',
              'How do we isolate AI impact from other changes happening simultaneously?',
              'What are the leading indicators that predict eventual success or failure?',
              'When should we scale, pivot, or stop an AI initiative?',
              'What does a practical AI performance dashboard look like?',
            ]}
          />

          <WhyItMattersBox>
            What gets measured gets managed. Clear measurement disciplines investment decisions, builds organisational confidence through demonstrated results, and prevents the drift from &quot;promising pilot&quot; to &quot;zombie project&quot; that plagues so many AI initiatives.
          </WhyItMattersBox>
        </div>
      </Section>

      {/* The Full Picture */}
      <Section background="light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-6">The Full Picture</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-6 text-center">
            This curriculum spans the complete executive AI journey: from building foundational understanding, through identifying and evaluating opportunities, to leading implementation and measuring outcomes.
          </p>
          <p className="text-[var(--color-text-secondary)] mb-6 text-center">
            Each module builds on the last. Foundations enable better opportunity identification. Good evaluation prevents wasted investment. Strong business cases secure resources. Effective leadership drives adoption. Sound governance manages risk. Clear measurement proves value and informs the next cycle.
          </p>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <p className="text-[var(--color-text-secondary)] text-center">
              That said, frameworks only go so far. Every organisation has different starting points, industry dynamics, team capabilities, and strategic priorities. The principles are consistent; the application is always specific.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ color: 'white' }} className="mb-4">Ready to bring this to your leadership team?</h2>
          <p className="text-lg text-white mb-4 max-w-2xl mx-auto">
            This curriculum adapts to your context — your industry, your challenges, your team&apos;s starting point.
          </p>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            We deliver customised executive workshops that turn AI understanding into confident action. Whether you&apos;re building foundational literacy across your leadership team or working through specific implementation challenges, we design training around what you actually need.
          </p>
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
          >
            Reach out for a customised executive workshop
          </Button>
        </div>
      </section>

      {/* About Section */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--color-text-secondary)] italic">
            The AI Guides helps Australian businesses adopt AI with clarity and confidence. We provide practical strategy, executive training, and team capability building — focused on what works in the real world, not just theory.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <Link href="/about" className="text-[var(--color-primary)] hover:underline text-sm">
              About Us
            </Link>
            <Link href="/services" className="text-[var(--color-primary)] hover:underline text-sm">
              Our Services
            </Link>
            <Link href="/ai-readiness-survey" className="text-[var(--color-primary)] hover:underline text-sm">
              AI Readiness Survey
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
