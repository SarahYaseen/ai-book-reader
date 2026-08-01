import React from "react";
import { BookOpen, Headphones, Bookmark, Award, Clock, ArrowRight } from "lucide-react";

export default function Dashboard({ user, books, stats, bookmarks, onSelectBook, onViewAllLibrary, onSelectBookmark }) {
  // Safe defaults
  const readingHours = stats?.readingHours || 12.5;
  const audioHours = stats?.audioHours || 4.2;
  const booksReadCount = stats?.booksReadCount || 2;
  const bookmarkCount = bookmarks?.length || 0;
  
  // Weekly data (in minutes) for the bar chart
  const weeklyData = [
    { day: "M", mins: 30 },
    { day: "T", mins: 45 },
    { day: "W", mins: 15 },
    { day: "T", mins: 60 },
    { day: "F", mins: 20 },
    { day: "S", mins: 90 },
    { day: "S", mins: 50 },
  ];

  const maxMins = Math.max(...weeklyData.map(d => d.mins));

  return (
    <div className="dashboard-screen animate-fade-in">
      {/* Header Profile Summary */}
      <div className="welcome-section">
        <div className="welcome-user">
          <h2>Welcome back,</h2>
          <p>{user?.name || "Reader"}</p>
        </div>
        {user?.isPremium ? (
          <div className="premium-badge">
            <Award size={13} />
            <span>PREMIUM</span>
          </div>
        ) : (
          <div className="premium-badge" style={{ background: "var(--border-color)", color: "var(--text-secondary)" }}>
            <span>FREE PLAN</span>
          </div>
        )}
      </div>

      {/* Grid of reading stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={16} />
          </div>
          <span className="stat-value">{readingHours} hrs</span>
          <span className="stat-label">Read Time</span>
        </div>
        <div className="stat-card cyan">
          <div className="stat-icon">
            <Headphones size={16} />
          </div>
          <span className="stat-value">{audioHours} hrs</span>
          <span className="stat-label">Audio Listened</span>
        </div>
      </div>

      {/* Weekly Visual Chart */}
      <div className="weekly-chart-card">
        <div className="chart-header">
          <span className="chart-title">Reading Velocity</span>
          <span className="chart-subtitle">Daily Activity</span>
        </div>
        <div className="chart-bars">
          {weeklyData.map((d, index) => {
            const pct = (d.mins / maxMins) * 100;
            return (
              <div key={index} className="chart-bar-col">
                <div className="chart-bar-container">
                  <div className="chart-bar-fill" style={{ height: `${pct}%` }}></div>
                </div>
                <span className="chart-bar-label">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Opened Books */}
      <div>
        <div className="section-header">
          <h3>Recently Read</h3>
          <span className="section-link" onClick={onViewAllLibrary}>View Library</span>
        </div>
        
        {books.length > 0 ? (
          <div 
            className="recent-book-card"
            onClick={() => onSelectBook(books[0])}
          >
            <div 
              className="recent-cover" 
              style={{ background: books[0].coverColor }}
            >
              {books[0].coverEmoji}
            </div>
            <div className="recent-info">
              <span className="recent-title">{books[0].title}</span>
              <span className="recent-author">by {books[0].author}</span>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${books[0].progress}%` }}></div>
              </div>
              <span className="recent-progress-text">{books[0].progress}% complete</span>
            </div>
          </div>
        ) : (
          <div className="card text-center" style={{ padding: "20px", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "28px" }}>📚</span>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>No books read yet. Visit the Library to start!</p>
          </div>
        )}
      </div>

      {/* Bookmarks & Notes Summary */}
      <div>
        <div className="section-header">
          <h3>Bookmarks & Notes ({bookmarkCount})</h3>
        </div>
        <div className="card" style={{ padding: "8px 16px" }}>
          {bookmarks.length > 0 ? (
            bookmarks.slice(0, 3).map((bm, index) => (
              <div 
                key={index} 
                className="bookmark-row"
                onClick={() => onSelectBookmark(bm)}
              >
                <Bookmark size={13} className="text-secondary" style={{ flexShrink: 0 }} />
                <span className="bookmark-text">"{bm.text}"</span>
                <ArrowRight size={10} className="text-muted" style={{ flexShrink: 0 }} />
              </div>
            ))
          ) : (
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", padding: "12px 0", textAlign: "center" }}>
              Double-click paragraphs in the reader to save bookmarks.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
