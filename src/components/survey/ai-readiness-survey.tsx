'use client';

import { useState, useCallback } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Types
interface QuestionOption {
  label: string;
  description: string;
  score: number;
}

interface Question {
  category: Category;
  question: string;
  options: QuestionOption[];
}

type Category = 'Strategy' | 'People' | 'Process' | 'Data' | 'Governance';

interface CategoryConfig {
  icon: string;
  color: string;
  bgClass: string;
}

interface Recommendation {
  title: string;
  description: string;
}

// Questions Data
const questions: Question[] = [
  // STRATEGY (4 questions)
  {
    category: 'Strategy',
    question: "How well-defined is your organization's AI strategy and vision?",
    options: [
      { label: 'No AI strategy', description: "We haven't developed any formal AI strategy or vision", score: 1 },
      { label: 'Informal discussions', description: 'Some conversations about AI, but no documented strategy', score: 2 },
      { label: 'Documented strategy', description: 'We have a written AI strategy aligned with some business goals', score: 3 },
      { label: 'Comprehensive roadmap', description: 'Clear AI vision with detailed roadmap tied to business objectives', score: 4 },
    ],
  },
  {
    category: 'Strategy',
    question: 'How does leadership support AI initiatives in your organization?',
    options: [
      { label: 'No executive support', description: 'Leadership is not engaged or aware of AI potential', score: 1 },
      { label: 'Passive interest', description: 'Some curiosity from leadership but no active sponsorship', score: 2 },
      { label: 'Active sponsorship', description: 'One or more executives champion AI with allocated resources', score: 3 },
      { label: 'Strategic priority', description: 'AI is a board-level priority with dedicated budget and governance', score: 4 },
    ],
  },
  {
    category: 'Strategy',
    question: 'How do you identify and prioritize AI use cases?',
    options: [
      { label: 'Ad-hoc exploration', description: 'No systematic approach to identifying AI opportunities', score: 1 },
      { label: 'Reactive approach', description: 'We explore AI when specific problems arise', score: 2 },
      { label: 'Structured evaluation', description: 'We have criteria to evaluate and prioritize AI use cases', score: 3 },
      { label: 'Value-driven portfolio', description: 'Systematic process linking use cases to measurable business value', score: 4 },
    ],
  },
  {
    category: 'Strategy',
    question: 'How do you measure the ROI and impact of AI initiatives?',
    options: [
      { label: 'No measurement', description: "We don't track AI initiative outcomes", score: 1 },
      { label: 'Basic tracking', description: 'We track some outputs but lack comprehensive metrics', score: 2 },
      { label: 'KPI framework', description: 'Defined KPIs for AI projects with regular reporting', score: 3 },
      { label: 'Continuous optimization', description: 'Real-time dashboards with feedback loops for improvement', score: 4 },
    ],
  },
  // PEOPLE (4 questions)
  {
    category: 'People',
    question: 'What is the current level of AI literacy across your organization?',
    options: [
      { label: 'Very limited', description: 'Most employees have little understanding of AI', score: 1 },
      { label: 'Basic awareness', description: 'General awareness exists but skills are concentrated in IT', score: 2 },
      { label: 'Growing competency', description: 'Multiple departments have AI-literate team members', score: 3 },
      { label: 'Widespread fluency', description: 'AI literacy is embedded across all levels and functions', score: 4 },
    ],
  },
  {
    category: 'People',
    question: 'How equipped is your workforce to work alongside AI tools?',
    options: [
      { label: 'Not equipped', description: 'Employees lack training and tools to use AI effectively', score: 1 },
      { label: 'Early adoption', description: 'Some teams experimenting with AI tools informally', score: 2 },
      { label: 'Structured enablement', description: 'Training programs and approved tools available', score: 3 },
      { label: 'AI-augmented workforce', description: 'AI tools integrated into workflows with ongoing upskilling', score: 4 },
    ],
  },
  {
    category: 'People',
    question: 'How does your organization address AI talent needs?',
    options: [
      { label: 'No plan', description: "We haven't addressed AI talent requirements", score: 1 },
      { label: 'Reactive hiring', description: 'Hiring AI talent as specific needs arise', score: 2 },
      { label: 'Talent strategy', description: 'Proactive recruiting and internal development programs', score: 3 },
      { label: 'Talent ecosystem', description: 'Comprehensive approach including partnerships, academies, retention', score: 4 },
    ],
  },
  {
    category: 'People',
    question: 'How is change management handled for AI adoption?',
    options: [
      { label: 'No change management', description: 'AI changes implemented without structured support', score: 1 },
      { label: 'Basic communication', description: 'Some announcements but limited change support', score: 2 },
      { label: 'Formal program', description: 'Change management processes for major AI initiatives', score: 3 },
      { label: 'Culture of adaptation', description: 'Embedded change capability with continuous learning mindset', score: 4 },
    ],
  },
  // PROCESS (4 questions)
  {
    category: 'Process',
    question: 'How mature are your processes for developing and deploying AI solutions?',
    options: [
      { label: 'No defined process', description: 'AI development is ad-hoc without standard practices', score: 1 },
      { label: 'Basic workflows', description: 'Some documented steps but inconsistent application', score: 2 },
      { label: 'Standardized methodology', description: 'Defined AI development lifecycle with quality gates', score: 3 },
      { label: 'MLOps excellence', description: 'Automated pipelines with CI/CD, monitoring, and retraining', score: 4 },
    ],
  },
  {
    category: 'Process',
    question: 'How well integrated is AI into your core business processes?',
    options: [
      { label: 'Not integrated', description: 'AI exists as isolated experiments or proofs of concept', score: 1 },
      { label: 'Limited integration', description: 'AI supports a few specific workflows', score: 2 },
      { label: 'Meaningful integration', description: 'AI embedded in multiple key business processes', score: 3 },
      { label: 'Core to operations', description: 'AI is fundamental to how we operate and compete', score: 4 },
    ],
  },
  {
    category: 'Process',
    question: 'How do you handle AI model maintenance and updates?',
    options: [
      { label: 'No maintenance plan', description: 'Models deployed without ongoing maintenance consideration', score: 1 },
      { label: 'Reactive fixes', description: 'We address issues when they become apparent', score: 2 },
      { label: 'Scheduled reviews', description: 'Regular model performance reviews and planned updates', score: 3 },
      { label: 'Continuous monitoring', description: 'Automated drift detection with proactive retraining', score: 4 },
    ],
  },
  {
    category: 'Process',
    question: 'How do you scale successful AI pilots to production?',
    options: [
      { label: 'Struggle to scale', description: 'Pilots rarely make it to production deployment', score: 1 },
      { label: 'Case-by-case', description: 'Some pilots scale but without repeatable process', score: 2 },
      { label: 'Scaling playbook', description: 'Documented approach for transitioning pilots to production', score: 3 },
      { label: 'Industrialized scaling', description: 'Platform and processes enable rapid, reliable scaling', score: 4 },
    ],
  },
  // DATA (4 questions)
  {
    category: 'Data',
    question: 'How would you rate the quality and accessibility of your data?',
    options: [
      { label: 'Poor quality/siloed', description: 'Data is scattered, inconsistent, and hard to access', score: 1 },
      { label: 'Improving', description: 'Some data cleaning efforts but significant gaps remain', score: 2 },
      { label: 'Good foundation', description: 'Clean, documented data with reasonable accessibility', score: 3 },
      { label: 'Data excellence', description: 'High-quality, well-governed data readily available for AI', score: 4 },
    ],
  },
  {
    category: 'Data',
    question: 'How mature is your data infrastructure for AI workloads?',
    options: [
      { label: 'Legacy systems', description: 'Outdated infrastructure not suited for AI workloads', score: 1 },
      { label: 'Basic capability', description: 'Some modern tools but limited AI-specific infrastructure', score: 2 },
      { label: 'AI-ready platform', description: 'Modern data platform supporting AI development needs', score: 3 },
      { label: 'Advanced architecture', description: 'Scalable, cloud-native infrastructure optimized for AI/ML', score: 4 },
    ],
  },
  {
    category: 'Data',
    question: 'How do you manage data governance and data privacy?',
    options: [
      { label: 'Minimal governance', description: 'Limited policies or controls around data usage', score: 1 },
      { label: 'Basic policies', description: 'Some data policies but inconsistent enforcement', score: 2 },
      { label: 'Formal governance', description: 'Comprehensive data governance with privacy controls', score: 3 },
      { label: 'Privacy by design', description: 'Advanced governance with automated compliance and privacy', score: 4 },
    ],
  },
  {
    category: 'Data',
    question: 'How prepared is your data for AI training and deployment?',
    options: [
      { label: 'Not prepared', description: 'Data needs significant work before AI use', score: 1 },
      { label: 'Partially ready', description: 'Some datasets ready but labeling/preparation gaps exist', score: 2 },
      { label: 'Mostly ready', description: 'Well-curated datasets available for key use cases', score: 3 },
      { label: 'Fully optimized', description: 'Feature stores, data pipelines, and versioning in place', score: 4 },
    ],
  },
  // GOVERNANCE (4 questions)
  {
    category: 'Governance',
    question: 'How does your organization approach AI ethics and responsible AI?',
    options: [
      { label: 'Not addressed', description: "AI ethics hasn't been formally considered", score: 1 },
      { label: 'Awareness stage', description: 'Discussions happening but no formal framework', score: 2 },
      { label: 'Guidelines in place', description: 'Documented AI ethics principles and review processes', score: 3 },
      { label: 'Embedded in culture', description: 'Responsible AI is core to strategy with governance structures', score: 4 },
    ],
  },
  {
    category: 'Governance',
    question: 'How do you manage AI-related risks?',
    options: [
      { label: 'No risk framework', description: 'AI risks not systematically identified or managed', score: 1 },
      { label: 'Basic awareness', description: 'Some risks recognized but no formal management', score: 2 },
      { label: 'Risk framework', description: 'AI risks assessed and managed within enterprise risk', score: 3 },
      { label: 'Proactive management', description: 'Comprehensive AI risk management with continuous monitoring', score: 4 },
    ],
  },
  {
    category: 'Governance',
    question: 'How compliant are your AI practices with relevant regulations?',
    options: [
      { label: 'Unknown status', description: "Haven't assessed AI regulatory requirements", score: 1 },
      { label: 'Initial assessment', description: 'Aware of regulations but compliance gaps exist', score: 2 },
      { label: 'Compliance program', description: 'Active program to meet AI regulatory requirements', score: 3 },
      { label: 'Ahead of regulations', description: 'Proactively exceeding requirements with audit readiness', score: 4 },
    ],
  },
  {
    category: 'Governance',
    question: 'How transparent and explainable are your AI systems?',
    options: [
      { label: 'Black box', description: 'AI decisions cannot be explained or audited', score: 1 },
      { label: 'Limited visibility', description: 'Some documentation but explainability is limited', score: 2 },
      { label: 'Explainable outputs', description: 'Key AI systems have explainability mechanisms', score: 3 },
      { label: 'Full transparency', description: 'Comprehensive explainability with stakeholder-appropriate views', score: 4 },
    ],
  },
];

// Category configurations
const categoryConfig: Record<Category, CategoryConfig> = {
  Strategy: { icon: '🎯', color: '#2563eb', bgClass: 'bg-blue-100' },
  People: { icon: '👥', color: '#10b981', bgClass: 'bg-emerald-100' },
  Process: { icon: '⚙️', color: '#f59e0b', bgClass: 'bg-amber-100' },
  Data: { icon: '💾', color: '#8b5cf6', bgClass: 'bg-violet-100' },
  Governance: { icon: '🛡️', color: '#ec4899', bgClass: 'bg-pink-100' },
};

// Recommendations database
const recommendationsByCategory: Record<Category, { low: Recommendation; medium: Recommendation; high: Recommendation }> = {
  Strategy: {
    low: {
      title: 'Develop Your AI Strategy Foundation',
      description: 'Start by defining clear AI objectives tied to business outcomes. Identify 2-3 high-impact use cases that can demonstrate value quickly. Secure executive sponsorship and establish a cross-functional AI steering committee to guide priorities.',
    },
    medium: {
      title: 'Strengthen Strategic Alignment',
      description: 'Refine your AI roadmap with specific milestones and success metrics. Create a business case framework for AI investments that quantifies expected ROI. Consider developing an AI Center of Excellence to coordinate efforts.',
    },
    high: {
      title: 'Optimize for Competitive Advantage',
      description: 'Focus on differentiating AI capabilities that create sustainable competitive advantage. Explore advanced applications like AI-driven business model innovation. Share learnings and establish thought leadership in your industry.',
    },
  },
  People: {
    low: {
      title: 'Build AI Literacy and Awareness',
      description: 'Launch an organization-wide AI awareness program covering basics and potential applications. Identify AI champions in each department. Start with accessible AI tools that provide quick wins and build confidence.',
    },
    medium: {
      title: 'Accelerate Skill Development',
      description: 'Implement role-specific AI training programs. Create clear career paths for AI roles. Establish communities of practice and encourage experimentation. Consider partnerships with universities or training providers.',
    },
    high: {
      title: 'Cultivate an AI-First Culture',
      description: 'Embed AI thinking into all roles and decisions. Create innovation programs that encourage AI experimentation. Develop internal AI certification programs and recognize AI achievements across the organization.',
    },
  },
  Process: {
    low: {
      title: 'Establish AI Development Foundations',
      description: 'Document basic AI/ML workflows and quality standards. Start with well-defined pilot projects to build capabilities. Create templates for AI project planning, risk assessment, and success criteria.',
    },
    medium: {
      title: 'Standardize and Scale Operations',
      description: 'Implement MLOps practices for reliable model deployment. Create reusable components and accelerators. Establish model monitoring and alerting. Build a portfolio view of AI initiatives across the organization.',
    },
    high: {
      title: 'Achieve Operational Excellence',
      description: 'Implement advanced MLOps with automated retraining and deployment. Create self-service platforms for business users. Focus on reducing time-to-value for new AI initiatives through platform investments.',
    },
  },
  Data: {
    low: {
      title: 'Improve Data Fundamentals',
      description: 'Conduct a data audit to understand current state and gaps. Prioritize data quality improvements for key AI use cases. Establish basic data governance and create a data catalog to improve discoverability.',
    },
    medium: {
      title: 'Modernize Data Infrastructure',
      description: 'Invest in scalable, AI-ready data platforms. Implement data quality monitoring and automated validation. Create feature stores and data pipelines to accelerate AI development. Strengthen data privacy controls.',
    },
    high: {
      title: 'Maximize Data Value',
      description: 'Implement advanced data architectures like data mesh or data fabric. Create real-time data pipelines for operational AI. Explore synthetic data generation and external data partnerships to enhance AI capabilities.',
    },
  },
  Governance: {
    low: {
      title: 'Establish Responsible AI Foundations',
      description: 'Develop AI ethics principles aligned with company values. Create basic risk assessment processes for AI projects. Start tracking AI regulatory requirements relevant to your industry and geography.',
    },
    medium: {
      title: 'Formalize AI Governance',
      description: 'Implement an AI governance framework with clear roles and responsibilities. Establish model documentation standards and review processes. Create audit trails for AI decisions and conduct regular ethics reviews.',
    },
    high: {
      title: 'Lead in Responsible AI',
      description: 'Implement advanced explainability and fairness monitoring. Conduct regular AI audits and third-party assessments. Share responsible AI practices externally and contribute to industry standards development.',
    },
  },
};

// Helper functions
function getCategoryScores(answers: (number | null)[]): Record<Category, number> {
  const scores: Record<Category, number> = {
    Strategy: 0,
    People: 0,
    Process: 0,
    Data: 0,
    Governance: 0,
  };

  questions.forEach((q, idx) => {
    if (answers[idx] !== null) {
      scores[q.category] += q.options[answers[idx]].score;
    }
  });

  return scores;
}

function getMaturityLevel(score: number): { level: string; className: string } {
  const percentage = (score / 80) * 100;
  if (percentage >= 75) return { level: 'Advanced', className: 'bg-emerald-100 text-emerald-700' };
  if (percentage >= 50) return { level: 'Established', className: 'bg-cyan-100 text-cyan-700' };
  if (percentage >= 25) return { level: 'Developing', className: 'bg-amber-100 text-amber-700' };
  return { level: 'Beginner', className: 'bg-red-100 text-red-700' };
}

function getRecommendationLevel(score: number, maxScore: number): 'low' | 'medium' | 'high' {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
}

// Components
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
        Free Assessment
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
        AI Readiness <span className="text-[var(--color-primary)]">Assessment</span>
      </h2>
      <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8">
        Discover how prepared your organization is to leverage AI effectively and identify key opportunities for improvement.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
        {[
          { icon: '📊', title: 'Comprehensive Analysis', desc: '20 questions across 5 key dimensions' },
          { icon: '🎯', title: 'Personalized Insights', desc: 'Tailored recommendations for your gaps' },
          { icon: '📄', title: 'Visual Results', desc: 'Radar chart showing your strengths' },
          { icon: '⏱️', title: 'Quick & Easy', desc: 'Complete in under 10 minutes' },
        ].map((feature) => (
          <div key={feature.title} className="bg-white p-4 rounded-xl shadow-sm text-left">
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{feature.title}</h3>
            <p className="text-sm text-[var(--color-text-muted)]">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-bg-secondary)] border-l-4 border-[var(--color-primary)] p-4 rounded-r-lg max-w-xl mx-auto mb-8 text-left">
        <p className="text-sm text-[var(--color-text-secondary)]">
          <strong>How it works:</strong> Answer 20 questions honestly to get an accurate picture of your organization&apos;s AI readiness. You&apos;ll receive a detailed breakdown with specific recommendations.
        </p>
      </div>

      <Button onClick={onStart} size="lg">
        Start Assessment →
      </Button>
    </div>
  );
}

function ProgressBar({ currentQuestion, totalQuestions, category }: { currentQuestion: number; totalQuestions: number; category: Category }) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide">
          {category}
        </span>
        <span className="text-sm text-[var(--color-text-muted)]">
          {currentQuestion + 1} of {totalQuestions}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-primary)] to-cyan-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  onNext,
  isFirst,
  isLast,
}: {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
        <div className="text-sm text-gray-400 mb-2">Question {questionNumber}</div>
        <h3 className="text-xl font-semibold">{question.question}</h3>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onSelectAnswer(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedAnswer === idx
                  ? 'border-[var(--color-primary)] bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    selectedAnswer === idx
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedAnswer === idx && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-[var(--color-text-primary)]">{option.label}</div>
                  <div className="text-sm text-[var(--color-text-muted)] mt-1">{option.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between p-6 border-t border-gray-100">
        <Button
          variant="secondary"
          onClick={onPrevious}
          className={isFirst ? 'invisible' : ''}
        >
          ← Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={selectedAnswer === null}
        >
          {isLast ? 'See Results →' : 'Next →'}
        </Button>
      </div>
    </div>
  );
}

function ResultsScreen({
  answers,
  onRestart,
}: {
  answers: (number | null)[];
  onRestart: () => void;
}) {
  const categoryScores = getCategoryScores(answers);
  const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);
  const maturity = getMaturityLevel(totalScore);
  const scorePercent = (totalScore / 80) * 100;

  // Get recommendations sorted by priority (lowest scores first)
  const sortedCategories = (Object.entries(categoryScores) as [Category, number][])
    .sort(([, a], [, b]) => a - b);

  const recommendations = sortedCategories.map(([category, score]) => ({
    category,
    score,
    ...recommendationsByCategory[category][getRecommendationLevel(score, 16)],
  }));

  // Chart data
  const chartData = {
    labels: ['Strategy', 'People', 'Process', 'Data', 'Governance'],
    datasets: [
      {
        label: 'Your Score',
        data: [
          categoryScores.Strategy,
          categoryScores.People,
          categoryScores.Process,
          categoryScores.Data,
          categoryScores.Governance,
        ],
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(37, 99, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(37, 99, 235, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 16,
        ticks: {
          stepSize: 4,
          font: { size: 11 },
        },
        pointLabels: {
          font: { size: 12, weight: 600 as const },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Your AI Readiness Results</h2>
        <p className="text-gray-400 mb-6">Here&apos;s a comprehensive breakdown of your organization&apos;s AI maturity</p>

        <div className="flex justify-center">
          <div className="relative">
            <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="10"
                strokeDasharray={`${scorePercent * 2.83} 283`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{totalScore}</span>
              <span className="text-gray-400">of 80</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <span className={`inline-block px-4 py-2 rounded-full font-semibold ${maturity.className}`}>
            {maturity.level}
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            📊 Score by Category
          </h3>
          <div className="space-y-4">
            {(Object.entries(categoryScores) as [Category, number][]).map(([category, score]) => (
              <div key={category} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${categoryConfig[category].bgClass}`}>
                  {categoryConfig[category].icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-[var(--color-text-primary)]">{category}</div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(score / 16) * 100}%`,
                        backgroundColor: categoryConfig[category].color,
                      }}
                    />
                  </div>
                </div>
                <div className="font-bold text-sm text-[var(--color-text-secondary)] min-w-[50px] text-right">
                  {score}/16
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            🕸️ Radar Analysis
          </h3>
          <div className="aspect-square max-w-[300px] mx-auto">
            <Radar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          💡 Tailored Recommendations
        </h3>
        <div className="space-y-4">
          {recommendations.slice(0, 3).map((rec, idx) => (
            <div
              key={rec.category}
              className="flex gap-4 p-4 bg-[var(--color-bg-secondary)] rounded-xl border-l-4 border-[var(--color-primary)]"
            >
              <div className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                  {rec.title}
                  <span className="text-sm font-normal text-[var(--color-text-muted)] ml-2">
                    ({rec.category}: {rec.score}/16)
                  </span>
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-cyan-500 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to Accelerate Your AI Journey?</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          Our team of AI experts can help you implement these recommendations and build a roadmap tailored to your organization&apos;s unique needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="secondary" size="lg">
            Schedule a Consultation
          </Button>
          <Button variant="outline" size="lg" onClick={onRestart} className="border-white text-white hover:bg-white hover:text-[var(--color-primary)]">
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}

// Main Component
export function AIReadinessSurvey() {
  const [stage, setStage] = useState<'welcome' | 'assessment' | 'results'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  const handleStart = useCallback(() => {
    setStage('assessment');
  }, []);

  const handleSelectAnswer = useCallback((answerIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answerIndex;
      return newAnswers;
    });
  }, [currentQuestion]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (answers[currentQuestion] === null) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setStage('results');
    }
  }, [currentQuestion, answers]);

  const handleRestart = useCallback(() => {
    setStage('welcome');
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
  }, []);

  if (stage === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (stage === 'results') {
    return <ResultsScreen answers={answers} onRestart={handleRestart} />;
  }

  const question = questions[currentQuestion];

  return (
    <div>
      <ProgressBar
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        category={question.category}
      />
      <QuestionCard
        question={question}
        questionNumber={currentQuestion + 1}
        selectedAnswer={answers[currentQuestion]}
        onSelectAnswer={handleSelectAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        isFirst={currentQuestion === 0}
        isLast={currentQuestion === questions.length - 1}
      />
    </div>
  );
}
