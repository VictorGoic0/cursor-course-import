"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CmdkLandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    router.push("/signup");
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Meet Your AI Companion
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Unlock productivity, creativity, and support with your personal AI companion. 
        Whether you need help brainstorming, organizing, or just a friendly chat, our AI is here for you—anytime, anywhere.
      </p>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors duration-200 disabled:opacity-60"
        onClick={handleGetStarted}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Get Started"}
      </button>
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
    <div className="flex-1 bg-white rounded-xl shadow p-6 text-center">
      <h2 className="text-xl font-bold text-indigo-700 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
