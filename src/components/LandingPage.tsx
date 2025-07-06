import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  BarChart3,
  Bell,
  Smartphone,
  Shield,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Index() {
  return (
    <div className="landing-page min-h-screen bg-expense-surface">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-expense-light/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#265902] to-[#98BF0A] rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-expense-dark">
                ExpenseTracker
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-expense-dark hover:text-expense-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#demo"
                className="text-expense-dark hover:text-expense-medium transition-colors"
              >
                Demo
              </a>
              <a
                href="#testimonials"
                className="text-expense-dark hover:text-expense-medium transition-colors"
              >
                Reviews
              </a>
              <Button
                variant="outline"
                className="border-expense-medium text-expense-medium hover:bg-expense-medium hover:text-white"
              >
                Sign In
              </Button>
              <Button className="bg-expense-accent hover:bg-expense-accent/90 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Hero Section BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4F3F8] via-white to-[#558C03]/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-lime-100 text-expense-dark hover:bg-expense-accent/20">
                  🎉 Now with AI-powered insights
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-expense-dark leading-tight">
                  Track Expenses Smarter, Save Effortlessly
                </h1>
                <p className="text-lg text-expense-dark/70 max-w-lg">
                  Manage your finances with intuitive tools and real-time
                  insights. Take control of your spending and build better
                  financial habits.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-expense-accent hover:bg-expense-accent/90 text-white px-8 py-6 text-lg"
                >
                  Get Started for Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-expense-medium text-expense-medium hover:bg-expense-medium hover:text-white px-8 py-6 text-lg"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-expense-dark/60">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-expense-accent text-expense-accent" />
                  <span className="font-medium">4.9/5</span>
                </div>
                <span>•</span>
                <span>50k+ happy users</span>
                <span>•</span>
                <span>Free forever plan</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-expense-light/20 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-expense-dark">
                      Monthly Overview
                    </h3>
                    <Badge className="bg-expense-accent/10 text-expense-accent">
                      +12.5%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-expense-surface p-4 rounded-lg">
                      <div className="text-2xl font-bold text-expense-dark">
                        $2,847
                      </div>
                      <div className="text-sm text-expense-dark/60">
                        Total Spent
                      </div>
                    </div>
                    <div className="bg-expense-surface p-4 rounded-lg">
                      <div className="text-2xl font-bold text-expense-accent">
                        $453
                      </div>
                      <div className="text-sm text-expense-dark/60">Saved</div>
                    </div>
                  </div>
                  <div className="h-32 gradient-expense rounded-lg opacity-80"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-expense-dark">
              Everything you need to manage money
            </h2>
            <p className="text-lg text-expense-dark/70 max-w-2xl mx-auto">
              Powerful features designed to simplify your financial life and
              help you make better decisions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-expense-light/20 bg-expense-surface hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-3">
                <div className="w-12 h-12 bg-expense-accent/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-expense-accent" />
                </div>
                <CardTitle className="text-expense-dark">
                  Real-Time Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-expense-dark/70">
                  Get instant insights into your spending patterns with
                  beautiful charts and analytics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-expense-light/20 bg-expense-surface hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-3">
                <div className="w-12 h-12 bg-expense-medium/10 rounded-lg flex items-center justify-center">
                  <Bell className="w-6 h-6 text-expense-medium" />
                </div>
                <CardTitle className="text-expense-dark">
                  Budget Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-expense-dark/70">
                  Never overspend again with smart notifications and
                  customizable budget limits.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-expense-light/20 bg-expense-surface hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-3">
                <div className="w-12 h-12 bg-expense-light/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-expense-light" />
                </div>
                <CardTitle className="text-expense-dark">
                  Multi-Device Sync
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-expense-dark/70">
                  Access your data anywhere with seamless synchronization across
                  all your devices.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-expense-light/20 bg-expense-surface hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-3">
                <div className="w-12 h-12 bg-expense-dark/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-expense-dark" />
                </div>
                <CardTitle className="text-expense-dark">
                  Bank-Level Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-expense-dark/70">
                  Your financial data is protected with enterprise-grade
                  encryption and security.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visual Demo Section */}
      <section id="demo" className="py-20 bg-expense-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-expense-dark">
              See it in action
            </h2>
            <p className="text-lg text-expense-dark/70 max-w-2xl mx-auto">
              Experience the intuitive interface that makes expense tracking
              effortless and enjoyable.
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-expense-light/20 overflow-hidden">
              <div className="gradient-expense h-12 flex items-center px-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-expense-surface p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-expense-dark/70 text-sm">
                        Total Balance
                      </span>
                      <TrendingUp className="w-4 h-4 text-expense-accent" />
                    </div>
                    <div className="text-2xl font-bold text-expense-dark">
                      $12,847.50
                    </div>
                  </div>
                  <div className="bg-expense-surface p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-expense-dark/70 text-sm">
                        Monthly Expenses
                      </span>
                      <BarChart3 className="w-4 h-4 text-expense-medium" />
                    </div>
                    <div className="text-2xl font-bold text-expense-dark">
                      $3,247.80
                    </div>
                  </div>
                  <div className="bg-expense-surface p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-expense-dark/70 text-sm">
                        Savings Goal
                      </span>
                      <DollarSign className="w-4 h-4 text-expense-accent" />
                    </div>
                    <div className="text-2xl font-bold text-expense-dark">
                      78%
                    </div>
                  </div>
                </div>
                {/* Demo Section Chart Preview */}
                <div className="h-64 bg-gradient-to-br from-[#558C03]/20 to-[#98BF0A]/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <BarChart3 className="w-16 h-16 text-expense-medium mx-auto" />
                    <p className="text-expense-dark/70">
                      Interactive Dashboard Preview
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-expense-dark">
              Loved by thousands
            </h2>
            <p className="text-lg text-expense-dark/70 max-w-2xl mx-auto">
              Join the community of users who've transformed their financial
              lives with ExpenseTracker.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-expense-light/20 bg-expense-surface">
              <CardHeader>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-expense-accent text-expense-accent"
                    />
                  ))}
                </div>
                <CardDescription className="text-expense-dark/70">
                  "ExpenseTracker completely changed how I manage my finances.
                  The insights are incredible and have helped me save over $2000
                  this year!"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-expense-accent/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-expense-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-expense-dark">
                      Sarah Johnson
                    </div>
                    <div className="text-sm text-expense-dark/60">
                      Small Business Owner
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-expense-light/20 bg-expense-surface">
              <CardHeader>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-expense-accent text-expense-accent"
                    />
                  ))}
                </div>
                <CardDescription className="text-expense-dark/70">
                  "The budget alerts feature is a game-changer. I finally have
                  control over my spending and I'm actually saving money each
                  month now."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-expense-medium/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-expense-medium" />
                  </div>
                  <div>
                    <div className="font-medium text-expense-dark">
                      Mike Chen
                    </div>
                    <div className="text-sm text-expense-dark/60">
                      Software Engineer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-expense-light/20 bg-expense-surface">
              <CardHeader>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-expense-accent text-expense-accent"
                    />
                  ))}
                </div>
                <CardDescription className="text-expense-dark/70">
                  "Beautiful interface, powerful features, and excellent
                  customer support. ExpenseTracker is exactly what I was looking
                  for."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-expense-light/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-expense-light" />
                  </div>
                  <div>
                    <div className="font-medium text-expense-dark">
                      Emma Rodriguez
                    </div>
                    <div className="text-sm text-expense-dark/60">
                      Marketing Manager
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-expense-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {/* Footer Logo Gradient */}
                <div className="w-8 h-8 bg-gradient-to-br from-[#265902] to-[#98BF0A] rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ExpenseTracker</span>
              </div>
              <p className="text-white/70 max-w-sm">
                The smart way to track expenses and build better financial
                habits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-expense-accent transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 ExpenseTracker. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-white/60 hover:text-expense-accent transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-expense-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-expense-accent transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
