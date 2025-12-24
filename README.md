# Kārya (कार्य)

**Kārya** is an AI-powered task planner that turns natural language into real actions.

Instead of managing tasks through forms, buttons, and menus, users simply express intent:

> “Add gym tomorrow at 7”  
> “Mark gym as done”  
> “Delete electricity bill task”

Kārya understands the intent and executes it securely.

---

## ✨ What makes Kārya different?

Most AI productivity apps let AI *think for you*.

**Kārya does not.**

- AI decides **what** to do
- Backend decides **how** to do it
- Database enforces **who** is allowed

This strict separation makes Kārya:
- secure
- predictable
- production-grade

---

## 🧠 Core Philosophy

> Humans think in language.  
> Tools should too.

Kārya is built around **intent → action**, not UI friction.

---

## 🚀 Features

- ✍️ Natural language task creation
- 🔄 Update / delete tasks using plain text
- 🔐 Secure authentication (Supabase Auth)
- 🧱 Row Level Security (RLS)
- 🤖 AI decision layer (Gemini / FunctionGemma ready)
- 🔁 Swappable AI providers
- ⚡ Modern Next.js App Router architecture

---

## 🏗️ Architecture Overview

```txt
Client (Text Input)
   ↓
/api/ai
   ↓
AI Provider (Gemini / FunctionGemma)
   ↓
Action Schema (JSON)
   ↓
Executor
   ↓
Service Layer
   ↓
Prisma
   ↓
PostgreSQL (RLS enforced)
```

---
## Key design rules:

```txt
AI never touches the database

AI never sees userId

All writes go through authenticated services

Database is the final authority
```

---
## 🧩 Tech Stack
```txt
- **Frontend**: Next.js (App Router), React, Tailwind
- **Backend**: Next.js API routes
- **Auth**: Supabase Auth (Magic Link)
- **Database**: PostgreSQL (Supabase) + RLS
- **ORM**: Prisma
- **AI**: Gemini (primary), FunctionGemma (optional/local)
- **State / Fetching**: SWR
```

```txt
app/
 ├─ api/
 │   ├─ v1/tasks        # CRUD APIs
 │   └─ ai              # AI gateway
 ├─ (app)/              # Authenticated app UI
 └─ (marketing)/        # Landing page

ai/
 ├─ aiProvider.ts       # AI router (Gemini / FunctionGemma)
 ├─ executor.ts         # Executes validated actions
 ├─ types.ts            # Action schema (AI leash)
 └─ providers/

services/
 └─ taskService.ts      # Shared business logic

lib/
 ├─ prisma.ts
 └─ supabase/
 ```

---


## 🛡️ Security Model

- **Supabase Auth** handles identity
- **User ID** is injected server-side only
- **Prisma** enforces ownership in queries
- **PostgreSQL RLS** prevents cross-user access
- **AI output** is strictly validated before execution
- **Even if AI fails**, data remains safe.

## 🧪 Example AI Actions

```json
{
  "type": "createTask",
  "title": "Play games",
  "due_at": "2025-01-26T11:00:00Z"
}
```

```json
{
  "type": "updateTask",
  "taskId": "abc-123",
  "status": "done"
}
```

## 🛠️ Running Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/karya.git
   cd karya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run Prisma**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start dev server**
   ```bash
   npm run dev
   ```

## 🧭 Roadmap

- [x] Gemini function calling (production)
- [ ] AI confirmation preview before execution
- [ ] Task name → ID matching
- [ ] Undo / action history
- [ ] Voice input
- [ ] Smart daily planning suggestions

## 🧑‍💻 Why this project exists

Kārya was built to explore real-world AI system design:

- **not chatbots**
- **not demos**
- **but AI as a controlled decision layer in a secure system**

This repo focuses on clarity, boundaries, and correctness.

## 📜 License

MIT

## 🙏 Acknowledgements

- Google Gemini / Gemma
- Supabase
- Prisma
- Next.js


## Kārya — Turn intent into action.
---

If you want, next I can:

- tailor this README for **recruiters**
- add **GIF/demo section**
- write a **project explanation for interviews**
- help you write a **launch post / Twitter thread**

Just tell me 👊