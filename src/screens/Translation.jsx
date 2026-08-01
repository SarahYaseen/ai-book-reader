import React, { useState, useEffect } from "react";
import { ChevronLeft, Globe, RefreshCw, Copy, Check } from "lucide-react";

export default function Translation({ book, text, paragraphIndex, onBack }) {
  const [targetLang, setTargetLang] = useState("ur"); // default to Urdu
  const [translating, setTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [copied, setCopied] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "ur", name: "Urdu (اردو)" },
    { code: "ar", name: "Arabic (العربية)" },
    { code: "zh", name: "Chinese (中文)" },
    { code: "es", name: "Spanish (Español)" },
    { code: "fr", name: "French (Français)" }
  ];

  const handleTranslate = () => {
    setTranslating(true);
    // Simulate translation latency
    setTimeout(() => {
      setTranslating(false);
      
      // Check if we have preloaded translations for this book & language & paragraph index
      if (book.translations && book.translations[targetLang] && book.translations[targetLang][paragraphIndex]) {
        setTranslatedText(book.translations[targetLang][paragraphIndex]);
      } else {
        // Fallback simulated translation for uploaded books or missing indexes
        const langNames = {
          en: "English",
          ur: "اردو (Urdu Mock)",
          ar: "العربية (Arabic Mock)",
          zh: "中文 (Chinese Mock)",
          es: "Español (Spanish Mock)",
          fr: "Français (French Mock)"
        };
        setTranslatedText(`[Simulated Translation in ${langNames[targetLang]}]:\n\n"${text.substring(0, 100)}..."\n\n(Upload backend Node.js server API to connect this to real-time Google/OpenAI translation engines)`);
      }
    }, 1000);
  };

  useEffect(() => {
    if (text) {
      handleTranslate();
    }
  }, [targetLang, text, paragraphIndex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine alignment based on language direction
  const isRtl = targetLang === "ur" || targetLang === "ar";
  const bodyClass = isRtl 
    ? (targetLang === "ur" ? "translation-card-body urdu" : "translation-card-body arabic")
    : "translation-card-body";

  return (
    <div className="translation-screen animate-fade-in">
      {/* Translation Header */}
      <div className="app-header">
        <button className="header-btn" onClick={onBack}>
          <ChevronLeft size={18} />
        </button>
        <h1 style={{ fontSize: "14px" }}>AI Translator</h1>
        <div className="header-btn">
          <Globe size={15} />
        </div>
      </div>

      {/* Language Selector Selector Bar */}
      <div className="translation-controls-row">
        <span style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)" }}>Target Language:</span>
        <select 
          className="translation-select" 
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code} style={{ color: "var(--bg-color-dark)" }}>{l.name}</option>
          ))}
        </select>
      </div>

      {/* Side-by-side or Split top/down view */}
      <div className="translation-split-layout">
        {/* Source Text Card */}
        <div className="translation-card">
          <div className="translation-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "6px" }}>
            <span className="translation-card-title">Original (English)</span>
            <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Source</span>
          </div>
          <p className="translation-card-body" style={{ marginTop: "8px" }}>
            {text || "Open a book and highlight a paragraph to translate it."}
          </p>
        </div>

        {/* Target Translation Card */}
        <div className="translation-card" style={{ borderLeft: "2px solid var(--secondary-color)" }}>
          <div className="translation-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "6px" }}>
            <span className="translation-card-title">Translated ({languages.find(l=>l.code===targetLang)?.name})</span>
            {translatedText && (
              <button 
                onClick={handleCopy} 
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: "2px" }}
              >
                {copied ? <Check size={12} className="text-secondary" /> : <Copy size={12} />}
                <span style={{ fontSize: "9px" }}>{copied ? "Copied" : "Copy"}</span>
              </button>
            )}
          </div>
          
          {translating ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <RefreshCw size={24} className="text-secondary" style={{ animation: "rotateDisk 1.5s linear infinite" }} />
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>AI Translating...</span>
            </div>
          ) : (
            <p className={bodyClass} style={{ marginTop: "8px" }}>
              {translatedText || "Select target language to begin translation."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
