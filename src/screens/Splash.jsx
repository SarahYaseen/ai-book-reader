import React, { useEffect } from "react";

export default function Splash({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen animate-fade-in">
      <div className="splash-logo">📖</div>
      <h1 className="splash-title">ReadAI</h1>
      <p className="splash-subtitle">Your Intelligent Book Companion</p>
      
      <div className="splash-progress-track">
        <div className="splash-progress-bar"></div>
      </div>
    </div>
  );
}
