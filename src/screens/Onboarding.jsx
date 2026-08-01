import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Onboarding({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      emoji: "📚",
      title: "Your Intelligent Library",
      desc: "Upload PDFs, EPUBs, or TXT files. Group your books, set reading goals, and monitor your personal stats with an elegant visual dashboard."
    },
    {
      emoji: "🎧",
      title: "AI Voice Narration",
      desc: "Convert text to speech with realistic voices. Speed up, slow down, and follow along with automated, real-time word highlighting."
    },
    {
      emoji: "🤖",
      title: "AI Chat & Translator",
      desc: "Translate entire books or single paragraphs to 5+ languages instantly. Chat with the AI helper to get explanations and summaries."
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="onboarding-screen animate-fade-in">
      <button className="onboarding-skip" onClick={handleSkip}>Skip</button>

      <div className="onboarding-carousel">
        <div className="onboarding-image">{slides[currentSlide].emoji}</div>
        <div className="onboarding-text">
          <h2>{slides[currentSlide].title}</h2>
          <p>{slides[currentSlide].desc}</p>
        </div>
      </div>

      <div className="onboarding-dots-controls">
        <div className="onboarding-dots">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`onboarding-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>

        <div className="onboarding-controls">
          <button className="btn-primary" onClick={handleNext}>
            {currentSlide === slides.length - 1 ? "Get Started" : "Continue"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
