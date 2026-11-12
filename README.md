# NutriMind AI

**NutriMind AI** is an intelligent, conversational health and nutrition assistant powered by Google Gemini and Next.js. It delivers real-time, evidence-based dietary recommendations, personalized meal plans, nutritional breakdowns, and healthy habit guidance through a modern, responsive user interface.

---

## ✨ Features

- **AI-Powered Nutrition Guidance:** Receive personalized recommendations for recipes, dietary adjustments, calorie/macro breakdowns, and wellness tips.
- **Real-Time Streaming Responses:** Powered by the Vercel AI SDK and Google Gemini for low-latency token streaming.
- **Interactive Health Prompts:** Quick starter prompts for high-protein meal planning, gut health, fasting protocols, and quick recipes.
- **Generation Controls:** Ability to stop generation in real time or start a fresh session at any moment.
- **Resilient Error Recovery:** Built-in network and API error reporting with one-click retry.
- **Rich Markdown Formatting:** Formatted recipes, bullet points, headers, tables, and highlighted nutrition advice.
- **Modern Dark UI:** Polished glassmorphism interface built with Tailwind CSS v4 and Framer Motion.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/) (`@ai-sdk/google`, `@ai-sdk/react`, `ai`)
- **LLM Provider:** [Google Gemini](https://ai.google.dev/) (`gemini-1.5-flash`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Markdown:** [react-markdown](https://github.com/remarkjs/react-markdown)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- Google AI Studio API key ([Get one here](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mrvikas06/NutriMind-Ai.git
   cd NutriMind-Ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local` and add your Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Runs the production server.
- `npm run lint`: Runs ESLint to inspect code quality and conventions.

---

## 📁 Project Structure

```text
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/       # Streaming chat endpoint (Gemini integration)
│   │   ├── favicon.ico     # Application icon
│   │   ├── globals.css     # Global styles & custom scrollbars
│   │   ├── layout.tsx      # Root layout & SEO metadata
│   │   └── page.tsx        # Main NutriMind AI chat interface
├── .env.example            # Environment variables template
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## ⚠️ Disclaimer

NutriMind AI is an educational health assistant and does not provide clinical diagnosis or medical prescriptions. Users should always consult qualified healthcare practitioners for medical concerns or specialized medical diets.
