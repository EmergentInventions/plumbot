import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageSquare, FileText, Calendar, CreditCard, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Plumbum",
    price: "£39",
    description: "Perfect for solo plumbers",
    features: [
      "PDF Quotes & Estimates",
      "Professional Invoices",
      "Calendar Bookings (.ics files)",
      "Customer Database",
      "Telegram Bot Access",
      "Basic Dashboard",
      "Bank Transfer Payments",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Gold",
    price: "£109",
    description: "For growing businesses",
    features: [
      "Everything in Plumbum",
      "Payment Links (Stripe/PayPal)",
      "GoCardless Integration",
      "Monzo/Revolut Support",
      "Priority Support",
      "Advanced Reporting",
    ],
    cta: "Upgrade to Gold",
    popular: true,
  },
  {
    name: "Platinum",
    price: "£599",
    description: "For established companies",
    features: [
      "Everything in Gold",
      "Xero Integration",
      "QuickBooks Sync",
      "Google Calendar 2-Way Sync",
      "Team Management",
      "API Access",
      "Dedicated Support",
      "Custom Integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const features = [
  {
    icon: MessageSquare,
    title: "Telegram Bot",
    description: "Manage your business from your phone with simple commands",
  },
  {
    icon: FileText,
    title: "PDF Quotes",
    description: "Generate professional quotes instantly with your branding",
  },
  {
    icon: Calendar,
    title: "Calendar Booking",
    description: "Send .ics files to customers for easy calendar integration",
  },
  {
    icon: CreditCard,
    title: "Invoicing",
    description: "Create and track invoices, get paid via bank transfer",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <Sparkles className="mr-2 h-4 w-4" />
            Now in Beta - First Month Free
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Your Plumbing Business,
            <br />
            <span className="text-blue-600">On Telegram</span>
          </h1>
          <p className="mb-8 text-xl text-slate-600">
            Generate quotes, send invoices, and manage bookings — all from your phone.
            No complicated software. Just simple commands.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Everything You Need
          </h2>
          <p className="text-lg text-slate-600">
            Run your plumbing business from anywhere
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-slate-200">
              <CardHeader>
                <feature.icon className="mb-2 h-8 w-8 text-blue-600" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Simple Pricing
          </h2>
          <p className="text-lg text-slate-600">
            Start with Plumbum and upgrade as you grow
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col ${
                tier.popular
                  ? "border-blue-600 shadow-lg"
                  : "border-slate-200"
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            How It Works
          </h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Connect Your Bot",
                description: "Create a Telegram bot with @BotFather, paste your token",
              },
              {
                step: "2",
                title: "Set Up Your Business",
                description: "Add your business details, logo, and bank information",
              },
              {
                step: "3",
                title: "Start Using Commands",
                description: "Type 'quote John Smith 250 for boiler repair' and get an instant PDF",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-blue-600 px-4 py-16 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to streamline your plumbing business?
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            Join plumbers across the UK using Plumbot to save time and win more jobs.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-600">
        <p>© 2026 Plumbot. All rights reserved.</p>
      </footer>
    </div>
  );
}
