"use client";
import Link from "next/link";

export default function CmdkLandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Meet Your AI Companion
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Unlock productivity, creativity, and support with your personal AI companion. 
        Whether you need help brainstorming, organizing, or just a friendly chat, our AI is here for you—anytime, anywhere.
      </p>
      <Link
        href="/agent"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors duration-200 text-center"
      >
        Get Started
      </Link>
      <div className="mt-12 flex flex-col sm:flex-row gap-8 w-full max-w-3xl">
        <FeatureCard
          title="24/7 Availability"
          description="Your AI companion is always ready to help, day or night."
        />
        <FeatureCard
          title="Personalized Experience"
          description="Learns your preferences to provide tailored support and suggestions."
        />
        <FeatureCard
          title="Seamless Integration"
          description="Works across your devices and favorite tools for maximum convenience."
        />
      </div>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 text-center transition-transform transform hover:-translate-y-1 hover:shadow-2xl border border-indigo-100">
      <div className="flex items-center justify-center mb-4">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
          <svg
            className="w-7 h-7 text-indigo-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" />
            <path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <h2 className="text-2xl font-extrabold text-indigo-700 mb-2">{title}</h2>
      <p className="text-gray-600 text-base">{description}</p>
    </div>
  );
}
