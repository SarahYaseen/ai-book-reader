import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Settings, Headphones, Bookmark, MessageSquare, Globe, BookOpen, AlertCircle } from "lucide-react";

export default function Reader({ 
  book, 
  onBack, 
  onGoToAudio, 
  onGoToTranslate, 
  onGoToChat, 
  onAddBookmark, 
  isSpeechActive, 
  activeSpeechIndex,
  onStartSpeechParagraph
}) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState("medium"); // small, medium, large
  const [fontFamily, setFontFamily] = useState("serif"); // sans, serif
  const [aiModal, setAiModal] = useState(null); // { type: 'summary'|'explain', title: '', content: '' }

  const chapter = book.chapters[currentChapterIndex] || book.chapters[0];
  const totalChapters = book.chapters.length;

  const fontClass = fontFamily === "serif" ? "font-serif" : "font-sans";
  const sizeStyle = fontSize === "small" 
    ? { fontSize: "13px", lineHeight: "1.5" } 
    : fontSize === "large" 
    ? { fontSize: "18px", lineHeight: "1.7" } 
    : { fontSize: "15px", lineHeight: "1.6" };

  const handleParagraphClick = (index) => {
    if (selectedParagraphIndex === index) {
      setSelectedParagraphIndex(null);
    } else {
      setSelectedParagraphIndex(index);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex(prev => prev + 1);
      setSelectedParagraphIndex(null);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      setSelectedParagraphIndex(null);
    }
  };

  const triggerBookmark = () => {
    if (selectedParagraphIndex === null) return;
    const text = chapter.paragraphs[selectedParagraphIndex];
    onAddBookmark({
      bookId: book.id,
      bookTitle: book.title,
      chapterTitle: chapter.title,
      text: text.length > 80 ? `${text.substring(0, 80)}...` : text,
      fullText: text
    });
    setSelectedParagraphIndex(null);
  };

  const triggerTranslate = () => {
    if (selectedParagraphIndex === null) return;
    const text = chapter.paragraphs[selectedParagraphIndex];
    onGoToTranslate(book, text, selectedParagraphIndex);
    setSelectedParagraphIndex(null);
  };

  const triggerParagraphAudio = () => {
    if (selectedParagraphIndex === null) return;
    onStartSpeechParagraph(book, currentChapterIndex, selectedParagraphIndex);
    onGoToAudio(book);
    setSelectedParagraphIndex(null);
  };

  const triggerAiExplain = () => {
    if (selectedParagraphIndex === null) return;
    const text = chapter.paragraphs[selectedParagraphIndex];
    
    setAiModal({
      type: "explain",
      title: "AI Vocabulary Explainer",
      content: `In this passage, the AI identifies key terms:\n\n• "Vulnerable" (adjective): Susceptible to physical or emotional attack or harm. Historically, Fitzgerald uses this to denote the narrator's youthful susceptibility to external influences and judgments.\n• "Inclined" (adjective): Having a physical or mental tendency; leaning toward a particular state of mind.\n• "Reserve all judgments" (idiom): Refraining from passing opinion or moral criticism on others before understanding them fully.`
    });
  };

  const triggerAiSummary = () => {
    if (selectedParagraphIndex === null) return;
    const text = chapter.paragraphs[selectedParagraphIndex];
    
    setAiModal({
      type: "summary",
      title: "AI Paragraph Summary",
      content: `The author introduces a foundational memory: advice from the narrator's father cautioning against quick judgments. It establishes the narrator, Nick Carraway, as an objective, observant, and tolerant listener—key traits that define his role as the observer of Gatsby's tragic tale. This sets a reflective, moral tone for the entire novel.`
    });
  };

  return (
    <div className="reader-screen animate-fade-in" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Reader Custom Navigation Header */}
      <div className="app-header">
        <button className="header-btn" onClick={onBack}>
          <ChevronLeft size={18} />
        </button>
        <h1 style={{ fontSize: "14px", width: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {book.title}
        </h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="header-btn" onClick={() => onGoToAudio(book)}>
            <Headphones size={16} className={isSpeechActive ? "text-secondary" : ""} />
          </button>
          <button className="header-btn" onClick={() => setShowSettings(!showSettings)}>
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Font & Formatting Panel Overlay */}
      {showSettings && (
        <div className="reader-settings-panel animate-fade-in">
          <div className="settings-row">
            <span className="settings-label">Font Family</span>
            <div className="settings-btns">
              <button 
                className={`settings-btn ${fontFamily === "serif" ? "active" : ""}`}
                onClick={() => setFontFamily("serif")}
              >
                Serif
              </button>
              <button 
                className={`settings-btn ${fontFamily === "sans" ? "active" : ""}`}
                onClick={() => setFontFamily("sans")}
              >
                Sans
              </button>
            </div>
          </div>
          <div className="settings-row">
            <span className="settings-label">Text Size</span>
            <div className="settings-btns">
              <button 
                className={`settings-btn ${fontSize === "small" ? "active" : ""}`}
                onClick={() => setFontSize("small")}
              >
                A-
              </button>
              <button 
                className={`settings-btn ${fontSize === "medium" ? "active" : ""}`}
                onClick={() => setFontSize("medium")}
              >
                A
              </button>
              <button 
                className={`settings-btn ${fontSize === "large" ? "active" : ""}`}
                onClick={() => setFontSize("large")}
              >
                A+
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Actual Reading Viewport */}
      <div 
        className="reader-content" 
        style={{ 
          fontFamily: fontFamily === "serif" ? "'Playfair Display', Georgia, serif" : "'Inter', sans-serif"
        }}
      >
        <div className="reader-chapter-title">{chapter.title}</div>
        
        {chapter.paragraphs.map((p, index) => {
          const isSelected = selectedParagraphIndex === index;
          const isSpeechHighlight = isSpeechActive && activeSpeechIndex === index;
          
          return (
            <p 
              key={index}
              className={`reader-paragraph ${isSelected ? "selected" : ""} ${isSpeechHighlight ? "active-speech" : ""}`}
              onClick={() => handleParagraphClick(index)}
              style={sizeStyle}
            >
              {p}
            </p>
          );
        })}
      </div>

      {/* AI Modal Overlay for Explanations and Summaries */}
      {aiModal && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div className="card" style={{ width: "100%", maxHeight: "80%", overflowY: "auto", gap: "12px", border: "1px solid var(--primary-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
              <h4 style={{ fontSize: "14px", color: "var(--primary-color)", fontWeight: "700" }}>{aiModal.title}</h4>
            </div>
            <p style={{ fontSize: "12.5px", color: "var(--text-primary)", whiteSpace: "pre-line", lineHeight: "1.5" }}>
              {aiModal.content}
            </p>
            <button className="btn-secondary" onClick={() => setAiModal(null)} style={{ marginTop: "10px", padding: "8px" }}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Floating Toolbar upon Paragraph selection */}
      {selectedParagraphIndex !== null && (
        <div className="reader-context-toolbar">
          <div className="toolbar-header">
            <span>Paragraph Actions</span>
            <span style={{ color: "var(--primary-color)", cursor: "pointer" }} onClick={() => setSelectedParagraphIndex(null)}>Close</span>
          </div>
          <div className="toolbar-buttons">
            <button className="toolbar-btn" onClick={triggerBookmark}>
              <Bookmark size={12} />
              <span>Bookmark</span>
            </button>
            <button className="toolbar-btn" onClick={triggerTranslate}>
              <Globe size={12} />
              <span>Translate</span>
            </button>
            <button className="toolbar-btn" onClick={triggerParagraphAudio}>
              <Headphones size={12} />
              <span>Listen</span>
            </button>
          </div>
          <div className="toolbar-buttons">
            <button className="toolbar-btn gradient" onClick={triggerAiExplain}>
              <AlertCircle size={12} />
              <span>AI Explain</span>
            </button>
            <button className="toolbar-btn gradient" onClick={triggerAiSummary}>
              <MessageSquare size={12} />
              <span>AI Summarize</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom chapter navigations */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 18px",
        borderTop: "1px solid var(--border-color)",
        backgroundColor: "var(--bg-card)",
        zIndex: 50
      }}>
        <button 
          className="header-btn" 
          disabled={currentChapterIndex === 0} 
          onClick={handlePrevChapter}
          style={{ opacity: currentChapterIndex === 0 ? 0.3 : 1 }}
        >
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)" }}>
          Page {currentChapterIndex + 1} of {totalChapters}
        </span>
        <button 
          className="header-btn" 
          disabled={currentChapterIndex === totalChapters - 1} 
          onClick={handleNextChapter}
          style={{ opacity: currentChapterIndex === totalChapters - 1 ? 0.3 : 1 }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
