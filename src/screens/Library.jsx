import React, { useState, useRef } from "react";
import { Upload, BookOpen, Plus, Filter, Tag, Grid, Layers, Search, ChevronRight } from "lucide-react";
import { BOOK_CATEGORIES, BOOK_SUBCATEGORIES, CATEGORY_MAP } from "../db/books";

export default function Library({ books, onSelectBook, onUploadBook }) {
  const [viewMode, setViewMode] = useState("all"); // 'all' (standard library) or 'categories' (visual categories browser)
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef(null);

  // Emojis and Colors mapping for the 20 categories
  const categoryMeta = {
    "Fiction": { emoji: "📚", color: "rgba(99, 102, 241, 0.1)", border: "#6366f1" },
    "Science": { emoji: "🔬", color: "rgba(6, 182, 212, 0.1)", border: "#06b6d4" },
    "Self Help": { emoji: "⚡", color: "rgba(245, 175, 25, 0.1)", border: "#fec194" },
    "History": { emoji: "🏛️", color: "rgba(142, 158, 171, 0.1)", border: "#8e9eab" },
    "Education": { emoji: "🧠", color: "rgba(19, 78, 94, 0.1)", border: "#71b280" },
    "Business & Finance": { emoji: "📈", color: "rgba(17, 153, 142, 0.1)", border: "#38ef7d" },
    "Philosophy": { emoji: "🏺", color: "rgba(168, 85, 247, 0.1)", border: "#a855f7" },
    "Technology & AI": { emoji: "🤖", color: "rgba(0, 198, 255, 0.1)", border: "#0072ff" },
    "Biography": { emoji: "👤", color: "rgba(63, 43, 150, 0.1)", border: "#a8c0ff" },
    "Health & Wellness": { emoji: "🧘‍♀️", color: "rgba(255, 195, 160, 0.1)", border: "#ffafbd" },
    "Arts & Photography": { emoji: "🎨", color: "rgba(255, 216, 155, 0.1)", border: "#19547b" },
    "Poetry": { emoji: "🖋️", color: "rgba(112, 225, 245, 0.1)", border: "#ffd194" },
    "Travel & Adventure": { emoji: "🏕️", color: "rgba(19, 78, 94, 0.1)", border: "#71b280" },
    "Politics & Social Sciences": { emoji: "⚖️", color: "rgba(44, 62, 80, 0.1)", border: "#3498db" },
    "Religion & Spirituality": { emoji: "🕊️", color: "rgba(249, 168, 37, 0.1)", border: "#ff8f00" },
    "Mystery & Thriller": { emoji: "🕵️‍♂️", color: "rgba(55, 59, 68, 0.1)", border: "#4286f4" },
    "Children & Youth": { emoji: "🧸", color: "rgba(252, 0, 255, 0.1)", border: "#00fffc" },
    "Food & Cookery": { emoji: "🍳", color: "rgba(241, 39, 17, 0.1)", border: "#f5af19" },
    "Sports & Recreation": { emoji: "⚽", color: "rgba(132, 250, 176, 0.1)", border: "#8fd3f4" },
    "Nature & Environment": { emoji: "🌳", color: "rgba(30, 19, 12, 0.1)", border: "#9a8478" }
  };

  // Derive available subcategories
  const availableSubcategories = activeCategory === "All"
    ? ["All", ...BOOK_SUBCATEGORIES]
    : ["All", ...(CATEGORY_MAP[activeCategory] || [])];

  // Filtering Logic
  const filteredBooks = books.filter(book => {
    const matchCategory = activeCategory === "All" || book.category === activeCategory;
    const matchSubcategory = activeSubcategory === "All" || book.subcategory === activeSubcategory;
    const matchSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSubcategory && matchSearch;
  });

  const handleCategoryCardClick = (cat) => {
    setActiveCategory(cat);
    setActiveSubcategory("All");
    setViewMode("all"); // Jump back to book list showing filtered results
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split("\n").filter(line => line.trim() !== "");
      const title = file.name.replace(/\.[^/.]+$/, "");
      const paragraphs = lines.map(line => line.trim());
      const chapters = [];
      
      const pageSize = Math.max(1, Math.ceil(paragraphs.length / 30));
      for (let i = 1; i <= 30; i++) {
        const start = (i - 1) * pageSize;
        const pageParas = paragraphs.slice(start, start + pageSize);
        chapters.push({
          title: `Page ${i}: Section Reading`,
          paragraphs: pageParas.length > 0 ? pageParas : ["This page is intentionally blank."]
        });
      }

      const newBook = {
        id: `uploaded_${Date.now()}`,
        title: title.length > 30 ? `${title.substring(0, 30)}...` : title,
        author: "Uploaded Book",
        category: "Education",
        subcategory: "Academic Psychology",
        progress: 0,
        coverColor: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
        coverEmoji: "📄",
        summary: `Self-uploaded document: ${file.name}.`,
        chapters: chapters,
        translations: {
          es: [`[Traducido] ${title} Página 1...`],
          fr: [`[Traduit] ${title} Page 1...`],
          ar: [`[مترجم] ${title} صفحة 1...`],
          ur: [`[ترجمہ] ${title} صفحہ 1...`],
          zh: [`[已翻译] ${title} 第1页...`]
        }
      };

      onUploadBook(newBook);
    };
    reader.readAsText(file);
  };

  return (
    <div className="library-screen animate-fade-in" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      {/* 1. Segmented Control Switcher */}
      <div style={{
        display: "flex",
        background: "var(--bg-input)",
        borderRadius: "10px",
        padding: "3px",
        marginBottom: "12px",
        flexShrink: 0
      }}>
        <button 
          onClick={() => setViewMode("all")}
          style={{
            flex: 1,
            background: viewMode === "all" ? "var(--bg-card)" : "none",
            border: "none",
            color: viewMode === "all" ? "var(--primary-color)" : "var(--text-muted)",
            fontSize: "12px",
            fontWeight: "700",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "var(--transition-fast)"
          }}
        >
          <Grid size={13} />
          <span>All Books</span>
        </button>
        <button 
          onClick={() => setViewMode("categories")}
          style={{
            flex: 1,
            background: viewMode === "categories" ? "var(--bg-card)" : "none",
            border: "none",
            color: viewMode === "categories" ? "var(--primary-color)" : "var(--text-muted)",
            fontSize: "12px",
            fontWeight: "700",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "var(--transition-fast)"
          }}
        >
          <Layers size={13} />
          <span>Browse Categories</span>
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: "none" }} 
        accept=".txt,.epub,.pdf" 
      />

      {/* 2. MODE: EXPLORE ALL BOOKS */}
      {viewMode === "all" ? (
        <>
          {/* Search Box */}
          <div style={{ position: "relative", marginBottom: "12px", flexShrink: 0 }}>
            <Search size={14} className="text-muted" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by title or author..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", paddingLeft: "36px", height: "38px", fontSize: "12.5px" }}
            />
          </div>

          {/* Micro Category Filter Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden", flexShrink: 0, marginBottom: "4px" }}>
            <Filter size={12} className="text-secondary" style={{ flexShrink: 0 }} />
            <div className="category-slider" style={{ flex: 1 }}>
              <div 
                className={`category-tab ${activeCategory === "All" ? "active" : ""}`}
                onClick={() => handleCategorySelect("All")}
              >
                All Categories
              </div>
              {BOOK_CATEGORIES.map((cat) => (
                <div 
                  key={cat} 
                  className={`category-tab ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Subcategory Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden", margin: "0 0 12px", flexShrink: 0 }}>
            <Tag size={11} className="text-muted" style={{ flexShrink: 0 }} />
            <div className="category-slider" style={{ flex: 1 }}>
              {availableSubcategories.map((subcat) => (
                <div 
                  key={subcat} 
                  className={`category-tab ${activeSubcategory === subcat ? "active" : ""}`}
                  onClick={() => setActiveSubcategory(subcat)}
                  style={{ 
                    padding: "4px 10px", 
                    fontSize: "10px", 
                    backgroundColor: activeSubcategory === subcat ? "var(--primary-color)" : "rgba(255,255,255,0.03)",
                    color: activeSubcategory === subcat ? "white" : "var(--text-secondary)"
                  }}
                >
                  {subcat}
                </div>
              ))}
            </div>
          </div>

          {/* Filter Status Reset Header */}
          {(activeCategory !== "All" || activeSubcategory !== "All" || searchQuery) && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexShrink: 0 }}>
              <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                Showing {filteredBooks.length} results
              </span>
              <span 
                style={{ fontSize: "10px", color: "var(--primary-color)", fontWeight: "700", cursor: "pointer" }}
                onClick={() => {
                  setActiveCategory("All");
                  setActiveSubcategory("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </span>
            </div>
          )}

          {/* Books grid */}
          <div className="books-grid" style={{ flex: 1, overflowY: "auto", paddingBottom: "10px" }}>
            <div className="book-grid-item" onClick={handleUploadClick} style={{ height: "208px", justifyContent: "center", border: "2px dashed var(--primary-color)", backgroundColor: "rgba(99, 102, 241, 0.03)" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "var(--primary-color)", textAlign: "center" }}>
                <Plus size={28} />
                <span style={{ fontSize: "11px", fontWeight: "700" }}>Upload Document</span>
                <span style={{ fontSize: "9px", color: "var(--text-muted)" }}>TXT file<br/>(Autosplits to 30 pages)</span>
              </div>
            </div>

            {filteredBooks.map((book) => (
              <div 
                key={book.id} 
                className="book-grid-item"
                onClick={() => onSelectBook(book)}
              >
                <div className="book-grid-cover" style={{ background: book.coverColor }}>
                  {book.coverEmoji}
                  <div className="book-badge" style={{ fontSize: "8.5px" }}>{book.subcategory}</div>
                </div>
                <span className="book-grid-title">{book.title}</span>
                <span className="book-grid-author">{book.author}</span>
                
                <div style={{ marginTop: "auto" }}>
                  <div className="progress-track" style={{ height: "3px" }}>
                    <div className="progress-bar" style={{ width: `${book.progress}%` }}></div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8px", color: "var(--text-muted)", marginTop: "2px" }}>
                    <span>Reading progress</span>
                    <span>{book.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div style={{ padding: "40px 10px", textAlign: "center", flex: 1 }}>
              <BookOpen size={32} className="text-muted" style={{ margin: "0 auto 10px" }} />
              <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>No matching books found.</p>
            </div>
          )}
        </>
      ) : (
        /* 3. MODE: PROFESSIONAL CATEGORY GRID VIEW */
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: "10px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ marginBottom: "4px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-primary)" }}>Browse by Parent Genre</h3>
            <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Explore our 20 curated themes & 30 custom subcategories</p>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px"
          }}>
            {BOOK_CATEGORIES.map((cat) => {
              const meta = categoryMeta[cat] || { emoji: "📖", color: "rgba(255,255,255,0.02)", border: "var(--border-color)" };
              const booksCount = books.filter(b => b.category === cat).length;
              const subCount = CATEGORY_MAP[cat]?.length || 0;

              return (
                <div 
                  key={cat}
                  onClick={() => handleCategoryCardClick(cat)}
                  style={{
                    background: "var(--bg-card)",
                    border: `1px solid ${viewMode === "categories" && activeCategory === cat ? "var(--primary-color)" : "var(--border-color)"}`,
                    borderRadius: "14px",
                    padding: "12px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    position: "relative",
                    transition: "var(--transition-smooth)",
                    boxShadow: "0 4px 12px var(--shadow-color)"
                  }}
                  className="card"
                >
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: meta.color,
                    border: `1px solid ${meta.border}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px"
                  }}>
                    {meta.emoji}
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: "12.5px", fontWeight: "700", color: "var(--text-primary)" }}>{cat}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px" }}>
                      <span style={{ fontSize: "9.5px", color: "var(--text-muted)" }}>
                        {subCount} subgenres
                      </span>
                      <span style={{ 
                        fontSize: "9px", 
                        background: booksCount > 0 ? "var(--primary-gradient)" : "var(--border-color)", 
                        color: "white", 
                        padding: "1px 6px", 
                        borderRadius: "10px",
                        fontWeight: "700"
                      }}>
                        {booksCount} books
                      </span>
                    </div>
                  </div>

                  <ChevronRight size={12} className="text-muted" style={{ position: "absolute", right: "12px", top: "12px" }} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
