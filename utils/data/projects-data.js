export const projectsData = [
    {
        id: 1,
        name: 'Stockd',
        description: 'Stockd is an AI-powered inventory management platform for restaurants that helps operators cut food waste, prevent stockouts, and maximize profit. It combines real-time inventory tracking (powered by a transaction ledger), recipe/BOM-based ingredient usage, and demand forecasting to generate accurate reorder alerts and suggested order quantities. Stockd also includes an AI copilot (Google Gemini) that lets managers ask natural-language questions like “What’s running low?” or “What should I order this week?” and get clear, actionable answers—built to be simple for non-technical users and scalable for modern restaurant operations.',
        tools: ["Supabase (PostgreSQL + Realtime + Auth + RLS)", "PostgreSQL Functions/RPC", "Google Gemini API", "Vanilla JavaScript", "HTML5", "CSS3", "Chart.js", "PapaParse", "Node.js", "Git/GitHub"],
        code: '',
        role: 'Backend Architect',
        demo: 'https://www.stockd.us/',
    },
    {
        id: 2,
        name: 'Speech Mate',
        description: "Built a full-stack app with a React + TypeScript + Vite frontend and a Java 21 / Spring Boot 3 backend, exposing REST APIs for speech generation, multimodal analysis, and text-to-speech. Implemented Gemini-powered endpoints via Spring WebFlux to ingest video, slides, and notes and return structured JSON with scores, filler word counts, and detailed feedback. Integrated Google OAuth 2.0 with Spring Security to secure user accounts and protect analysis and generation endpoints. Designed the React UI to surface analysis reports, recommendations, and playback audio for a smooth practice workflow.",
        tools: ["React", "TypeScript", "Vite", "Java 21", "Spring Boot 3", "Spring WebFlux (WebClient)", "Gemini APIs", "Google OAuth 2.0", "Spring Security"],
        role: '',
        code: 'https://github.com/TheGSUCoders/SpeechMate',
        demo: 'https://www.thespeechmate.tech/',
    },
    {
        id: 3,
        name: 'Department Assistant',
        description: "Built a scalable GPT framework with Python, Flask, LangChain, and Azure to deliver department-specific virtual assistants from uploaded resources (FAQs, policies, contacts). Enabled dynamic scenario updates and manual additions for adaptability, and shipped a simple upload interface that cut manual support tasks by ~300% through automated, intelligent responses.",
        tools: ['Python', 'Flask', 'LangChain', 'Azure'],
        role: '',
        code: '',
        demo: 'https://devpost.com/software/department-assistant', 
    },
];

// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
// },