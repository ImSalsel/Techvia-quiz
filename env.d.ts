/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_URL: string;
    VITE_APP_QUIZ_API_KEY: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}
