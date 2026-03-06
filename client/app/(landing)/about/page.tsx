'use client';

import { ArrowRight, Code2, Zap, Users } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'Arjun Sharma',
      role: 'Founder & CEO',
      bio: 'Former senior engineer at Google Cloud. 12+ years building intelligent systems.',
      specialty: 'AI/ML Architecture',
    },
    {
      name: 'Priya Desai',
      role: 'VP Engineering',
      bio: 'Led engineering at two series-B startups. Expert in scaling systems.',
      specialty: 'System Design',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Lead AI Scientist',
      bio: 'PhD in Computer Science. Published researcher in code analysis.',
      specialty: 'Algorithm Design',
    },
    // {
    //   name: 'Meera Patel',
    //   role: 'Product Lead',
    //   bio: 'Former product manager at Vercel. Passionate about developer experience.',
    //   specialty: 'Developer Tools',
    // },
    // {
    //   name: 'Vikram Singh',
    //   role: 'Head of Security',
    //   bio: 'CISO background. Focused on keeping your code safe and secure.',
    //   specialty: 'Security & Privacy',
    // },
    // {
    //   name: 'Anjali Gupta',
    //   role: 'Developer Advocate',
    //   bio: 'Community leader and educator. Helping developers master code review.',
    //   specialty: 'Community & Content',
    // },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="border-b border-border/30 sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* <a href="/" className="text-lg font-mono font-bold tracking-tight">
            DevInsightAI
          </a> */}
          <a href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* About Us Section */}
      <section className="border-b border-border/30 py-20 sm:py-24 top-0 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold tracking-tight mb-6 text-balance">
              About {" "} <span className="text-primary">DevInsightAI</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              We're building the future of code review. DevInsightAI combines cutting-edge machine learning 
              and developer expertise to deliver intelligent, actionable feedback that makes your 
              code better and your workflow faster.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Mission */}
            <div className="border border-border/50 p-8 hover:border-border transition-colors">
              <h3 className="text-2xl font-mono font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower developers with intelligent code analysis that catches bugs early, 
                improves code quality, and accelerates development cycles. We believe great code 
                review shouldn't be a bottleneck—it should be an accelerator.
              </p>
            </div>

            {/* Vision */}
            <div className="border border-border/50 p-8 hover:border-border transition-colors">
              <h3 className="text-2xl font-mono font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every developer has access to world-class code review assistance, 
                making high-quality code standards achievable across organizations of all sizes. 
                From startups to enterprises, better code for everyone.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-border/50 p-6 sm:p-8 hover:border-border transition-colors">
              <p className="text-5xl sm:text-6xl font-mono font-bold text-accent mb-2">10K+</p>
              <p className="text-muted-foreground">Developers using DevInsightAI</p>
            </div>
            <div className="border border-border/50 p-6 sm:p-8 hover:border-border transition-colors">
              <p className="text-5xl sm:text-6xl font-mono font-bold text-accent mb-2">500K+</p>
              <p className="text-muted-foreground">Code reviews analyzed monthly</p>
            </div>
            <div className="border border-border/50 p-6 sm:p-8 hover:border-border transition-colors">
              <p className="text-5xl sm:text-6xl font-mono font-bold text-accent mb-2">50ms</p>
              <p className="text-muted-foreground">Average review response time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="border-b border-border/30 py-20 sm:py-24 top-0 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-tight mb-16 text-center">
            Core {" "} <span className="text-primary">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'Precision',
                description: 'Accurate, meaningful insights that developers can trust and act on immediately.'
              },
              {
                icon: Zap,
                title: 'Simplicity',
                description: 'Complex analysis made accessible. No unnecessary jargon, just clear feedback.'
              },
              {
                icon: Users,
                title: 'Excellence',
                description: 'We obsess over the details because great code is built on great review.'
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="border border-border/50 p-8 hover:border-border transition-all hover:shadow-lg group"
                >
                  <Icon className="w-8 h-8 mb-4 text-accent group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-mono font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="border-b border-border/30 py-20 sm:py-24 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-tight mb-4 text-center">
            Meet {" "} <span className="text-primary">Our Team</span>
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Talented engineers and thinkers united by a shared passion for making code review smarter and faster.
          </p>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="border border-border/50 p-6 sm:p-8 hover:border-accent/50 transition-all group hover:shadow-lg"
              >
                {/* Avatar */}
                <div className="w-16 h-16 border border-border/50 rounded-lg flex items-center justify-center font-mono font-bold text-lg mb-4 group-hover:bg-accent/10 transition-colors">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>

                {/* Info */}
                <h3 className="text-lg font-mono font-bold mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-mono mb-3">{member.role}</p>
                <div className="mb-3">
                  <span className="inline-block bg-accent/10 text-accent text-xs font-mono px-3 py-1 border border-accent/30">
                    {member.specialty}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Banner */}
      {/* <section className="border-b border-border/30 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-border/50 bg-accent/5 p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-mono font-bold mb-3">We&apos;re Hiring</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our team and help us build the future of intelligent code review. We're looking for 
            talented engineers, designers, and operators who share our vision.
          </p>
          <a
            href="mailto:careers@devinsightai.com"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 font-mono font-bold hover:bg-accent transition-colors"
          >
            View Open Positions
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section> */}

      {/* Footer CTA */}
      {/* <section className="py-16 sm:py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-6">Ready to review smarter?</h2>
          <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
            Start using DevInsightAI today and transform your code review process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-foreground text-background px-8 py-3 font-mono font-bold hover:bg-accent transition-colors"
            >
              Get Started Free
            </a>
            <a
              href="/"
              className="border border-border/50 px-8 py-3 font-mono font-bold hover:border-border transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section> */}
    </main>
  );
}
