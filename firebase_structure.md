# Database Architecture - ReadAI App

This document details the database schemas and structure recommended for ReadAI using either **Firebase Firestore** (NoSQL Document Store) or **Supabase / PostgreSQL** (Relational Database).

---

## 1. Firebase Firestore Structure

### `users` Collection
Stores user profile information, authentication metadata, and subscription statuses.

```typescript
// Path: /users/{userId}
interface UserDocument {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: firestore.Timestamp;
  isPremium: boolean;
  premiumExpiryDate?: firestore.Timestamp;
  weeklyGoalHours: number; // default: 5
}
```

### `books` Collection
Stores the list of books. Preloaded books are public, while user-uploaded books are scoped to individual users.

```typescript
// Path: /books/{bookId}
interface BookDocument {
  id: string;
  title: string;
  author: string;
  category: "Fiction" | "Education" | "Self Help" | "History" | "Science";
  summary: string;
  coverColor: string; // e.g., "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)"
  coverEmoji: string; // e.g., "🥂"
  isPublic: boolean; // true for standard default books, false for user uploads
  uploadedBy?: string; // userId of uploader (null for public books)
  createdAt: firestore.Timestamp;
  
  // Chapter content
  chapters: Array<{
    title: string;
    paragraphs: string[];
  }>;
  
  // Custom pre-translated texts to save translation tokens
  translations?: {
    es?: string[]; // array of translated paragraphs
    fr?: string[];
    ar?: string[];
    ur?: string[];
    zh?: string[];
  };
}
```

### `user_progress` Collection
Tracks the reading progress of users on different books.

```typescript
// Path: /users/{userId}/progress/{bookId}
interface UserProgressDocument {
  bookId: string;
  lastReadChapter: number;
  lastReadParagraph: number;
  progressPercent: number; // 0 to 100
  updatedAt: firestore.Timestamp;
}
```

### `bookmarks` Collection
Saves the specific quotes, paragraphs, and personal notes added by readers.

```typescript
// Path: /users/{userId}/bookmarks/{bookmarkId}
interface BookmarkDocument {
  id: string;
  bookId: string;
  bookTitle: string;
  chapterTitle: string;
  text: string; // excerpt text
  note?: string; // custom personal comment
  createdAt: firestore.Timestamp;
}
```

### `reading_statistics` Collection
Aggregates activity logs for generating visual dashboard charts.

```typescript
// Path: /users/{userId}/statistics/{logId}
interface StatisticsDocument {
  userId: string;
  date: string; // e.g., "2026-08-01"
  readingSeconds: number;
  listeningSeconds: number;
}
```

---

## 2. Supabase / PostgreSQL Database Schema

To implement this with Supabase, execute the following SQL scripts in the Supabase SQL Editor. It creates tables, handles auth linkages, and sets up RLS (Row Level Security) policies.

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS PROFILE TABLE
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,
  is_premium boolean default false,
  weekly_goal_hours integer default 5,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Profiles
alter table public.profiles enable row level security;

create policy "Users can view their own profiles."
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profiles."
  on public.profiles for update
  using ( auth.uid() = id );

-- 2. BOOKS TABLE
create table public.books (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  author text not null,
  category text check (category in ('Fiction', 'Education', 'Self Help', 'History', 'Science')) not null,
  summary text,
  cover_color text,
  cover_emoji text,
  is_public boolean default false,
  uploaded_by uuid references auth.users(id) on delete set null,
  chapters jsonb not null, -- Stores Array of {title: string, paragraphs: string[]}
  translations jsonb,     -- Stores Object of {langCode: string[]}
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Books
alter table public.books enable row level security;

create policy "Anyone can read public books"
  on public.books for select
  using (is_public = true);

create policy "Users can read their own uploaded books"
  on public.books for select
  using (auth.uid() = uploaded_by);

create policy "Users can insert their own uploaded books"
  on public.books for insert
  with check (auth.uid() = uploaded_by);

-- 3. USER READING PROGRESS TABLE
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  book_id uuid references public.books(id) on delete cascade not null,
  last_read_chapter integer default 0,
  last_read_paragraph integer default 0,
  progress_percent integer default 0 check (progress_percent >= 0 and progress_percent <= 100),
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, book_id)
);

alter table public.user_progress enable row level security;

create policy "Users can manage their own progress records"
  on public.user_progress for all
  using (auth.uid() = user_id);

-- 4. BOOKMARKS TABLE
create table public.bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  book_id uuid references public.books(id) on delete cascade not null,
  book_title text not null,
  chapter_title text not null,
  text text not null,
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.bookmarks enable row level security;

create policy "Users can manage their own bookmarks"
  on public.bookmarks for all
  using (auth.uid() = user_id);

-- 5. READING STATISTICS TABLE
create table public.reading_statistics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  log_date date default current_date not null,
  reading_seconds integer default 0,
  listening_seconds integer default 0,
  unique (user_id, log_date)
);

alter table public.reading_statistics enable row level security;

create policy "Users can manage their own statistics log"
  on public.reading_statistics for all
  using (auth.uid() = user_id);

-- 6. PROFILE TRIGGER ON SIGNUP
-- Automatically creates a profile record when a new user registers in Supabase auth
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
