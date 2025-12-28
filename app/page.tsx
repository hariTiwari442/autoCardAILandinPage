"use client";

import React, { useState, useEffect } from "react";
import {
  Scan,
  Zap,
  Shield,
  BarChart3,
  Camera,
  Users,
  Star,
} from "lucide-react";

export default function LeadScannerLanding() {
  const [isHovered, setIsHovered] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const statsElement = document.getElementById("stats-section");
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ end, suffix = "", color = "text-blue-600" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!statsVisible) return;

      const duration = 2000;
      const startTime = Date.now();
      const endValue = parseInt(end.replace(/[^\d]/g, ""));

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOutCubic * endValue);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [statsVisible, end]);

    const formatNumber = (num) => {
      if (end.includes("99.9%")) return "99.9%";
      if (num >= 1000)
        return `${Math.floor(num / 1000)},${String(num % 1000).padStart(
          3,
          "0"
        )}`;
      return num.toString();
    };

    return (
      <span className={`text-4xl md:text-5xl font-bold ${color}`}>
        {formatNumber(count)}
        {suffix}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Scan className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">AutoCardAI</span>
        </div>

        <nav className="flex items-center space-x-8">
          <a
            href="/app/auth?mode=login"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Login
          </a>
          <a
            href="/app/auth?mode=signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            Get Started
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center">
          {/* Hero Icon */}
          <div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-12 transform transition-all duration-500 hover:scale-110 hover:rotate-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse"></div>
              <div className="w-8 h-8 border-3 border-white border-dashed rounded-lg relative">
                <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animation-delay-100 animate-ping"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 bg-white rounded-full animation-delay-200 animate-ping"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-white rounded-full animation-delay-300 animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Transform{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Business Cards
            </span>
            <br />
            into{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Digital Gold
            </span>
          </h1>

          {/* Hero Description */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Stop losing valuable contacts. Our AI-powered scanner instantly
            digitizes
            <br />
            business cards, organizes your network, and helps you build
            meaningful
            <br />
            professional relationships.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <a href="/app/auth?mode=login">
              <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <span>Start using for free</span>
                  <Zap className="w-5 h-5 group-hover:animate-bounce" />
                </div>
              </button>
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <section
          id="privacy-section"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-32"
        >
          <div className="transform transition-all duration-500 hover:scale-105">
            <div className="text-4xl mb-3">🔒</div>
            <p className="text-lg font-semibold text-gray-900">
              Private by default
            </p>
            <p className="text-gray-600 mt-2">
              Your uploaded cards are visible only to your account.
            </p>
          </div>

          <div className="transform transition-all duration-500 hover:scale-105">
            <div className="text-4xl mb-3">🛡️</div>
            <p className="text-lg font-semibold text-gray-900">
              End-to-end encrypted
            </p>
            <p className="text-gray-600 mt-2">
              Card data is encrypted at rest and in transit.
            </p>
          </div>

          <div className="transform transition-all duration-500 hover:scale-105">
            <div className="text-4xl mb-3">👁️‍🗨️</div>
            <p className="text-lg font-semibold text-gray-900">
              No human access
            </p>
            <p className="text-gray-600 mt-2">
              We don&apos;t access, read, or share your card data.
            </p>
          </div>
        </section>
      </main>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and effective in just 3 steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Camera className="w-10 h-10 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Scan or Upload
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Take a photo of any business card or upload an existing image
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI Processing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI instantly extracts and organizes all contact information
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-purple-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Manage & Connect
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access your organized contacts anytime and build your network
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose AutoCardAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your networking and boost
              your professional growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Lightning Fast OCR
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced AI technology extracts contact information from
                business cards in seconds with 99.9% accuracy
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Secure & Private
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is encrypted and stored securely. We never share your
                contacts with third parties
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Organization
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically categorize and organize your contacts with
                intelligent tagging and search features
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;AutoCardAI has revolutionized how I manage my professional
                contacts. The OCR accuracy is incredible!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Smith</p>
                  <p className="text-gray-600 text-sm">Sales Director</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;I used to lose so many business cards. Now I can digitize
                them instantly and never lose a contact again.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rajeev Mittal</p>
                  <p className="text-gray-600 text-sm">Entrepreneur</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;The interface is so clean and intuitive. I can organize my
                entire network effortlessly.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rohit Rastogi</p>
                  <p className="text-gray-600 text-sm">Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Networking?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who never lose a contact again
          </p>

          <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <span>Start Your Free Trial</span>
              <Zap className="w-5 h-5 group-hover:animate-bounce" />
            </div>
          </button>

          <p className="text-gray-500 text-sm">
            No credit card required •{" "}
            <span className="font-semibold">
              Need help? Email support@autocardai.app
            </span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Scan className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">AutoCardAI</span>
            </div>

            <p className="text-gray-400 mb-6">
              © 2024 AutoCardAI. All rights reserved.
            </p>

            <p className="text-gray-500">
              Transform your networking with AI-powered business card scanning.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <div className="fixed top-1/4 left-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-float pointer-events-none"></div>
      <div className="fixed top-1/3 right-16 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-30 animate-float animation-delay-1000 pointer-events-none"></div>
      <div className="fixed bottom-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full opacity-25 animate-float animation-delay-2000 pointer-events-none"></div>
      <div className="fixed bottom-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-purple-300 to-blue-400 rounded-full opacity-15 animate-float animation-delay-1500 pointer-events-none"></div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(-5px) rotate(-5deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-1500 {
          animation-delay: 1.5s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
