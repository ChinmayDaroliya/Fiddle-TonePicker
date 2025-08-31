# Tone Picker Text Tool

AI-powered text editor that transforms your writing style using a simple 3×3 tone matrix.

## Quick Start

### Prerequisites
- Node.js 18+ 
- Mistral AI API key (free at [console.mistral.ai](https://console.mistral.ai))

### Installation
```bash
# 1. Create project
npx create-next-app@latest tone-picker --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd tone-picker

# 2. Install dependencies
npm install zod sonner lucide-react

# 3. Set up environment
echo "MISTRAL_API_KEY=your_api_key_here" > .env.local

# 4. Start development server
npm run dev
```

**Important**: Replace the default files with the provided code files.

## Project Structure
```
tone-picker/
├── app/
│   ├── page.tsx              # Main UI
│   ├── layout.tsx            # App layout
│   ├── globals.css           # Styles
│   └── api/tone/route.ts     # Backend API
├── components/               # UI components
├── hooks/                    # Custom React hooks
└── lib/                      # Utilities & types
```

## How It Works

1. **Text Editor**: Type/paste text in the left panel
2. **Tone Matrix**: Click cells to transform text tone
   - **Horizontal**: Formal → Neutral → Casual
   - **Vertical**: Concise → Neutral → Elaborate
3. **History**: Undo/Redo with Ctrl+Z/Ctrl+Y
4. **Auto-save**: Text and history persist in browser

## Tech Stack

**Frontend**: Next.js 14, React, TypeScript, Tailwind CSS  
**Backend**: Next.js API Routes, Mistral AI Small  
**Features**: Zod validation, Sonner notifications, Lucide icons  
**Storage**: localStorage + in-memory caching

## API Integration

The app securely calls Mistral AI through a backend API route to:
- Keep API keys secure (server-side only)
- Cache responses for better performance
- Handle errors gracefully

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Add MISTRAL_API_KEY in Vercel dashboard
```

### Environment Variables
```
MISTRAL_API_KEY=your_mistral_api_key
```

## Key Features

✅ **3×3 Tone Matrix** - 9 different tone combinations  
✅ **Undo/Redo System** - Full history with keyboard shortcuts  
✅ **Smart Caching** - Reduces API calls, improves speed  
✅ **Error Handling** - User-friendly error messages  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Auto-persistence** - Saves work automatically  

## Architecture Decisions

**Why Next.js**: Combines frontend + backend in one project, easy deployment  
**Why TypeScript**: Prevents runtime errors, better development experience  
**Why Tailwind**: Fast styling with consistent design system  
**Why Custom Hooks**: Clean separation of logic, reusable components  

## Error Handling

- Input validation with Zod schemas
- API error handling with proper HTTP codes
- UI feedback with toast notifications
- Graceful degradation for network issues

---
