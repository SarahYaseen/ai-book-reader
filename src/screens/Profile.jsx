import React, { useState } from "react";
import { User, Bell, Shield, Moon, Sun, Award, LogOut, BookOpen, Volume2 } from "lucide-react";

export default function Profile({ user, onLogout, theme, onToggleTheme, onGoToSubscription }) {
  const [readingGoal, setReadingGoal] = useState(5); // 5 hours per week default
  const [autoScroll, setAutoScroll] = useState(false);
  const [bgAudio, setBgAudio] = useState(true);

  return (
    <div className="profile-screen animate-fade-in">
      {/* Profile Overview Card */}
      <div className="profile-info-card card">
        <div className="profile-avatar">
          {user?.name ? user.name.substring(0, 2).toUpperCase() : "RD"}
        </div>
        <div>
          <h2 className="profile-name">{user?.name || "Alex Carter"}</h2>
          <span className="profile-email">{user?.email || "demo@readai.app"}</span>
        </div>
      </div>

      {/* Premium upgrade card or Activated card */}
      {user?.isPremium ? (
        <div className="profile-premium-card" style={{ background: "var(--premium-gradient)" }}>
          <div className="profile-premium-info">
            <h3>Premium Active</h3>
            <p>Unlimited AI translation, audio, and chat assistant</p>
          </div>
          <Award size={24} />
        </div>
      ) : (
        <div 
          className="profile-premium-card" 
          style={{ background: "var(--primary-gradient)", cursor: "pointer" }}
          onClick={onGoToSubscription}
        >
          <div className="profile-premium-info">
            <h3>Upgrade to Premium</h3>
            <p>Get unlimited translations & voice naration</p>
          </div>
          <Award size={20} />
        </div>
      )}

      {/* Goal Setter Card */}
      <div className="card" style={{ gap: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="settings-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <BookOpen size={14} className="text-secondary" />
            <span>Weekly Reading Goal</span>
          </span>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--primary-color)" }}>{readingGoal} hrs</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="20" 
          value={readingGoal}
          onChange={(e) => setReadingGoal(parseInt(e.target.value, 10))}
          className="audio-slider-input"
        />
      </div>

      {/* Preference Settings List */}
      <div className="settings-list">
        {/* Theme Toggle */}
        <div className="settings-item">
          <div className="settings-item-left">
            {theme === "dark" ? <Moon size={16} className="settings-icon" /> : <Sun size={16} className="settings-icon" />}
            <span>Dark Theme Mode</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={theme === "dark"} 
              onChange={onToggleTheme} 
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Auto Scroll */}
        <div className="settings-item">
          <div className="settings-item-left">
            <BookOpen size={16} className="settings-icon" />
            <span>Auto-Scroll Paragraphs</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={autoScroll} 
              onChange={(e) => setAutoScroll(e.target.checked)} 
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Background Audio */}
        <div className="settings-item">
          <div className="settings-item-left">
            <Volume2 size={16} className="settings-icon" />
            <span>Background Narration</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={bgAudio} 
              onChange={(e) => setBgAudio(e.target.checked)} 
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Log out action */}
      <button 
        className="btn-secondary" 
        onClick={onLogout} 
        style={{ marginTop: "auto", border: "1px solid #ef4444", color: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.05)" }}
      >
        <LogOut size={15} />
        <span>Log Out</span>
      </button>
    </div>
  );
}
