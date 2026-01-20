import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Executive Training', href: '/executive-training' },
  { label: 'AI Readiness Survey', href: '/ai-readiness-survey' },
  { label: 'AI Guides & Insights', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-text-primary)] text-white">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <Logo variant="white" />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                The AI Guides empowers Australian SMEs with trusted AI strategy, training, and
                resources. We help leaders understand AI, prioritise actions, upskill teams, and
                implement solutions with confidence.
              </p>
            </div>

            {/* Navigation Column */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Navigation</h3>
              <ul className="space-y-3">
                {navigation.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Links Column */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                {navigation.slice(4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:contact@theaiguides.co"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    contact@theaiguides.co
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} The AI Guides. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
