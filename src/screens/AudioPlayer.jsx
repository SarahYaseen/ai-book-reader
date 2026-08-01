import React from "react";
import { Play, Pause, RotateCcw, RotateCw, Volume2, ChevronDown, ListMusic, VolumeX } from "lucide-react";

export default function AudioPlayer({ 
  book, 
  isPlaying, 
  onPlayPause, 
  currentChapterIndex, 
  currentParagraphIndex, 
  onPreviousParagraph, 
  onNextParagraph,
  speechSpeed,
  onChangeSpeed,
  speechVoice,
  onChangeVoice,
  availableVoices,
  onBackToReader
}) {
  const chapter = book.chapters[currentChapterIndex] || book.chapters[0];
  const paragraphText = chapter.paragraphs[currentParagraphIndex] || "Preparing narration...";
  const totalParagraphs = chapter.paragraphs.length;

  return (
    <div className="audio-screen animate-fade-in">
      {/* Audio Header */}
      <div className="audio-header">
        <button 
          className="header-btn" 
          onClick={onBackToReader}
          style={{ width: "auto", padding: "0 12px", borderRadius: "16px", display: "flex", gap: "4px" }}
        >
          <ChevronDown size={16} />
          <span style={{ fontSize: "11px", fontWeight: "600" }}>Back to E-Book</span>
        </button>
        <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-muted)" }}>AI NARRATION</span>
        <button className="header-btn">
          <ListMusic size={16} />
        </button>
      </div>

      {/* Disk Cover art */}
      <div className="audio-disk-wrapper">
        <div className={`audio-disk ${isPlaying ? "playing" : ""}`} style={{ background: book.coverColor }}>
          <div className="audio-disk-inner">
            <span style={{ fontSize: "28px" }}>{book.coverEmoji}</span>
          </div>
        </div>
      </div>

      {/* Book details */}
      <div className="audio-meta">
        <h2>{book.title}</h2>
        <p>Narrating Page {currentChapterIndex + 1}: Paragraph {currentParagraphIndex + 1} of {totalParagraphs}</p>
      </div>

      {/* Highlight text being read */}
      <div className="audio-current-preview">
        <p>"{paragraphText}"</p>
      </div>

      {/* Slider Progress Bar */}
      <div className="audio-track-controls">
        <input 
          type="range" 
          className="audio-slider-input" 
          min="0" 
          max={totalParagraphs - 1} 
          value={currentParagraphIndex}
          onChange={(e) => {
            // Let the user seek paragraphs
            const index = parseInt(e.target.value, 10);
            if (index < currentParagraphIndex) {
              onPreviousParagraph(currentParagraphIndex - index);
            } else if (index > currentParagraphIndex) {
              onNextParagraph(index - currentParagraphIndex);
            }
          }}
        />
        <div className="time-row">
          <span>Para {currentParagraphIndex + 1}</span>
          <span>Page {currentChapterIndex + 1}</span>
        </div>
      </div>

      {/* Audio controls */}
      <div className="audio-player-btns">
        <button className="audio-ctrl-btn" onClick={() => onPreviousParagraph(1)}>
          <RotateCcw size={22} />
        </button>
        <button className="audio-ctrl-btn play-pause" onClick={onPlayPause}>
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: "4px" }} />}
        </button>
        <button className="audio-ctrl-btn" onClick={() => onNextParagraph(1)}>
          <RotateCw size={22} />
        </button>
      </div>

      {/* Voice & Speed controls */}
      <div className="audio-speed-voice-controls">
        <div className="form-group">
          <label style={{ fontSize: "10px" }}>Speed Control</label>
          <select 
            className="audio-select" 
            value={speechSpeed} 
            onChange={(e) => onChangeSpeed(parseFloat(e.target.value))}
          >
            <option value="0.5">0.5x Slow</option>
            <option value="0.75">0.75x</option>
            <option value="1.0">1.0x Normal</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x Fast</option>
            <option value="2.0">2.0x Double</option>
          </select>
        </div>

        <div className="form-group">
          <label style={{ fontSize: "10px" }}>Narrator Voice</label>
          <select 
            className="audio-select" 
            value={speechVoice} 
            onChange={(e) => onChangeVoice(e.target.value)}
          >
            {availableVoices.length > 0 ? (
              availableVoices.map((v, index) => (
                <option key={index} value={v.name}>{v.name}</option>
              ))
            ) : (
              <>
                <option value="native_m">English Male (AI)</option>
                <option value="native_f">English Female (AI)</option>
                <option value="native_uk">British accent (AI)</option>
                <option value="ur_m">Urdu Male (AI Mock)</option>
                <option value="ar_f">Arabic Female (AI Mock)</option>
                <option value="es_f">Spanish Accent (AI Mock)</option>
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
