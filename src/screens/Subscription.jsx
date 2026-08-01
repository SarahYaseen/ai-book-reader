import React, { useState } from "react";
import { Check, ShieldAlert, Award, Star, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function Subscription({ user, onUpgradeComplete, onBack }) {
  const [selectedPlan, setSelectedPlan] = useState("yearly"); // monthly, yearly

  const features = [
    "Unlimited AI multi-language translation",
    "Realistic Text-To-Speech voice narration",
    "Unlimited AI Chat Assistant queries",
    "Vocabulary analyzer & chapter summary summaries",
    "Ad-free premium reading experience"
  ];

  const handleUpgrade = () => {
    // Fire confetti blast
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // Call state update
    setTimeout(() => {
      onUpgradeComplete();
    }, 1000);
  };

  return (
    <div className="subscription-screen animate-fade-in">
      {/* Sub Header */}
      <div className="subscription-header" style={{ width: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
        <button 
          className="header-btn" 
          onClick={onBack}
          style={{ position: "absolute", right: 0, top: 0, width: "28px", height: "28px", borderRadius: "50%" }}
        >
          <X size={14} />
        </button>
        <div style={{ fontSize: "36px", margin: "20px 0 10px" }}>💎</div>
        <h2>Unlock ReadAI Premium</h2>
        <p>Enhance your reading with unlimited AI features</p>
      </div>

      {/* Feature check list */}
      <div className="sub-features">
        {features.map((feat, index) => (
          <div key={index} className="sub-feature-item">
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(236,72,153,0.1)", display: "flex", alignItems: "center", justify: "center", color: "#ec4899", flexShrink: 0 }}>
              <Check size={11} strokeWidth={3} />
            </div>
            <span>{feat}</span>
          </div>
        ))}
      </div>

      {/* Plan selection */}
      <div className="sub-cards-container">
        <div 
          className={`sub-card ${selectedPlan === "monthly" ? "active" : ""}`}
          onClick={() => setSelectedPlan("monthly")}
        >
          <div className="sub-card-header">
            <span className="sub-plan-name">Monthly Plan</span>
            <div style={{ textAlign: "right" }}>
              <span className="sub-plan-price">$4.99</span>
              <span className="sub-plan-duration">/mo</span>
            </div>
          </div>
        </div>

        <div 
          className={`sub-card ${selectedPlan === "yearly" ? "active" : ""}`}
          onClick={() => setSelectedPlan("yearly")}
          style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.06) 0%, rgba(99,102,241,0.06) 100%)" }}
        >
          <div className="sub-card-badge">BEST VALUE - SAVES 40%</div>
          <div className="sub-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="sub-plan-name">Annual Pass</span>
              <Star size={12} fill="#f5af19" stroke="#f5af19" />
            </div>
            <div style={{ textAlign: "right" }}>
              <span className="sub-plan-price">$35.99</span>
              <span className="sub-plan-duration">/yr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div style={{ width: "100%", marginTop: "20px" }}>
        <button className="btn-premium" onClick={handleUpgrade} style={{ width: "100%", height: "48px" }}>
          <Star size={16} fill="currentColor" />
          <span>Upgrade Now</span>
        </button>
        <span style={{ fontSize: "9px", color: "var(--text-muted)", textAlign: "center", display: "block", marginTop: "10px" }}>
          Cancel subscription anytime. Terms of Service apply.
        </span>
      </div>
    </div>
  );
}
