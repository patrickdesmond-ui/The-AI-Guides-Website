import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for The AI Guides website and services.',
};

export default function TermsOfServicePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-12 md:py-16">
        <Container size="narrow">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">Terms of Service</h1>
          <p className="text-[var(--color-text-muted)]">Last updated: January 2026</p>
        </Container>
      </section>

      {/* Content */}
      <Section background="white">
        <Container size="narrow">
          <div className="prose-blog space-y-8">
            <section>
              <h2>Agreement to Terms</h2>
              <p>
                By accessing or using the website theaiguides.co (&quot;Website&quot;) operated by The AI Guides (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Website or services.
              </p>
            </section>

            <section>
              <h2>Services</h2>
              <p>
                The AI Guides provides AI advisory services, executive training, and educational resources for Australian SMEs. Our services include:
              </p>
              <ul>
                <li>AI strategy and roadmap development</li>
                <li>Executive and team training</li>
                <li>Implementation support</li>
                <li>AI governance and policy advisory</li>
                <li>Educational content and resources</li>
              </ul>
              <p>
                Specific service engagements are subject to separate agreements that will govern the terms of that engagement.
              </p>
            </section>

            <section>
              <h2>Intellectual Property</h2>
              <p>
                All content on this Website, including text, graphics, logos, guides, articles, and other materials, is the property of The AI Guides or our licensors and is protected by Australian and international copyright laws.
              </p>
              <p>
                You may view, download, and print content from this Website for your personal, non-commercial use, provided you do not modify the content and you retain all copyright and proprietary notices.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content without our prior written consent.
              </p>
            </section>

            <section>
              <h2>User Conduct</h2>
              <p>When using our Website, you agree not to:</p>
              <ul>
                <li>Use the Website for any unlawful purpose</li>
                <li>Attempt to gain unauthorised access to any part of the Website</li>
                <li>Interfere with or disrupt the Website or servers</li>
                <li>Transmit any viruses, malware, or harmful code</li>
                <li>Collect or harvest information about other users</li>
                <li>Use automated systems to access the Website without permission</li>
              </ul>
            </section>

            <section>
              <h2>AI Readiness Survey and Tools</h2>
              <p>
                Our AI Readiness Survey and other interactive tools are provided for informational and educational purposes only. The results and recommendations generated are general in nature and should not be considered as professional advice specific to your circumstances.
              </p>
              <p>
                For tailored advice, we recommend engaging our advisory services directly.
              </p>
            </section>

            <section>
              <h2>Disclaimer of Warranties</h2>
              <p>
                The Website and all content are provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not warrant that:
              </p>
              <ul>
                <li>The Website will be uninterrupted or error-free</li>
                <li>The content is accurate, complete, or current</li>
                <li>The Website is free of viruses or harmful components</li>
              </ul>
              <p>
                While we strive to provide accurate and up-to-date information, AI and technology landscapes change rapidly. We recommend verifying critical information independently.
              </p>
            </section>

            <section>
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by Australian law, The AI Guides and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:
              </p>
              <ul>
                <li>Your use of or inability to use the Website</li>
                <li>Any content obtained from the Website</li>
                <li>Unauthorised access to your data</li>
                <li>Any third-party conduct on the Website</li>
              </ul>
              <p>
                Our total liability for any claim arising from these Terms or your use of the Website shall not exceed the amount you paid us, if any, for accessing the Website.
              </p>
            </section>

            <section>
              <h2>Third-Party Links</h2>
              <p>
                Our Website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these websites. We encourage you to review the terms and privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2>Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of New South Wales, Australia. You agree to submit to the exclusive jurisdiction of the courts of New South Wales for any disputes arising from these Terms or your use of the Website.
              </p>
            </section>

            <section>
              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page with a new &quot;Last updated&quot; date. Your continued use of the Website after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2>Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:contact@theaiguides.co">contact@theaiguides.co</a></li>
                <li>Location: Sydney, Australia</li>
              </ul>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
