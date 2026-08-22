import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-3xl font-serif font-bold text-foreground tracking-tight">DayFlow</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-muted-foreground hover:text-accent transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-accent transition-colors font-medium">How it works</a>
              <div className="flex space-x-4 ml-4">
                <Link to="/login">
                  <Button variant="outline" className="px-6 rounded-full hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button className="px-6 rounded-full shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 transform hover:-translate-y-1">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent to-accent-secondary blur-3xl mix-blend-multiply animate-pulse" style={{ animationDuration: '4s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-block small-caps text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
            The Modern HR Operating System
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-8 leading-tight">
            Elevate your team's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">
              work experience.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 font-light leading-relaxed">
            DayFlow brings your employee management, payroll, and attendance tracking together in one beautiful, intuitive platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 rounded-full text-lg shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 transform hover:-translate-y-1">
                Start for free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 rounded-full text-lg hover:bg-muted transition-all duration-300">
                Book a demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Everything you need, nothing you don't.</h2>
            <p className="text-lg text-muted-foreground">Designed with simplicity and power in mind, DayFlow gives you the tools to manage your workforce without the clutter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-background border border-border hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <svg className="w-7 h-7 text-accent group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">Core HR Directory</h3>
              <p className="text-muted-foreground leading-relaxed">Centralized employee records. Keep track of personal details, job titles, departments, and employment history with ease.</p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-background border border-border hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <svg className="w-7 h-7 text-accent group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">Time & Attendance</h3>
              <p className="text-muted-foreground leading-relaxed">Seamlessly track hours worked, manage daily check-ins, and handle time-off requests through a unified dashboard.</p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-background border border-border hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <svg className="w-7 h-7 text-accent group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">Automated Payroll</h3>
              <p className="text-muted-foreground leading-relaxed">Generate precise payroll calculations based on basic salary, allowances, deductions, and attendance records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent via-foreground to-foreground" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Ready to transform your HR?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Join hundreds of modern companies managing their workforce with DayFlow.</p>
          <Link to="/signup">
            <Button size="lg" className="px-10 py-6 text-lg rounded-full shadow-2xl shadow-accent/40 bg-accent text-white hover:bg-accent-secondary border-none transform hover:-translate-y-1 transition-all duration-300">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-2xl font-serif font-bold text-foreground">DayFlow</span>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} DayFlow HRMS. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
