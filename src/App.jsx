import React, { useState, useEffect, useRef } from "react";
import PhoneFrame from "./components/PhoneFrame";
import Splash from "./screens/Splash";
import Onboarding from "./screens/Onboarding";
import Auth from "./screens/Auth";
import Dashboard from "./screens/Dashboard";
import Library from "./screens/Library";
import Reader from "./screens/Reader";
import AudioPlayer from "./screens/AudioPlayer";
import Translation from "./screens/Translation";
import ChatAssistant from "./screens/ChatAssistant";
import Profile from "./screens/Profile";
import Subscription from "./screens/Subscription";

import { PRELOADED_BOOKS } from "./db/books";
import { BookOpen, Headphones, Globe, MessageSquare, User, Sparkles } from "lucide-react";

export default function App() {
  // Navigation & Router state
  // Screens: 'splash' | 'onboarding' | 'auth' | 'dashboard' | 'library' | 'reader' | 'audio' | 'translate' | 'chat' | 'profile' | 'subscription'
  const [screen, setScreen] = useState("splash");
  
  // Theme state
  const [theme, setTheme] = useState("dark"); // dark, light
  
  // User state
  const [user, setUser] = useState(null);

  // Books Library & Reading state
  const [books, setBooks] = useState(PRELOADED_BOOKS);
  const [activeBook, setActiveBook] = useState(null);
  
  // Audio Narrator states
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [speechVoice, setSpeechVoice] = useState("");
  const [systemVoices, setSystemVoices] = useState([]);
  
  // Statistics and user activity data
  const [readingHours, setReadingHours] = useState(12.5);
  const [audioHours, setAudioHours] = useState(4.2);
  const [bookmarks, setBookmarks] = useState([]);

  // Translation screen params
  const [translationText, setTranslationText] = useState("");
  const [translationIndex, setTranslationIndex] = useState(0);

  // Ref for holding the active SpeechSynthesisUtterance
  const utteranceRef = useRef(null);
  const statsIntervalRef = useRef(null);

  // 1. Initial State Loading from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("readai_user");
    const savedTheme = localStorage.getItem("readai_theme") || "dark";
    const savedBookmarks = localStorage.getItem("readai_bookmarks");
    const savedUploadedBooks = localStorage.getItem("readai_uploaded");
    const savedStats = localStorage.getItem("readai_stats");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setScreen("dashboard"); // Bypass onboarding if already logged in
    }
    
    setTheme(savedTheme);
    document.body.className = savedTheme === "light" ? "light-theme" : "";

    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    if (savedUploadedBooks) {
      const uploaded = JSON.parse(savedUploadedBooks);
      setBooks([...PRELOADED_BOOKS, ...uploaded]);
    }

    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setReadingHours(stats.readingHours);
      setAudioHours(stats.audioHours);
    }

    // Load speech synthesis voices
    const loadVoices = () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        setSystemVoices(voices);
        if (voices.length > 0 && !speechVoice) {
          // Select default English voice if available
          const defaultVoice = voices.find(v => v.lang.includes("en")) || voices[0];
          setSpeechVoice(defaultVoice.name);
        }
      }
    };
    
    loadVoices();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      // Clean up speech on unmount
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    };
  }, []);

  // 2. Track reading time statistics
  useEffect(() => {
    if (screen === "reader") {
      statsIntervalRef.current = setInterval(() => {
        setReadingHours(prev => {
          const newVal = parseFloat((prev + 0.01).toFixed(2));
          saveStats(newVal, audioHours);
          return newVal;
        });
      }, 36000); // add 0.01 hrs every 36 seconds (roughly ~1 min real time / 100)
    } else {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }
    }
    return () => {
      if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    };
  }, [screen]);

  // Helper to save stats to localStorage
  const saveStats = (readH, audioH) => {
    localStorage.setItem("readai_stats", JSON.stringify({ readingHours: readH, audioHours: audioH }));
  };

  // 3. Audio Player Text-To-Speech Logic
  const stopSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsAudioPlaying(false);
  };

  const speakCurrentParagraph = () => {
    if (typeof window === "undefined" || !window.speechSynthesis || !activeBook) return;

    // Cancel current speech before starting new
    window.speechSynthesis.cancel();

    const chapter = activeBook.chapters[currentChapterIndex] || activeBook.chapters[0];
    const textToSpeak = chapter.paragraphs[currentParagraphIndex];

    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    // Set voice speed multiplier
    utterance.rate = speechSpeed;

    // Configure Voice Accent if matching
    if (systemVoices.length > 0 && speechVoice) {
      const selectedObj = systemVoices.find(v => v.name === speechVoice);
      if (selectedObj) utterance.voice = selectedObj;
    }

    utterance.onstart = () => {
      setIsAudioPlaying(true);
    };

    utterance.onend = () => {
      // Advance to next paragraph when reading completes
      const totalParas = chapter.paragraphs.length;
      if (currentParagraphIndex < totalParas - 1) {
        // Increment stats
        setAudioHours(prev => {
          const newVal = parseFloat((prev + 0.02).toFixed(2));
          saveStats(readingHours, newVal);
          return newVal;
        });
        setCurrentParagraphIndex(prev => prev + 1);
      } else {
        // End of chapter
        stopSpeech();
      }
    };

    utterance.onerror = (e) => {
      console.error("SpeechSynthesis error:", e);
      setIsAudioPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // React to paragraph/voice/speed changes while playing
  useEffect(() => {
    if (isAudioPlaying) {
      speakCurrentParagraph();
    }
  }, [currentParagraphIndex, currentChapterIndex, speechSpeed, speechVoice]);

  const handlePlayPause = () => {
    if (isAudioPlaying) {
      stopSpeech();
    } else {
      speakCurrentParagraph();
    }
  };

  const handleNextParagraph = (skipAmount = 1) => {
    if (!activeBook) return;
    const chapter = activeBook.chapters[currentChapterIndex];
    const totalParas = chapter.paragraphs.length;
    
    if (currentParagraphIndex + skipAmount < totalParas) {
      setCurrentParagraphIndex(prev => prev + skipAmount);
    } else {
      // Go to next chapter
      if (currentChapterIndex < activeBook.chapters.length - 1) {
        setCurrentChapterIndex(prev => prev + 1);
        setCurrentParagraphIndex(0);
      } else {
        stopSpeech();
      }
    }
  };

  const handlePreviousParagraph = (skipAmount = 1) => {
    if (currentParagraphIndex - skipAmount >= 0) {
      setCurrentParagraphIndex(prev => prev - skipAmount);
    } else {
      // Go to prev chapter
      if (currentChapterIndex > 0) {
        setCurrentChapterIndex(prev => prev - 1);
        const prevChapter = activeBook.chapters[currentChapterIndex - 1];
        setCurrentParagraphIndex(prevChapter.paragraphs.length - 1);
      }
    }
  };

  const handleStartSpeechParagraph = (book, chapIdx, paraIdx) => {
    setActiveBook(book);
    setCurrentChapterIndex(chapIdx);
    setCurrentParagraphIndex(paraIdx);
    // Setting this triggers the useEffect speakCurrentParagraph
    setIsAudioPlaying(true);
  };

  // 4. Handle Theme Switching
  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("readai_theme", newTheme);
    document.body.className = newTheme === "light" ? "light-theme" : "";
  };

  // 5. User Authentication Handlers
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("readai_user", JSON.stringify(userData));
    setScreen("dashboard");
  };

  const handleLogout = () => {
    stopSpeech();
    setUser(null);
    localStorage.removeItem("readai_user");
    setScreen("auth");
  };

  // 6. Subscription Upgrades
  const handleUpgradeComplete = () => {
    const upgradedUser = { ...user, isPremium: true };
    setUser(upgradedUser);
    localStorage.setItem("readai_user", JSON.stringify(upgradedUser));
    
    // Redirect with animation delay
    setTimeout(() => {
      setScreen("dashboard");
    }, 1500);
  };

  // 7. Library Upload Handler
  const handleUploadBook = (newBook) => {
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    
    // Save only uploaded books to localStorage (to avoid duplicate static entries)
    const uploadedOnly = updatedBooks.filter(b => b.id.toString().startsWith("uploaded_"));
    localStorage.setItem("readai_uploaded", JSON.stringify(uploadedOnly));

    // Jump straight to the newly uploaded book
    setActiveBook(newBook);
    setCurrentChapterIndex(0);
    setCurrentParagraphIndex(0);
    setScreen("reader");
  };

  // 8. Bookmarks Management
  const handleAddBookmark = (newBm) => {
    const updated = [newBm, ...bookmarks];
    setBookmarks(updated);
    localStorage.setItem("readai_bookmarks", JSON.stringify(updated));
  };

  const handleSelectBookmark = (bm) => {
    const matchedBook = books.find(b => b.id === bm.bookId);
    if (!matchedBook) return;

    setActiveBook(matchedBook);
    // Find chapter index matching bookmarks context
    const chapIdx = matchedBook.chapters.findIndex(c => c.title === bm.chapterTitle);
    setCurrentChapterIndex(chapIdx >= 0 ? chapIdx : 0);
    
    // Attempt to match paragraph content
    const chapObj = matchedBook.chapters[chapIdx >= 0 ? chapIdx : 0];
    const paraIdx = chapObj.paragraphs.findIndex(p => p.includes(bm.text.substring(1, 40)));
    setCurrentParagraphIndex(paraIdx >= 0 ? paraIdx : 0);

    setScreen("reader");
  };

  // 9. Translation Navigation Trigger
  const handleGoToTranslate = (book, paragraphText, paragraphIndex) => {
    setActiveBook(book);
    setTranslationText(paragraphText);
    setTranslationIndex(paragraphIndex);
    setScreen("translate");
  };

  // 10. Router Screen Rendering
  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <Splash onComplete={() => setScreen("onboarding")} />;
      case "onboarding":
        return <Onboarding onComplete={() => setScreen("auth")} />;
      case "auth":
        return <Auth onLogin={handleLogin} />;
      case "dashboard":
        return (
          <Dashboard 
            user={user} 
            books={books} 
            stats={{ readingHours, audioHours }}
            bookmarks={bookmarks}
            onSelectBook={(book) => {
              setActiveBook(book);
              setCurrentChapterIndex(0);
              setCurrentParagraphIndex(0);
              setScreen("reader");
            }}
            onViewAllLibrary={() => setScreen("library")}
            onSelectBookmark={handleSelectBookmark}
          />
        );
      case "library":
        return (
          <Library 
            books={books} 
            onSelectBook={(book) => {
              setActiveBook(book);
              setCurrentChapterIndex(0);
              setCurrentParagraphIndex(0);
              setScreen("reader");
            }}
            onUploadBook={handleUploadBook}
          />
        );
      case "reader":
        return (
          <Reader 
            book={activeBook || books[0]} 
            onBack={() => setScreen("dashboard")}
            onGoToAudio={(book) => {
              setActiveBook(book);
              setScreen("audio");
            }}
            onGoToTranslate={handleGoToTranslate}
            onGoToChat={(book) => {
              setActiveBook(book);
              setScreen("chat");
            }}
            onAddBookmark={handleAddBookmark}
            isSpeechActive={isAudioPlaying}
            activeSpeechIndex={currentParagraphIndex}
            onStartSpeechParagraph={handleStartSpeechParagraph}
          />
        );
      case "audio":
        return (
          <AudioPlayer 
            book={activeBook || books[0]} 
            isPlaying={isAudioPlaying}
            onPlayPause={handlePlayPause}
            currentChapterIndex={currentChapterIndex}
            currentParagraphIndex={currentParagraphIndex}
            onPreviousParagraph={handlePreviousParagraph}
            onNextParagraph={handleNextParagraph}
            speechSpeed={speechSpeed}
            onChangeSpeed={setSpeechSpeed}
            speechVoice={speechVoice}
            onChangeVoice={setSpeechVoice}
            availableVoices={systemVoices}
            onBackToReader={() => setScreen("reader")}
          />
        );
      case "translate":
        return (
          <Translation 
            book={activeBook || books[0]} 
            text={translationText || (activeBook || books[0]).chapters[0].paragraphs[0]}
            paragraphIndex={translationIndex}
            onBack={() => setScreen("reader")}
          />
        );
      case "chat":
        return <ChatAssistant book={activeBook || books[0]} />;
      case "profile":
        return (
          <Profile 
            user={user} 
            onLogout={handleLogout} 
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onGoToSubscription={() => setScreen("subscription")}
          />
        );
      case "subscription":
        return (
          <Subscription 
            user={user} 
            onUpgradeComplete={handleUpgradeComplete} 
            onBack={() => setScreen("profile")} 
          />
        );
      default:
        return <Dashboard user={user} books={books} onSelectBook={setActiveBook} />;
    }
  };

  // Header tabs are visible on main viewports (dashboard, library, chat, profile)
  const isTabBarVisible = ["dashboard", "library", "chat", "profile"].includes(screen);

  return (
    <PhoneFrame>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
        {/* Main Screen Viewport */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: isTabBarVisible ? "60px" : "0" }}>
          {renderScreen()}
        </div>

        {/* Persistent Premium listening background notification bar */}
        {isAudioPlaying && screen !== "audio" && (
          <div 
            onClick={() => setScreen("audio")}
            style={{
              position: "absolute",
              bottom: isTabBarVisible ? "68px" : "12px",
              left: "12px",
              right: "12px",
              background: "var(--secondary-gradient)",
              color: "white",
              borderRadius: "12px",
              padding: "8px 12px",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 15px rgba(6,182,212,0.3)",
              cursor: "pointer",
              animation: "floatUp 0.3s forwards",
              zIndex: 90
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "80%" }}>
              <Headphones size={13} style={{ animation: "rotateDisk 4s linear infinite" }} />
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Playing: {activeBook?.title}
              </span>
            </div>
            <span style={{ fontWeight: "700", fontSize: "9px", textTransform: "uppercase" }}>Open Player</span>
          </div>
        )}

        {/* Global Bottom Tab Navigator */}
        {isTabBarVisible && (
          <div className="navbar animate-fade-in">
            <button 
              className={`nav-item ${screen === "dashboard" ? "active" : ""}`}
              onClick={() => setScreen("dashboard")}
            >
              <BookOpen size={18} />
              <span>Home</span>
            </button>
            
            <button 
              className={`nav-item ${screen === "library" ? "active" : ""}`}
              onClick={() => setScreen("library")}
            >
              <Sparkles size={18} />
              <span>Library</span>
            </button>

            <button 
              className={`nav-item ${screen === "chat" ? "active" : ""}`}
              onClick={() => {
                if (!activeBook && books.length > 0) setActiveBook(books[0]);
                setScreen("chat");
              }}
            >
              <MessageSquare size={18} />
              <span>AI Chat</span>
            </button>

            <button 
              className={`nav-item ${screen === "profile" ? "active" : ""}`}
              onClick={() => setScreen("profile")}
            >
              <User size={18} />
              <span>Profile</span>
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
