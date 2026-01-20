import Button from "@/components/Button";
import pages from "@/data/pages.json";

export const metadata = {
  title: "AI Readiness Survey",
};

export default function AIReadinessSurveyPage() {
  const { readinessSurvey } = pages;
  return (
    <>
      <section className="section">
        <div className="container-pad space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Exclusive for Australian SMEs</p>
          <h1 className="text-4xl font-bold text-slate-900">{readinessSurvey.hero.headline}</h1>
          <p className="text-lg text-slate-600">{readinessSurvey.hero.text}</p>
          <Button href={readinessSurvey.cta.href}>{readinessSurvey.cta.label}</Button>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-pad space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">How the AI Readiness Survey Works</h2>
          <p className="text-slate-600">{readinessSurvey.how.content}</p>
          <ul className="space-y-3 text-slate-600">
            {readinessSurvey.how.steps.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ul>
          <p className="text-sm text-slate-500"><em>{readinessSurvey.how.privacy}</em></p>
        </div>
      </section>

      <section className="section">
        <div className="container-pad space-y-4">
          <h2 className="text-3xl font-semibold text-slate-900">Why Establish an AI Readiness Baseline?</h2>
          {readinessSurvey.why.split("\n\n").map((paragraph) => (
            <p key={paragraph} className="text-slate-600">
              {paragraph}
            </p>
          ))}
          <div className="rounded-2xl bg-brand-50 p-6">
            <p className="text-slate-700">Take our interactive survey to evaluate your organisation's preparedness for AI adoption. Receive tailored feedback and practical recommendations to help your business harness AI with confidence.</p>
            <div className="mt-4">
              <Button href={readinessSurvey.cta.href}>{readinessSurvey.cta.label}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
