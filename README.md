# Proposales Copilot

An AI-powered sales assistant for [Proposales](https://www.proposales.com/) that helps hospitality teams understand their proposal pipeline using natural language.

The application combines the Proposales API with Google Gemini through the Vercel AI SDK. Users can see their proposal pipeline in a dashboard and ask the Copilot questions about proposal status, customers, values, bookings, expiry dates, and follow-ups.

## Features

- Proposal dashboard with:
  - Active / accepted / rejected / total proposal counts
  - Proposal status
  - Version
  - Booking number and booking status
  - Creation date
  - Direct link to the Proposales proposal
- AI Copilot powered by Gemini
- Streaming AI responses
- Tool-based AI access to Proposales data
- Natural-language questions about the proposal pipeline
- Proposal-specific detail lookup
- Quick-start questions in the chat
- Server-side handling of Proposales and Gemini credentials

## Example questions

The Copilot can currently answer questions such as:

- "Which proposals are active?"
- "Which proposals have been accepted?"
- "How many proposals do I have?"
- "Which proposals need my attention?"
- "Tell me about the Stockholm Summit proposal."
- "Who is the customer for this proposal?"
- "What is the value of the proposal?"
- "When does it expire?"
- "What is the booking status?"

The Copilot is intentionally limited to information exposed through its tools. It does not invent information that is not available from the Proposales API.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel AI SDK
- Google Gemini
- Zod
- Proposales API

## Getting started

### Prerequisites

- Node.js
- npm
- A Proposales API key
- A Google Gemini API key

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create `.env.local`:

```env
PROPOSALES_API_KEY=your_proposales_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_api_key
PROPOSALES_API_URL=https://api.proposales.com
```

The API keys are server-side only. They must not be exposed through `NEXT_PUBLIC_*` environment variables or committed to source control.

### Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```
