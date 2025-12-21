export const projectsData = [
    {
        id: 1,
        name: 'Speech Mate – AI-Powered Public Speaking Coach',
        description: "Built a full-stack app with a React + TypeScript + Vite frontend and a Java 21 / Spring Boot 3 backend, exposing REST APIs for speech generation, multimodal analysis, and text-to-speech. Implemented Gemini-powered endpoints via Spring WebFlux to ingest video, slides, and notes and return structured JSON with scores, filler word counts, and detailed feedback. Integrated Google OAuth 2.0 with Spring Security to secure user accounts and protect analysis and generation endpoints. Designed the React UI to surface analysis reports, recommendations, and playback audio for a smooth practice workflow.",
        tools: ["React", "TypeScript", "Vite", "Java 21", "Spring Boot 3", "Spring WebFlux (WebClient)", "Gemini APIs", "Google OAuth 2.0", "Spring Security"],
        role: '',
        code: 'https://github.com/TheGSUCoders/SpeechMate',
        demo: 'https://www.thespeechmate.tech/',
    },
    {
        id: 2,
        name: 'AI-Powered Department Assistant',
        description: "Built a scalable GPT framework with Python, Flask, LangChain, and Azure to deliver department-specific virtual assistants from uploaded resources (FAQs, policies, contacts). Enabled dynamic scenario updates and manual additions for adaptability, and shipped a simple upload interface that cut manual support tasks by ~300% through automated, intelligent responses.",
        tools: ['Python', 'Flask', 'LangChain', 'Azure'],
        role: '',
        code: '',
        demo: 'https://devpost.com/software/department-assistant', // add project link if you have one
    },
    // {
    //     id: 3,
    //     name: 'AI Powered Real Estate',
    //     description: 'My team built an AI-based real estate app using Replicate API and OpenAI. We used Express, Typescript, OpenAI, Replicate, Stripe, and Mongoose to develop the API. We utilized NextJS, Formik, TailwindCSS, and other npm libraries for the UI. We have trained multiple AI assistants using the latest GPT model and integrated Replicate API for image processing. We added role-based auth, subscription plans, Cron job scheduling, and payment integration with Stripe.',
    //     tools: ['React', 'Bootstrap', 'SCSS', 'Stripe', 'Express', 'TypeScript', 'MongoDB', 'Azure Blob', 'OpenAI API', 'Replicate AI', 'Cronjob', 'JWT'],
    //     code: '',
    //     role: 'Full Stack Developer',
    //     demo: '',
    // },
    // {
    //     id: 4,
    //     name: 'Newsroom Management',
    //     description: "My team and I developed a newspaper management dashboard application called Newsroom Management. As a front-end developer, I worked on creating the dashboard using NextJS, Material UI, Redux, Calendar, and other necessary npm libraries. We used React Redux to manage the application's state and React-hook-form and Sun Editor to handle forms.",
    //     tools: ['NextJS', 'Material UI', 'Redux', 'Sun Editor', "Calendar"],
    //     code: '',
    //     demo: '',
    //     role: 'Full Stack Developer',
    // }
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
//     demo: '',
// },