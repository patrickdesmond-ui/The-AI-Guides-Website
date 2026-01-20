'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
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

interface RespondentData {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
}

type Industry =
  | 'Professional Services'
  | 'Retail & E-commerce'
  | 'Manufacturing'
  | 'Healthcare'
  | 'Construction & Trades'
  | 'Hospitality & Tourism'
  | 'Financial Services'
  | 'Education & Training'
  | 'Agriculture'
  | 'Transport & Logistics'
  | 'Technology'
  | 'Other';

// Industry list for dropdown
const industries: Industry[] = [
  'Professional Services',
  'Retail & E-commerce',
  'Manufacturing',
  'Healthcare',
  'Construction & Trades',
  'Hospitality & Tourism',
  'Financial Services',
  'Education & Training',
  'Agriculture',
  'Transport & Logistics',
  'Technology',
  'Other',
];

// Questions Data - Simplified for business audience
const questions: Question[] = [
  // STRATEGY (4 questions)
  {
    category: 'Strategy',
    question: 'Does your business have a plan for using AI?',
    options: [
      { label: 'No plan yet', description: "We haven't thought about how AI could help our business", score: 1 },
      { label: 'Early discussions', description: "We've talked about AI but haven't documented anything", score: 2 },
      { label: 'Written plan', description: 'We have a document outlining how we want to use AI', score: 3 },
      { label: 'Detailed roadmap', description: 'We have a clear plan with timelines and goals for AI adoption', score: 4 },
    ],
  },
  {
    category: 'Strategy',
    question: 'How involved is your leadership team in AI decisions?',
    options: [
      { label: 'Not involved', description: 'Leadership has not engaged with AI opportunities', score: 1 },
      { label: 'Curious but passive', description: 'Some interest from leadership but no active involvement', score: 2 },
      { label: 'Actively supporting', description: 'One or more leaders champion AI with time and budget', score: 3 },
      { label: 'Strategic priority', description: 'AI is a key business priority with dedicated resources', score: 4 },
    ],
  },
  {
    category: 'Strategy',
    question: 'How do you decide where to use AI in your business?',
    options: [
      { label: 'No process', description: "We haven't identified where AI could help", score: 1 },
      { label: 'As problems arise', description: 'We consider AI when we face specific challenges', score: 2 },
      { label: 'Structured approach', description: 'We evaluate opportunities based on impact and feasibility', score: 3 },
      { label: 'Prioritised pipeline', description: 'We maintain a ranked list of AI opportunities tied to business value', score: 4 },
    ],
  },
  {
    category: 'Strategy',
    question: 'How do you measure if AI investments are working?',
    options: [
      { label: 'We do not measure', description: "We don't track outcomes from AI initiatives", score: 1 },
      { label: 'Basic tracking', description: 'We track some results but not systematically', score: 2 },
      { label: 'Clear metrics', description: 'We have defined measures for AI project success', score: 3 },
      { label: 'Regular reporting', description: 'We monitor AI performance regularly and adjust as needed', score: 4 },
    ],
  },
  // PEOPLE (4 questions)
  {
    category: 'People',
    question: 'How comfortable is your team with AI tools?',
    options: [
      { label: 'Very limited', description: 'Most staff have little understanding of AI', score: 1 },
      { label: 'Basic awareness', description: 'Some awareness but skills vary widely', score: 2 },
      { label: 'Growing confidence', description: 'Several team members actively use AI tools', score: 3 },
      { label: 'Widely confident', description: 'Most staff are comfortable using AI in their work', score: 4 },
    ],
  },
  {
    category: 'People',
    question: 'What training have you provided on AI?',
    options: [
      { label: 'No training', description: 'We have not offered any AI training', score: 1 },
      { label: 'Self-learning', description: 'Staff learn on their own without formal support', score: 2 },
      { label: 'Some training', description: 'We have provided training for some roles or tools', score: 3 },
      { label: 'Ongoing programs', description: 'Regular training keeps staff up to date with AI tools', score: 4 },
    ],
  },
  {
    category: 'People',
    question: 'How do you source AI skills for your business?',
    options: [
      { label: 'No plan', description: "We haven't thought about AI skills needs", score: 1 },
      { label: 'Hire when needed', description: 'We recruit AI skills when specific needs arise', score: 2 },
      { label: 'Proactive approach', description: 'We actively develop and recruit for AI capabilities', score: 3 },
      { label: 'Strategic talent plan', description: 'We have partnerships and programs to build AI expertise', score: 4 },
    ],
  },
  {
    category: 'People',
    question: 'How do you help staff adapt to AI changes?',
    options: [
      { label: 'No support', description: 'Changes happen without structured guidance', score: 1 },
      { label: 'Basic communication', description: 'We announce changes but offer limited support', score: 2 },
      { label: 'Change support', description: 'We help staff through AI-related transitions', score: 3 },
      { label: 'Change culture', description: 'Our team embraces continuous learning and adaptation', score: 4 },
    ],
  },
  // PROCESS (4 questions)
  {
    category: 'Process',
    question: 'How do you currently implement AI solutions?',
    options: [
      { label: 'Ad-hoc', description: 'We figure it out as we go without a set process', score: 1 },
      { label: 'Some steps defined', description: 'We have loose guidelines but apply them inconsistently', score: 2 },
      { label: 'Structured process', description: 'We follow a defined approach for AI projects', score: 3 },
      { label: 'Refined methodology', description: 'We have a proven, repeatable process that we improve over time', score: 4 },
    ],
  },
  {
    category: 'Process',
    question: 'How integrated is AI into your daily operations?',
    options: [
      { label: 'Not integrated', description: 'AI is separate from our main business processes', score: 1 },
      { label: 'Limited use', description: 'AI supports one or two workflows', score: 2 },
      { label: 'Multiple areas', description: 'AI is embedded in several key business processes', score: 3 },
      { label: 'Core to operations', description: 'AI is essential to how we run our business', score: 4 },
    ],
  },
  {
    category: 'Process',
    question: 'How do you maintain AI tools once implemented?',
    options: [
      { label: 'No maintenance', description: "We don't have a plan to maintain AI tools", score: 1 },
      { label: 'Fix when broken', description: 'We address issues only when they cause problems', score: 2 },
      { label: 'Regular reviews', description: 'We periodically check and update our AI tools', score: 3 },
      { label: 'Continuous monitoring', description: 'We proactively monitor and improve AI performance', score: 4 },
    ],
  },
  {
    category: 'Process',
    question: 'How successfully do you move AI pilots to full use?',
    options: [
      { label: 'Struggle to scale', description: 'Most pilots stay as experiments', score: 1 },
      { label: 'Some success', description: 'We scale occasionally but without a consistent approach', score: 2 },
      { label: 'Defined pathway', description: 'We have a process for moving pilots to production', score: 3 },
      { label: 'Reliable scaling', description: 'We consistently turn successful pilots into business value', score: 4 },
    ],
  },
  // DATA (4 questions)
  {
    category: 'Data',
    question: 'How would you rate the quality of your business data?',
    options: [
      { label: 'Poor quality', description: 'Our data is scattered, inconsistent, or hard to access', score: 1 },
      { label: 'Needs work', description: "We're improving but significant gaps remain", score: 2 },
      { label: 'Good foundation', description: 'Our data is generally clean and accessible', score: 3 },
      { label: 'High quality', description: 'We have well-organised, reliable data across the business', score: 4 },
    ],
  },
  {
    category: 'Data',
    question: 'Are your systems ready to support AI?',
    options: [
      { label: 'Outdated systems', description: 'Our technology is not suited for AI', score: 1 },
      { label: 'Basic capability', description: 'Some modern tools but limited AI readiness', score: 2 },
      { label: 'AI-ready', description: 'Our systems can support AI development needs', score: 3 },
      { label: 'Advanced setup', description: 'We have modern, scalable infrastructure optimised for AI', score: 4 },
    ],
  },
  {
    category: 'Data',
    question: 'How do you manage data privacy and security?',
    options: [
      { label: 'Minimal controls', description: 'We have limited policies around data usage', score: 1 },
      { label: 'Basic policies', description: 'Some policies exist but enforcement is inconsistent', score: 2 },
      { label: 'Formal governance', description: 'We have clear data governance and privacy controls', score: 3 },
      { label: 'Privacy by design', description: 'Privacy and security are built into everything we do', score: 4 },
    ],
  },
  {
    category: 'Data',
    question: 'How ready is your data for AI applications?',
    options: [
      { label: 'Not ready', description: 'Our data needs significant work before AI can use it', score: 1 },
      { label: 'Partially ready', description: 'Some data is ready but gaps exist', score: 2 },
      { label: 'Mostly ready', description: 'We have quality data available for key use cases', score: 3 },
      { label: 'Fully prepared', description: 'Our data is organised and ready for AI applications', score: 4 },
    ],
  },
  // GOVERNANCE (4 questions)
  {
    category: 'Governance',
    question: 'How do you approach responsible AI use?',
    options: [
      { label: 'Not considered', description: "We haven't formally thought about AI ethics", score: 1 },
      { label: 'Starting discussions', description: "We're talking about it but have no formal approach", score: 2 },
      { label: 'Guidelines in place', description: 'We have documented principles for responsible AI use', score: 3 },
      { label: 'Embedded in culture', description: 'Responsible AI is core to how we operate', score: 4 },
    ],
  },
  {
    category: 'Governance',
    question: 'How do you manage AI-related risks?',
    options: [
      { label: 'No framework', description: "We don't systematically identify AI risks", score: 1 },
      { label: 'Basic awareness', description: 'We recognise some risks but lack formal management', score: 2 },
      { label: 'Risk framework', description: 'AI risks are assessed within our business risk processes', score: 3 },
      { label: 'Proactive management', description: 'We actively monitor and mitigate AI risks', score: 4 },
    ],
  },
  {
    category: 'Governance',
    question: 'How do you ensure AI compliance with regulations?',
    options: [
      { label: 'Unknown status', description: "We haven't assessed regulatory requirements", score: 1 },
      { label: 'Aware of gaps', description: 'We know about regulations but have compliance gaps', score: 2 },
      { label: 'Active compliance', description: "We're working to meet all AI regulatory requirements", score: 3 },
      { label: 'Ahead of requirements', description: 'We proactively exceed regulatory expectations', score: 4 },
    ],
  },
  {
    category: 'Governance',
    question: 'Can you explain how your AI makes decisions?',
    options: [
      { label: 'Cannot explain', description: "We don't know how our AI tools reach conclusions", score: 1 },
      { label: 'Limited understanding', description: 'We have some idea but cannot fully explain', score: 2 },
      { label: 'Can explain key systems', description: 'We understand and can explain our main AI tools', score: 3 },
      { label: 'Full transparency', description: 'We can clearly explain all AI decisions to stakeholders', score: 4 },
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

// Maturity level descriptions
const maturityDescriptions: Record<string, string> = {
  Beginner: 'Your organisation is at the start of its AI journey. There are significant opportunities to build foundational capabilities and explore how AI can support your business goals. Focus on awareness, education, and identifying quick wins.',
  Developing: 'Your organisation has begun exploring AI with some initial efforts in place. Now is the time to formalise your approach, build on early successes, and address gaps in strategy, skills, or infrastructure.',
  Established: 'Your organisation has solid AI foundations across multiple areas. You are well-positioned to scale AI initiatives and drive measurable business value. Focus on optimisation and expanding successful use cases.',
  Advanced: 'Your organisation demonstrates strong AI maturity across all dimensions. You are leveraging AI as a strategic asset. Continue to innovate, share learnings, and maintain your competitive edge through continuous improvement.',
};

// Recommendations database
const recommendationsByCategory: Record<Category, { low: Recommendation; medium: Recommendation; high: Recommendation }> = {
  Strategy: {
    low: {
      title: 'Develop Your AI Strategy Foundation',
      description: 'Start by identifying 2-3 business problems where AI could help. Get leadership buy-in by showcasing potential ROI. Document a simple AI vision that aligns with your business goals.',
    },
    medium: {
      title: 'Strengthen Strategic Alignment',
      description: 'Create a prioritised list of AI opportunities with clear success criteria. Establish regular reviews to track progress and adjust your roadmap based on learnings.',
    },
    high: {
      title: 'Optimise for Competitive Advantage',
      description: 'Focus on AI capabilities that differentiate your business. Explore innovative applications and consider sharing your AI journey to build industry credibility.',
    },
  },
  People: {
    low: {
      title: 'Build AI Awareness and Skills',
      description: 'Start with basic AI training for all staff to demystify the technology. Identify enthusiastic team members who can champion AI adoption and help others get comfortable.',
    },
    medium: {
      title: 'Accelerate Skill Development',
      description: 'Implement role-specific training programs. Create opportunities for hands-on learning and encourage experimentation with AI tools in daily work.',
    },
    high: {
      title: 'Cultivate an AI-Ready Culture',
      description: 'Embed AI thinking across all roles. Recognise and reward AI innovation. Consider internal certification programs to maintain and grow expertise.',
    },
  },
  Process: {
    low: {
      title: 'Establish Basic AI Processes',
      description: 'Document simple workflows for evaluating and implementing AI tools. Start with low-risk pilots to build experience before tackling complex projects.',
    },
    medium: {
      title: 'Standardise and Scale Operations',
      description: 'Create repeatable processes for AI deployment. Establish monitoring to catch issues early. Build a portfolio view of AI initiatives across the business.',
    },
    high: {
      title: 'Achieve Operational Excellence',
      description: 'Automate routine AI maintenance tasks. Create self-service options for common AI needs. Focus on reducing time from idea to implementation.',
    },
  },
  Data: {
    low: {
      title: 'Improve Data Fundamentals',
      description: 'Audit your current data to understand gaps and quality issues. Start with basic data cleaning for priority areas. Create simple documentation of what data you have and where it lives.',
    },
    medium: {
      title: 'Modernise Data Infrastructure',
      description: 'Invest in tools that make data easier to access and use. Implement data quality checks. Strengthen privacy controls to build customer trust.',
    },
    high: {
      title: 'Maximise Data Value',
      description: 'Explore advanced data integration across your business. Consider how external data could enhance AI capabilities. Maintain high standards for data quality and governance.',
    },
  },
  Governance: {
    low: {
      title: 'Establish Responsible AI Foundations',
      description: 'Develop simple guidelines for ethical AI use aligned with your values. Identify key risks to watch for. Start tracking relevant regulations that may affect your AI use.',
    },
    medium: {
      title: 'Formalise AI Governance',
      description: 'Implement a governance framework with clear roles. Establish documentation standards for AI decisions. Create processes for regular ethics reviews.',
    },
    high: {
      title: 'Lead in Responsible AI',
      description: 'Implement advanced monitoring for AI fairness and accuracy. Consider independent audits. Share your responsible AI practices to build stakeholder confidence.',
    },
  },
};

// Industry-specific recommendations for SMEs
const industryRecommendations: Record<Industry, { title: string; recommendations: string[] }> = {
  'Professional Services': {
    title: 'AI Opportunities for Professional Services',
    recommendations: [
      'Use AI for document review, contract analysis, and research to free up billable hours for higher-value advisory work',
      'Implement AI-powered client intake and scheduling to improve responsiveness and reduce admin burden',
      'Deploy AI writing assistants to draft reports, proposals, and correspondence faster while maintaining quality',
      'Consider AI tools for compliance monitoring and deadline tracking to reduce risk exposure',
    ],
  },
  'Retail & E-commerce': {
    title: 'AI Opportunities for Retail & E-commerce',
    recommendations: [
      'Use AI for demand forecasting and inventory optimisation to reduce stockouts and overstock costs',
      'Implement personalised product recommendations to increase average order value and customer loyalty',
      'Deploy AI chatbots for customer service to handle common queries 24/7 and reduce support costs',
      'Leverage AI for dynamic pricing and promotion optimisation based on market conditions',
    ],
  },
  Manufacturing: {
    title: 'AI Opportunities for Manufacturing',
    recommendations: [
      'Implement predictive maintenance to reduce unplanned downtime and extend equipment life',
      'Use AI-powered quality control with computer vision to catch defects earlier in production',
      'Optimise supply chain operations with AI demand sensing and supplier risk monitoring',
      'Deploy AI for production scheduling to maximise throughput and minimise changeover time',
    ],
  },
  Healthcare: {
    title: 'AI Opportunities for Healthcare',
    recommendations: [
      'Use AI for appointment scheduling and patient communication to reduce no-shows and admin work',
      'Implement AI-assisted documentation to reduce clinical note-taking burden on practitioners',
      'Deploy AI tools for claims processing and coding to improve accuracy and speed reimbursement',
      'Consider AI for patient triage and symptom checking to optimise clinician time',
    ],
  },
  'Construction & Trades': {
    title: 'AI Opportunities for Construction & Trades',
    recommendations: [
      'Use AI for project estimating and quoting to improve accuracy and win more profitable jobs',
      'Implement AI-powered scheduling to optimise crew deployment and reduce travel time',
      'Deploy AI for site safety monitoring using camera feeds to identify hazards proactively',
      'Leverage AI for material ordering and inventory to reduce waste and ensure availability',
    ],
  },
  'Hospitality & Tourism': {
    title: 'AI Opportunities for Hospitality & Tourism',
    recommendations: [
      'Use AI for dynamic pricing to optimise room rates and maximise revenue per available unit',
      'Implement AI chatbots for bookings and guest queries to provide instant service at any hour',
      'Deploy AI for demand forecasting to optimise staffing levels and reduce labour costs',
      'Leverage AI for personalised guest experiences based on preferences and history',
    ],
  },
  'Financial Services': {
    title: 'AI Opportunities for Financial Services',
    recommendations: [
      'Use AI for fraud detection and prevention to protect clients and reduce losses',
      'Implement AI-powered document processing to speed up loan applications and account opening',
      'Deploy AI for client risk profiling and personalised product recommendations',
      'Consider AI chatbots for routine queries to free advisors for complex client needs',
    ],
  },
  'Education & Training': {
    title: 'AI Opportunities for Education & Training',
    recommendations: [
      'Use AI for personalised learning paths that adapt to individual student progress and needs',
      'Implement AI-powered assessment and feedback to reduce marking time while improving quality',
      'Deploy AI for student engagement monitoring to identify at-risk learners early',
      'Leverage AI for administrative tasks like enrolments, scheduling, and reporting',
    ],
  },
  Agriculture: {
    title: 'AI Opportunities for Agriculture',
    recommendations: [
      'Use AI for yield prediction and crop monitoring to optimise harvest timing and resource allocation',
      'Implement AI-powered pest and disease detection from imagery to enable early intervention',
      'Deploy AI for irrigation and fertiliser optimisation to reduce costs and environmental impact',
      'Consider AI for livestock health monitoring and feeding optimisation',
    ],
  },
  'Transport & Logistics': {
    title: 'AI Opportunities for Transport & Logistics',
    recommendations: [
      'Use AI for route optimisation to reduce fuel costs and improve delivery times',
      'Implement AI for demand forecasting to optimise fleet utilisation and capacity planning',
      'Deploy AI for predictive vehicle maintenance to minimise breakdowns and extend fleet life',
      'Leverage AI for warehouse operations including picking optimisation and inventory management',
    ],
  },
  Technology: {
    title: 'AI Opportunities for Technology Companies',
    recommendations: [
      'Use AI to enhance your products with intelligent features that differentiate from competitors',
      'Implement AI for code review and testing to improve software quality and developer productivity',
      'Deploy AI for customer support and ticket routing to resolve issues faster',
      'Leverage AI for sales intelligence and lead scoring to improve conversion rates',
    ],
  },
  Other: {
    title: 'AI Opportunities for Your Business',
    recommendations: [
      'Start with AI for routine administrative tasks like email management, scheduling, and document processing',
      'Use AI-powered customer service tools to improve responsiveness without adding headcount',
      'Implement AI for data analysis and reporting to surface insights from your business data',
      'Consider AI for content creation including marketing materials, proposals, and communications',
    ],
  },
};

// Formspree endpoint - User should replace with their own
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykknyqq';

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
  if (percentage >= 75) return { level: 'Advanced', className: 'bg-emerald-500 text-white' };
  if (percentage >= 50) return { level: 'Established', className: 'bg-cyan-500 text-white' };
  if (percentage >= 25) return { level: 'Developing', className: 'bg-amber-500 text-white' };
  return { level: 'Beginner', className: 'bg-orange-500 text-white' };
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
        Discover how prepared your organisation is to leverage AI and get tailored recommendations.
      </p>

      {/* How it Works Box */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mb-8">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">How It Works</h3>

        <div className="space-y-6 text-left">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-text-primary)]">Answer 20 Quick Questions</h4>
              <p className="text-[var(--color-text-muted)]">Takes about 5 minutes. Questions cover strategy, people, processes, data, and governance.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-text-primary)]">Get Your Readiness Score</h4>
              <p className="text-[var(--color-text-muted)]">See how you compare across five key dimensions with a visual breakdown.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-text-primary)]">Receive Tailored Recommendations</h4>
              <p className="text-[var(--color-text-muted)]">Get practical, industry-specific actions you can take to improve your AI readiness.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            Your responses are confidential and will be used to provide personalised insights.
          </p>
          <Button onClick={onStart} size="lg" className="w-full sm:w-auto">
            Start Survey →
          </Button>
        </div>
      </div>
    </div>
  );
}

function DataCaptureScreen({ onSubmit }: { onSubmit: (data: RespondentData) => void }) {
  const [formData, setFormData] = useState<RespondentData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
  });
  const [errors, setErrors] = useState<Partial<RespondentData>>({});

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Optional field
    // Australian phone format: starts with 0, 10 digits, or +61 format
    const ausPhoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
    return ausPhoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<RespondentData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Australian phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Don't submit to Formspree yet - we'll submit with full results at the end
    onSubmit(formData);
  };

  const handleChange = (field: keyof RespondentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
          Before We Begin
        </h2>
        <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
          Tell us a bit about yourself so we can tailor your results and send you a copy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto">
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all`}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Phone <span className="text-[var(--color-text-muted)]">(Optional)</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all`}
              placeholder="04XX XXX XXX"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
              placeholder="Your company name"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
              Industry
            </label>
            <select
              value={formData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all bg-white"
            >
              <option value="">Select your industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-[var(--color-text-muted)] mb-4">
            By continuing, you agree to receive your personalised results and occasional insights from The AI Guides. You can unsubscribe at any time.
          </p>
          <Button type="submit" size="lg" className="w-full">
            Continue to Survey →
          </Button>
        </div>
      </form>
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
  isFirst,
}: {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  onPrevious: () => void;
  isFirst: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-[var(--color-primary)] p-6">
        <div className="text-sm text-white/70 mb-2">Question {questionNumber}</div>
        <h3 className="text-xl font-semibold text-white">{question.question}</h3>
      </div>

      <div className="p-6">
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Select your answer to continue</p>
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

      {!isFirst && (
        <div className="p-6 border-t border-gray-100">
          <Button
            variant="secondary"
            onClick={onPrevious}
          >
            ← Previous
          </Button>
        </div>
      )}
    </div>
  );
}

function ResultsScreen({
  answers,
  respondentData,
  onRestart,
}: {
  answers: (number | null)[];
  respondentData: RespondentData;
  onRestart: () => void;
}) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [resultsSubmitted, setResultsSubmitted] = useState(false);

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

  // Get industry recommendations
  const industry = (respondentData.industry as Industry) || 'Other';
  const industryRecs = industryRecommendations[industry];

  // Build answers summary for Formspree
  const getAnswersSummary = () => {
    return questions.map((q, idx) => {
      const answerIdx = answers[idx];
      const selectedOption = answerIdx !== null ? q.options[answerIdx] : null;
      return {
        question: q.question,
        category: q.category,
        answer: selectedOption?.label || 'Not answered',
        score: selectedOption?.score || 0,
      };
    });
  };

  // Submit full results to Formspree when results load
  useEffect(() => {
    if (resultsSubmitted) return;

    const submitResults = async () => {
      const answersSummary = getAnswersSummary();

      try {
        await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _subject: `AI Readiness Survey: ${respondentData.name} (${maturity.level} - ${totalScore}/80)`,
            name: respondentData.name,
            email: respondentData.email,
            phone: respondentData.phone || 'Not provided',
            company: respondentData.company || 'Not provided',
            industry: respondentData.industry || 'Not provided',
            totalScore: `${totalScore}/80`,
            maturityLevel: maturity.level,
            strategyScore: `${categoryScores.Strategy}/16`,
            peopleScore: `${categoryScores.People}/16`,
            processScore: `${categoryScores.Process}/16`,
            dataScore: `${categoryScores.Data}/16`,
            governanceScore: `${categoryScores.Governance}/16`,
            answers: answersSummary.map(a => `${a.category} - ${a.question}: ${a.answer} (${a.score}/4)`).join('\n'),
          }),
        });
      } catch {
        console.warn('Failed to submit results to Formspree');
      }
      setResultsSubmitted(true);
    };

    submitResults();
  }, [resultsSubmitted]);

  // Email results to user
  const emailResults = async () => {
    setEmailSending(true);
    const answersSummary = getAnswersSummary();

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `Your AI Readiness Results - ${maturity.level} (${totalScore}/80)`,
          _replyto: respondentData.email,
          email: respondentData.email,
          _template: 'box',
          messageType: 'Results Email Request',
          name: respondentData.name,
          company: respondentData.company || 'Not provided',
          industry: respondentData.industry || 'Not provided',
          totalScore: `${totalScore}/80`,
          maturityLevel: maturity.level,
          maturityDescription: maturityDescriptions[maturity.level],
          categoryScores: `Strategy: ${categoryScores.Strategy}/16, People: ${categoryScores.People}/16, Process: ${categoryScores.Process}/16, Data: ${categoryScores.Data}/16, Governance: ${categoryScores.Governance}/16`,
          topRecommendations: recommendations.slice(0, 3).map((r, i) => `${i + 1}. ${r.title}: ${r.description}`).join('\n\n'),
          answers: answersSummary.map(a => `${a.category} - ${a.question}: ${a.answer} (${a.score}/4)`).join('\n'),
        }),
      });

      if (response.ok) {
        setEmailSent(true);
      }
    } catch {
      console.warn('Failed to email results');
    }
    setEmailSending(false);
  };

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

  const generatePDF = () => {
    const currentDate = new Date().toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const answersSummary = getAnswersSummary();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AI Readiness Assessment Report - ${respondentData.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; }
    .print-bar { background: #1e293b; color: white; padding: 15px 20px; margin: -40px -40px 30px -40px; display: flex; justify-content: space-between; align-items: center; }
    .print-bar h3 { font-size: 16px; }
    .print-btn { background: #2563eb; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
    .print-btn:hover { background: #1d4ed8; }
    .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #2563eb; font-size: 28px; margin-bottom: 5px; }
    .header p { color: #64748b; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #1e293b; font-size: 20px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    .info-item { font-size: 14px; }
    .info-item strong { color: #64748b; }
    .score-box { background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 20px; }
    .score-number { font-size: 48px; font-weight: bold; }
    .score-label { font-size: 14px; opacity: 0.8; }
    .maturity-badge { display: inline-block; background: white; color: #2563eb; padding: 8px 20px; border-radius: 20px; font-weight: 600; margin-top: 15px; }
    .maturity-description { background: #f8fafc; padding: 15px; border-radius: 8px; font-size: 14px; color: #475569; margin-bottom: 20px; }
    .category-row { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
    .category-name { width: 120px; font-weight: 500; }
    .category-bar { flex: 1; height: 12px; background: #e2e8f0; border-radius: 6px; margin: 0 15px; overflow: hidden; }
    .category-fill { height: 100%; border-radius: 6px; }
    .category-score { width: 50px; text-align: right; font-weight: 600; }
    .recommendation { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #2563eb; }
    .recommendation h4 { color: #1e293b; margin-bottom: 5px; }
    .recommendation p { font-size: 14px; color: #475569; }
    .industry-rec { padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
    .industry-rec:last-child { border-bottom: none; }
    .answer-item { padding: 10px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; }
    .answer-item:last-child { border-bottom: none; }
    .answer-question { flex: 1; font-size: 13px; }
    .answer-response { font-weight: 500; font-size: 13px; color: #2563eb; min-width: 120px; text-align: right; }
    .category-header { background: #1e293b; color: white; padding: 8px 12px; border-radius: 6px; margin: 20px 0 10px 0; font-weight: 600; font-size: 14px; }
    .cta-box { background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-top: 40px; }
    .cta-box h3 { font-size: 20px; margin-bottom: 10px; }
    .cta-box p { opacity: 0.9; margin-bottom: 15px; }
    .cta-box a { color: white; font-weight: 600; }
    @media print {
      body { padding: 20px; }
      .print-bar { display: none; }
      .cta-box { break-inside: avoid; }
      .section { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <h3>AI Readiness Assessment Report</h3>
    <button class="print-btn" onclick="window.print()">Save as PDF / Print</button>
  </div>

  <div class="header">
    <h1>AI Readiness Assessment Report</h1>
    <p>Generated for ${respondentData.name} on ${currentDate}</p>
  </div>

  <div class="section">
    <h2>Respondent Details</h2>
    <div class="info-grid">
      <div class="info-item"><strong>Name:</strong> ${respondentData.name}</div>
      <div class="info-item"><strong>Email:</strong> ${respondentData.email}</div>
      <div class="info-item"><strong>Company:</strong> ${respondentData.company || 'Not provided'}</div>
      <div class="info-item"><strong>Industry:</strong> ${respondentData.industry || 'Not provided'}</div>
      ${respondentData.phone ? `<div class="info-item"><strong>Phone:</strong> ${respondentData.phone}</div>` : ''}
    </div>
  </div>

  <div class="section">
    <h2>Overall Score</h2>
    <div class="score-box">
      <div class="score-number">${totalScore}</div>
      <div class="score-label">out of 80 points</div>
      <div class="maturity-badge">${maturity.level}</div>
    </div>
    <div class="maturity-description">
      ${maturityDescriptions[maturity.level]}
    </div>
  </div>

  <div class="section">
    <h2>Score by Category</h2>
    ${(Object.entries(categoryScores) as [Category, number][]).map(([cat, score]) => `
      <div class="category-row">
        <div class="category-name">${cat}</div>
        <div class="category-bar">
          <div class="category-fill" style="width: ${(score / 16) * 100}%; background: ${categoryConfig[cat].color};"></div>
        </div>
        <div class="category-score">${score}/16</div>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h2>Priority Recommendations</h2>
    ${recommendations.slice(0, 3).map((rec, idx) => `
      <div class="recommendation">
        <h4>${idx + 1}. ${rec.title} (${rec.category}: ${rec.score}/16)</h4>
        <p>${rec.description}</p>
      </div>
    `).join('')}
  </div>

  ${respondentData.industry ? `
  <div class="section">
    <h2>${industryRecs.title}</h2>
    ${industryRecs.recommendations.map(rec => `
      <div class="industry-rec">• ${rec}</div>
    `).join('')}
  </div>
  ` : ''}

  <div class="section">
    <h2>Your Responses</h2>
    ${(['Strategy', 'People', 'Process', 'Data', 'Governance'] as Category[]).map(cat => `
      <div class="category-header">${cat}</div>
      ${answersSummary.filter(a => a.category === cat).map(a => `
        <div class="answer-item">
          <div class="answer-question">${a.question}</div>
          <div class="answer-response">${a.answer} (${a.score}/4)</div>
        </div>
      `).join('')}
    `).join('')}
  </div>

  <div class="cta-box">
    <h3>Ready to Accelerate Your AI Journey?</h3>
    <p>Our team at The AI Guides can help you implement these recommendations and build a roadmap tailored to your organisation's unique needs.</p>
    <p><a href="https://theaiguides.co/contact">Book a consultation at theaiguides.co/contact</a></p>
  </div>
</body>
</html>
    `;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  return (
    <div className="space-y-8" ref={resultsRef}>
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Your AI Readiness Results</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          {respondentData.name}, here&apos;s a comprehensive breakdown of your organisation&apos;s AI maturity
        </p>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#2563eb"
                strokeWidth="10"
                strokeDasharray={`${scorePercent * 2.83} 283`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[var(--color-text-primary)]">{totalScore}</span>
              <span className="text-[var(--color-text-muted)]">of 80</span>
            </div>
          </div>
        </div>

        <div>
          <span className={`inline-block px-6 py-2 rounded-full font-semibold text-lg ${maturity.className}`}>
            {maturity.level}
          </span>
        </div>

        <p className="mt-4 text-[var(--color-text-secondary)] max-w-lg mx-auto text-sm">
          {maturityDescriptions[maturity.level]}
        </p>
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

      {/* Priority Recommendations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          💡 Priority Recommendations
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

      {/* Industry-Specific Recommendations */}
      {respondentData.industry && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            🏢 {industryRecs.title}
          </h3>
          <div className="space-y-3">
            {industryRecs.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-[var(--color-bg-secondary)] rounded-lg">
                <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                  {idx + 1}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={generatePDF} variant="outline" size="lg">
          📄 Download Results (PDF)
        </Button>
        <Button
          onClick={emailResults}
          variant="outline"
          size="lg"
          disabled={emailSent || emailSending}
        >
          {emailSent ? '✓ Results Emailed!' : emailSending ? 'Sending...' : '📧 Email Results to Me'}
        </Button>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-cyan-500 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to Accelerate Your AI Journey?</h2>
        <p className="text-white/90 mb-6 max-w-lg mx-auto">
          Our team of AI experts can help you implement these recommendations and build a roadmap tailored to your organisation&apos;s unique needs.
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
  const [stage, setStage] = useState<'welcome' | 'capture' | 'assessment' | 'results'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [respondentData, setRespondentData] = useState<RespondentData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = useCallback(() => {
    setStage('capture');
  }, []);

  const handleDataSubmit = useCallback((data: RespondentData) => {
    setRespondentData(data);
    setStage('assessment');
  }, []);

  const handleSelectAnswer = useCallback((answerIndex: number) => {
    if (isTransitioning) return;

    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answerIndex;
      return newAnswers;
    });

    // Auto-advance after a short delay
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setStage('results');
      }
      setIsTransitioning(false);
    }, 400);
  }, [currentQuestion, isTransitioning]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleRestart = useCallback(() => {
    setStage('welcome');
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setRespondentData({
      name: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
    });
  }, []);

  if (stage === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (stage === 'capture') {
    return <DataCaptureScreen onSubmit={handleDataSubmit} />;
  }

  if (stage === 'results') {
    return <ResultsScreen answers={answers} respondentData={respondentData} onRestart={handleRestart} />;
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
        isFirst={currentQuestion === 0}
      />
    </div>
  );
}
