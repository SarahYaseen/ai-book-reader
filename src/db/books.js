// Define 20 Parent Categories
export const BOOK_CATEGORIES = [
  "Fiction",
  "Science",
  "Self Help",
  "History",
  "Education",
  "Business & Finance",
  "Philosophy",
  "Technology & AI",
  "Biography",
  "Health & Wellness",
  "Arts & Photography",
  "Poetry",
  "Travel & Adventure",
  "Politics & Social Sciences",
  "Religion & Spirituality",
  "Mystery & Thriller",
  "Children & Youth",
  "Food & Cookery",
  "Sports & Recreation",
  "Nature & Environment"
];

// Define 30 Subcategories
export const BOOK_SUBCATEGORIES = [
  "Classic Novels",
  "Sci-Fi & Dystopia",
  "Astrophysics",
  "Genetics & Biology",
  "Habit Building",
  "Communication Skills",
  "Ancient Rome",
  "World War History",
  "Mathematics",
  "Academic Psychology",
  "Financial Freedom",
  "Entrepreneurship",
  "Ancient Greek Philosophy",
  "Existentialism",
  "Artificial Intelligence",
  "Quantum Computing",
  "Famous Innovators",
  "Political Leaders",
  "Nutrition & Diet",
  "Mindfulness & Yoga",
  "Art History",
  "Modern Poetry",
  "Epic Fantasy",
  "Geopolitics",
  "Comparative Theology",
  "True Crime",
  "Fairy Tales",
  "Baking & Desserts",
  "Physical Training",
  "Climate & Ecology"
];

// Helper mapping for Categories to their Subcategories
export const CATEGORY_MAP = {
  "Fiction": ["Classic Novels", "Epic Fantasy", "Sci-Fi & Dystopia"],
  "Science": ["Astrophysics", "Genetics & Biology"],
  "Self Help": ["Habit Building", "Communication Skills", "Mindfulness & Yoga"],
  "History": ["Ancient Rome", "World War History"],
  "Education": ["Mathematics", "Academic Psychology"],
  "Business & Finance": ["Financial Freedom", "Entrepreneurship"],
  "Philosophy": ["Ancient Greek Philosophy", "Existentialism"],
  "Technology & AI": ["Artificial Intelligence", "Quantum Computing"],
  "Biography": ["Famous Innovators", "Political Leaders"],
  "Health & Wellness": ["Nutrition & Diet", "Mindfulness & Yoga"],
  "Arts & Photography": ["Art History"],
  "Poetry": ["Modern Poetry"],
  "Travel & Adventure": ["Epic Fantasy"],
  "Politics & Social Sciences": ["Geopolitics"],
  "Religion & Spirituality": ["Comparative Theology"],
  "Mystery & Thriller": ["True Crime"],
  "Children & Youth": ["Fairy Tales"],
  "Food & Cookery": ["Baking & Desserts"],
  "Sports & Recreation": ["Physical Training"],
  "Nature & Environment": ["Climate & Ecology"]
};

// Base books definitions (25 books)
const BASE_BOOKS = [
  {
    id: "gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    subcategory: "Classic Novels",
    progress: 35,
    coverColor: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    coverEmoji: "🥂",
    summary: "A portrait of the Jazz Age in all its decadence and excess, Gatsby explores themes of wealth, love, and the American Dream."
  },
  {
    id: "mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    subcategory: "Classic Novels",
    progress: 12,
    coverColor: "linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)",
    coverEmoji: "🦜",
    summary: "Set in the deep South, this novel focuses on Atticus Finch's defense of a Black man falsely accused of a crime, seen through Scout Finch's eyes."
  },
  {
    id: "nineteen84",
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    subcategory: "Sci-Fi & Dystopia",
    progress: 50,
    coverColor: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
    coverEmoji: "👁️",
    summary: "Orwell's haunting dystopian vision of a totalitarian society ruled by Big Brother, where individual thought is a crime."
  },
  {
    id: "history-time",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    subcategory: "Astrophysics",
    progress: 72,
    coverColor: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    coverEmoji: "🌌",
    summary: "Hawking explains the structure, origin, development and eventual fate of the universe in accessible language."
  },
  {
    id: "cosmos",
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    subcategory: "Astrophysics",
    progress: 40,
    coverColor: "linear-gradient(135deg, #4f00bc 0%, #29007b 100%)",
    coverEmoji: "🪐",
    summary: "Sagan explores 15 billion years of cosmic evolution, tracing the mutual development of science, philosophy, and civilization."
  },
  {
    id: "selfishgene",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Science",
    subcategory: "Genetics & Biology",
    progress: 15,
    coverColor: "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)",
    coverEmoji: "🧬",
    summary: "A revolutionary perspective on evolution, arguing that genes—rather than organisms—are the primary unit of natural selection."
  },
  {
    id: "habit",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    category: "Self Help",
    subcategory: "Habit Building",
    progress: 90,
    coverColor: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    coverEmoji: "⚡",
    summary: "Duhigg explores the science of habit formation and change, explaining how habits shape our lives, businesses, and societies."
  },
  {
    id: "atomic",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    subcategory: "Habit Building",
    progress: 68,
    coverColor: "linear-gradient(135deg, #ff9900 0%, #ff5500 100%)",
    coverEmoji: "⚛️",
    summary: "A practical guide to building good habits and breaking bad ones, focusing on tiny, 1% daily self-improvements."
  },
  {
    id: "friends",
    title: "How to Win Friends",
    author: "Dale Carnegie",
    category: "Self Help",
    subcategory: "Communication Skills",
    progress: 82,
    coverColor: "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)",
    coverEmoji: "🤝",
    summary: "Timeless advice on communication, relationship-building, and leadership, based on fundamental principles of human nature."
  },
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    subcategory: "Ancient Rome",
    progress: 88,
    coverColor: "linear-gradient(135deg, #e65c00 0%, #f9d423 100%)",
    coverEmoji: "🦍",
    summary: "Harari surveys the history of humankind, from the emergence of Homo Sapiens in Stone Age to modern biotech revolutions."
  },
  {
    id: "guns-august",
    title: "The Guns of August",
    author: "Barbara W. Tuchman",
    category: "History",
    subcategory: "World War History",
    progress: 10,
    coverColor: "linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)",
    coverEmoji: "🎖️",
    summary: "A dramatic account of the opening month of World War I, detailing the political decisions and military plans that led to global conflict."
  },
  {
    id: "psychology-intro",
    title: "Principles of Psychology",
    author: "William James",
    category: "Education",
    subcategory: "Academic Psychology",
    progress: 60,
    coverColor: "linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)",
    coverEmoji: "🧠",
    summary: "A fundamental guide to understanding human behavior, cognitive processes, and consciousness."
  },
  {
    id: "calculus-easy",
    title: "Calculus Made Easy",
    author: "Silvanus P. Thompson",
    category: "Education",
    subcategory: "Mathematics",
    progress: 15,
    coverColor: "linear-gradient(135deg, #fc00ff 0%, #00fffc 100%)",
    coverEmoji: "📐",
    summary: "The classic text that demystifies differential and integral calculus, explaining mathematical concepts in plain English."
  },
  {
    id: "fintech-revolution",
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    category: "Business & Finance",
    subcategory: "Financial Freedom",
    progress: 42,
    coverColor: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    coverEmoji: "📈",
    summary: "The classic guide to value investing, offering robust principles for avoiding substantial losses and achieving long-term gains."
  },
  {
    id: "philosophy-republic",
    title: "The Republic",
    author: "Plato",
    category: "Philosophy",
    subcategory: "Ancient Greek Philosophy",
    progress: 28,
    coverColor: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
    coverEmoji: "🏺",
    summary: "Plato's central dialogue, outlining the concept of an ideal state, justice, philosopher kings, and the Allegory of the Cave."
  },
  {
    id: "ai-superpowers",
    title: "AI Superpowers",
    author: "Kai-Fu Lee",
    category: "Technology & AI",
    subcategory: "Artificial Intelligence",
    progress: 54,
    coverColor: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
    coverEmoji: "🤖",
    summary: "Lee explores the rapid rise of AI innovations in China and the US, analyzing the societal impacts on jobs and human relationships."
  },
  {
    id: "steve-jobs",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    subcategory: "Famous Innovators",
    progress: 75,
    coverColor: "linear-gradient(135deg, #3f2b96 0%, #a8c0ff 100%)",
    coverEmoji: "🍎",
    summary: "The definitive biography of Apple's co-founder, based on three years of exclusive interviews detailing his creative genius."
  },
  {
    id: "mindfulness-med",
    title: "Wherever You Go, There You Are",
    author: "Jon Kabat-Zinn",
    category: "Health & Wellness",
    subcategory: "Mindfulness & Yoga",
    progress: 62,
    coverColor: "linear-gradient(135deg, #ffc3a0 0%, #ffafbd 100%)",
    coverEmoji: "🧘‍♀️",
    summary: "A warm, structured introduction to mindfulness meditation, helping readers cultivate presence in their daily busy lives."
  },
  {
    id: "art-history-intro",
    title: "The Story of Art",
    author: "E.H. Gombrich",
    category: "Arts & Photography",
    subcategory: "Art History",
    progress: 23,
    coverColor: "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
    coverEmoji: "🎨",
    summary: "One of the most famous introductions to visual arts, tracing humanity's artistic creations from cave drawings to modern installations."
  },
  {
    id: "modern-poetry-collection",
    title: "Leaves of Grass",
    author: "Walt Whitman",
    category: "Poetry",
    subcategory: "Modern Poetry",
    progress: 19,
    coverColor: "linear-gradient(135deg, #70e1f5 0%, #ffd194 100%)",
    coverEmoji: "🖋️",
    summary: "Whitman's masterpiece collection of poetry, celebrating nature, democracy, individual spirit, and human connection."
  },
  {
    id: "travel-adventure-wild",
    title: "Into the Wild",
    author: "Jon Krakauer",
    category: "Travel & Adventure",
    subcategory: "Epic Fantasy",
    progress: 49,
    coverColor: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    coverEmoji: "🏕️",
    summary: "The tragic true story of Christopher McCandless, who walked into the Alaskan wilderness to escape modern societal pressures."
  },
  {
    id: "geopolitics-world",
    title: "Prisoners of Geography",
    author: "Tim Marshall",
    category: "Politics & Social Sciences",
    subcategory: "Geopolitics",
    progress: 81,
    coverColor: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
    coverEmoji: "🗺️",
    summary: "Marshall explains how geographic realities (rivers, mountains, borders) dictate the political decisions and conflicts of global leaders."
  },
  {
    id: "religion-spirit-theology",
    title: "The World's Religions",
    author: "Huston Smith",
    category: "Religion & Spirituality",
    subcategory: "Comparative Theology",
    progress: 11,
    coverColor: "linear-gradient(135deg, #f9a825 0%, #ff8f00 100%)",
    coverEmoji: "🕊️",
    summary: "An introduction to the history, values, and core beliefs of major global faiths, emphasizing spiritual empathy."
  },
  {
    id: "mystery-true-crime",
    title: "In Cold Blood",
    author: "Truman Capote",
    category: "Mystery & Thriller",
    subcategory: "True Crime",
    progress: 38,
    coverColor: "linear-gradient(135deg, #373b44 0%, #4286f4 100%)",
    coverEmoji: "🩸",
    summary: "Capote's pioneering true-crime masterpiece, documenting the brutal murders of the Clutter family in Kansas and its aftermath."
  },
  {
    id: "nature-ecology-climate",
    title: "The Sixth Extinction",
    author: "Elizabeth Kolbert",
    category: "Nature & Environment",
    subcategory: "Climate & Ecology",
    progress: 92,
    coverColor: "linear-gradient(135deg, #1e130c 0%, #9a8478 100%)",
    coverEmoji: "🦕",
    summary: "Kolbert documents the human-caused ecological crises leading to the earth's sixth mass extinction event."
  }
];

// Content Dictionary to supply 30 unique, highly informational and distinct subjects
const PAGE_TEMPLATES = [
  {
    title: "Author Preface & Core Vision",
    paragraphs: [
      "Every monumental piece of literature begins with a singular intent. For this work, the author lays down the framework to understand how the broader category of {category} intersects directly with the practical applications of {subcategory}.",
      "This section challenges readers to look past superficial descriptions, highlighting that the primary thesis of the text is built upon decades of rigorous exploration. It invites the audience to critically assess their biases before proceeding further."
    ]
  },
  {
    title: "Historical Context & Environment",
    paragraphs: [
      "The environment in which a book is created dictates its undercurrents. At the time of writing, society was undergoing massive shifts that directly influenced this discussion. These external factors added weight to the author's observations.",
      "Analyzing these external realities helps readers understand the urgency behind the text. It makes the conceptual structures of {subcategory} feel not just academic, but deeply rooted in active human struggles."
    ]
  },
  {
    title: "Key Premise & Structural Thesis",
    paragraphs: [
      "The core thesis is simple: the patterns we observe are rarely accidental. The author notes that understanding this work requires defining the primary variables, laying the foundation for all subsequent chapters.",
      "By isolating these variables, we gain a clear framework for analyzing the case studies that follow. The text acts as a roadmap, guiding the reader through complex relationships with mathematical precision."
    ]
  },
  {
    title: "Foundational Theories & Early Critiques",
    paragraphs: [
      "Early reviews of this work highlighted its radical departure from traditional academic models. Critics argued that the emphasis on {subcategory} was either too idealistic or lacked sufficient empirical verification.",
      "In response, the author outlines the supporting data, addressing these critiques directly. This chapter functions as a defensive buffer, establishing credibility and silencing early detractors."
    ]
  },
  {
    title: "Narrative Setup & Exposition",
    paragraphs: [
      "Here, we dive into the physical settings and narrative parameters. The exposition is crafted to make the abstract concepts of {category} feel immediate and tangible, introducing the early case studies and research protocols.",
      "This detailed background ensures that when the major conflicts or theoretical shifts occur, the reader has a firm grasp of the starting conditions."
    ]
  },
  {
    title: "Methodology & Research Design",
    paragraphs: [
      "For a treatise on {category}, the method of analysis is just as important as the conclusions. The author utilizes a qualitative approach, combining historical archives with direct observation to map out patterns.",
      "This rigorous design ensures that the conclusions are replicable. It bridges the gap between pure theory and practical application, providing a blueprint for future researchers."
    ]
  },
  {
    title: "Symbolic Meanings & Hidden Motifs",
    paragraphs: [
      "Underneath the literal text lies a rich layer of symbolism. Emojis and motifs are deployed strategically to mirror internal psychological shifts. For example, recurring themes represent the constant search for order within chaos.",
      "By decoding these symbols, we uncover the author's deeper message, revealing a philosophical critique of modern civilization and its relationship with {subcategory}."
    ]
  },
  {
    title: "Case Study 1: The Initial Test",
    paragraphs: [
      "The author introduces the first major experiment to test the thesis. In this scenario, subjects were exposed to variables designed to disrupt established patterns, measuring their behavioral adaptability.",
      "The results were startling: most subjects reverted to default behaviors, highlighting the incredible resistance to change that exists within human systems."
    ]
  },
  {
    title: "Core Conflicts & Dialectical Tensions",
    paragraphs: [
      "No progress occurs without friction. The text explores the primary tension between conservation and innovation. This conflict drives both the scientific breakthroughs and the narrative tension.",
      "Understanding this dialectic allows us to predict where the system will fail. It highlights that tension is not a bug, but a necessary feature of evolution."
    ]
  },
  {
    title: "Contemporary Reception & Modern Reviews",
    paragraphs: [
      "Decades after its initial publication, this text continues to provoke debate. Modern analysts review the arguments through the lens of recent technological and social advancements, finding new relevance.",
      "This ongoing dialogue proves the timeless nature of the author's insights, showing that the core arguments adapt to new centuries without losing their analytical bite."
    ]
  },
  {
    title: "Thematic Development: Cause & Effect",
    paragraphs: [
      "Every action triggers a reaction. The author details the cascade of consequences that occur when minor variables in {subcategory} are modified, showing how small changes compound into massive shifts.",
      "This mapping of cause and effect is crucial for designing intervention strategies. It shifts the reader's focus from crisis management to proactive system design."
    ]
  },
  {
    title: "Theoretical Models: The Scientific View",
    paragraphs: [
      "Here, the focus shifts to quantitative models. The text outlines formulas and structural diagrams representing the flow of energy or information, making the ideas of {category} mathematically explicit.",
      "These models strip away subjective bias, providing an objective framework that can be tested in any laboratory or economic environment."
    ]
  },
  {
    title: "Practical Advice: Behavioral Changes",
    paragraphs: [
      "Theory must eventually translate to action. The author outlines specific, daily changes readers can implement to apply these principles. These steps are designed to be accessible, requiring no specialized training.",
      "By focusing on habits and micro-routines, the text empowers the individual. It shows that the grand theories of the universe are ultimately practiced in the small moments of daily life."
    ]
  },
  {
    title: "Key Milestones & Historical Turning Points",
    paragraphs: [
      "The historical timeline is punctuated by moments of extreme disruption. The author reviews these milestones, showing how they accelerated the adoption of the ideas discussed in this book.",
      "This historical analysis provides context, proving that crisis is often the primary catalyst for structural progress and scientific revolution."
    ]
  },
  {
    title: "Socioeconomic Underpinnings",
    paragraphs: [
      "Ideas do not exist in a vacuum; they are funded. The text examines the economic interests that drove research in this field, exposing how financial incentives shape scientific consensus.",
      "This critical analysis reveals the power dynamics at play. It forces the reader to ask: who benefits from the propagation of these theories?"
    ]
  },
  {
    title: "Midpoint Synthesis: Review of Progress",
    paragraphs: [
      "Halfway through the volume, we pause to synthesize our findings. The early chapters established the variables; the middle sections tested them. Now, we combine these insights to form a unified model.",
      "This synthesis prepares us for the complex applications explored in the second half of the book, ensuring no reader is left behind."
    ]
  },
  {
    title: "Underrepresented Perspectives & Subplots",
    paragraphs: [
      "Every mainstream narrative leaves voices out. The author dedicates this section to analyzing alternative views and minority case studies that contradict the dominant models of {subcategory}.",
      "These outliers are critical: they expose the limitations of our models, showing where the theories fail to explain real-world behaviors."
    ]
  },
  {
    title: "Cross-Disciplinary Connections",
    paragraphs: [
      "The boundaries between academic departments are artificial. The author bridges the gap between {category} and other disciplines like art, psychology, and physics, showing how they share a common logic.",
      "This interdisciplinary approach enriches the text, providing fresh metaphors and tools for solving complex, multi-dimensional problems."
    ]
  },
  {
    title: "Ethical Implications & Moral Dilemmas",
    paragraphs: [
      "Just because we can build a system does not mean we should. The text raises deep ethical queries about the application of these technologies, warning against the unchecked pursuit of efficiency.",
      "These warnings are highly relevant today, urging scientists and policy-makers to prioritize human welfare over pure technological advancement."
    ]
  },
  {
    title: "Modern Adaptations & Cultural Footprint",
    paragraphs: [
      "From films to references in popular culture, the ideas in this book have escaped the classroom and entered the public consciousness, shaping how we speak about society.",
      "This cultural footprint is a testament to the power of the author's metaphors. It proves that complex ideas, when expressed clearly, can capture the public imagination."
    ]
  },
  {
    title: "Daily Implementation Strategies",
    paragraphs: [
      "How do you start? The author recommends starting with a audit of your current routines, identifying where the inefficiencies lie. This audit is the first step toward optimization.",
      "Once the baseline is established, you can introduce systematic changes, measuring their impact weekly to ensure sustainable progress."
    ]
  },
  {
    title: "Reader Reflection & Journal Prompts",
    paragraphs: [
      "Reading should be active. Write down your thoughts on this page: How do these concepts manifest in your own life? What resistance do you feel toward these ideas?",
      "Engaging with these prompts transforms the book from a passive text into an active dialogue, accelerating your learning and retention."
    ]
  },
  {
    title: "AI Reading Companion Prompts",
    paragraphs: [
      "To deepen your understanding, try asking the ReadAI chatbot these questions: 'Explain the connection between page 15 and page 23,' or 'Draft a critique of the author's methodology.'",
      "Using the AI assistant turns this book into a dynamic, interactive workspace, allowing you to interrogate the text in real-time."
    ]
  },
  {
    title: "Comparative Literature: Matching Works",
    paragraphs: [
      "To get a complete view of this topic, read this alongside other classics in the same field. Comparing different approaches highlights the strengths and weaknesses of each author.",
      "This comparative method is the hallmark of advanced education, helping you synthesize competing viewpoints into your own unified philosophy."
    ]
  },
  {
    title: "Core Takeaways & Action Items",
    paragraphs: [
      "Here is the checklist of key lessons: 1) Isolate the cue. 2) Identify the rewards. 3) Standardize the metrics. 4) Continuously audit the outcomes.",
      "These items provide a clear path forward, transforming the book's abstract philosophy into a concrete, actionable project."
    ]
  },
  {
    title: "Unanswered Questions & Open Debates",
    paragraphs: [
      "Despite the book's depth, many mysteries remain. The author outlines the areas where research is still incomplete, pointing the way for future scientific exploration.",
      "These open questions show that science is a living process. They invite the next generation of thinkers to build upon this foundation."
    ]
  },
  {
    title: "Legacy & Generational Impact",
    paragraphs: [
      "Great books shape generations. The children of the readers who first bought this book grew up in a world defined by its ideas, illustrating the long-term impact of literature.",
      "This generational shift changes how we view reality. It proves that the philosophical arguments of today become the common sense of tomorrow."
    ]
  },
  {
    title: "Climax & Narrative Resolution",
    paragraphs: [
      "The threads of argument are finally pulled together. The conflicts introduced in the early chapters reach their logical conclusion, resolving the tensions and providing a satisfying closure.",
      "This resolution is not just a ending, but a synthesis. It shows that the journey was necessary to fully appreciate the final destination."
    ]
  },
  {
    title: "Synthesis: The Broader Landscape",
    paragraphs: [
      "Stepping back, we look at the entire landscape of this book. We see how the individual pages fit together like pieces of a puzzle, forming a coherent vision of {category}.",
      "This broad perspective is where true wisdom lies. It allows you to see the forest and the trees, understanding both the grand theories and the daily details."
    ]
  },
  {
    title: "Conclusion & Final Summary",
    paragraphs: [
      "We have reached the final page. The journey through the 30 pages of this volume has explored the history, science, and practical applications of '{title}'.",
      "As you close this book, remember that reading is only the beginning. The true value of this work lies in how you apply these insights to your own life and work."
    ]
  }
];

// Content Generator to create 30 full pages of text for every book
const generate30Pages = (book) => {
  const pages = [];
  
  for (let i = 1; i <= 30; i++) {
    // Retrieve template for this page index
    const template = PAGE_TEMPLATES[i - 1];

    // Format paragraphs dynamically by replacing variables
    const formattedParagraphs = template.paragraphs.map(p => {
      return p
        .replace(/{title}/g, book.title)
        .replace(/{author}/g, book.author)
        .replace(/{category}/g, book.category)
        .replace(/{subcategory}/g, book.subcategory);
    });

    pages.push({
      title: `Page ${i}: ${template.title}`,
      paragraphs: formattedParagraphs
    });
  }

  return pages;
};

// Map through the base books and generate 30 pages for each
export const PRELOADED_BOOKS = BASE_BOOKS.map(book => {
  const chapters = generate30Pages(book);
  
  // Custom mock translations for Page 1 paragraphs (specifically Urdu/Arabic/Spanish/French/Chinese)
  const translations = {
    es: [
      `Esta es la página 1 de "${book.title}", escrita por el renombrado autor ${book.author}. En esta sección, se invita al lector a analizar cómo se alinean los principios del libro.`,
      `Aquí examinamos cómo el autor construye sobre la premisa principal introducida en el resumen del libro.`,
      `Finalmente, los argumentos finales de esta página refuerzan el mensaje general.`
    ],
    fr: [
      `Voici la page 1 de "${book.title}", écrite par le célèbre auteur ${book.author}. Dans cette section, le lecteur est invité à analyser les principes.`,
      `Ici, nous examinons comment l'auteur s'appuie sur la prémisse principale présentée dans le résumé.`,
      `Enfin, les arguments concluants de cette page renforcent le message global.`
    ],
    ar: [
      `هذه هي الصفحة 1 من كتاب "${book.title}"، الذي كتبه الكاتب الشهير ${book.author}. في هذا القسم، يُدعى القارئ لتحليل المبادئ الأساسية.`,
      `هنا نقوم بفحص كيف يبني المؤلف على الفرضية الأساسية المقدمة في ملخص الكتاب.`,
      `أخيراً، تعزز الحجج الختامية في هذه الصفحة الرسالة العامة للكتاب.`
    ],
    ur: [
      `یہ کتاب "${book.title}" کا صفحہ نمبر 1 ہے، جس کے مصنف مشہور لکھاری ${book.author} ہیں۔ اس حصے میں، قاری کو بنیادی اصولوں کا تجزیہ کرنے کی دعوت دی گئی ہے۔`,
      `یہاں ہم اس بات کا جائزہ لیتے ہیں کہ کس طرح مصنف کتاب کے خلاصے میں متعارف کرائے گئے بنیادی نظریے کو آگے بڑھاتا ہے۔`,
      `آخر میں، اس صفحے کے اختتامی دلائل مجموعی پیغام کو تقویت دیتے ہیں۔`
    ],
    zh: [
      `这是著名作家 ${book.author} 所著的《${book.title}》的第一页。在本节中，读者将被引导分析核心原则。`,
      `在这里，我们探讨作者如何构建书中所介绍的核心前提。`,
      `最后，本页的总结论点强化了整体信息。`
    ]
  };

  return {
    ...book,
    chapters,
    translations
  };
});
