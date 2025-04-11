import { PricingCard } from "@/components/ui/dark-gradient-pricing";

export function Pricing() {
  return (
    <section className="relative overflow-hidden text-foreground">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
        <div className="mb-12 space-y-3">
          <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight text-white">
            Pricing
          </h2>
          <p className="text-center text-base text-muted-foreground md:text-lg">
            Use it for free for yourself, upgrade when your team needs advanced
            control.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PricingCard
            tier="Free"
            price="$0/mo"
            bestFor="Best for individuals trying it out before upgrading"
            CTA="Get started free"
            benefits={[
              { text: "1 Social Account", checked: true },
              { text: "Basic Email Support", checked: true },
              { text: "1 AI-generated Post/Day", checked: true },
              { text: "Limited Post Scheduling", checked: true },
              { text: "Priority Support", checked: false },
              { text: "Single Sign-On (SSO)", checked: false },
            ]}
          />

          <PricingCard
            tier="Pro"
            price="$29/mo"
            bestFor="Teams managing multiple accounts"
            CTA="Get Started"
            benefits={[
              { text: "Up to 5 Social Accounts", checked: true },
              { text: "Standard Email Support", checked: true },
              { text: "Unlimited AI Post Generation", checked: true },
              { text: "Advanced Scheduling Tools", checked: true },
              { text: "Priority Support", checked: false },
              { text: "Single Sign-On (SSO)", checked: false },
            ]}
          />

          <PricingCard
            tier="Enterprise"
            price="Contact us"
            bestFor="Best for organizations with 50+ users"
            CTA="Contact us"
            benefits={[
              { text: "Unlimited Accounts & Workspaces", checked: true },
              { text: "Dedicated Email & Slack Support", checked: true },
              { text: "30-Day Data Retention", checked: true },
              { text: "Custom Roles & Permissions", checked: true },
              { text: "Priority Support", checked: true },
              { text: "Enterprise-grade SSO", checked: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
