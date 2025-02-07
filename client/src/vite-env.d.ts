/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRIVY_APP_ID: string
  readonly VITE_COINBASE_API_KEY: string
  readonly VITE_CHATBOT_API_URL: string
  readonly VITE_CHATBOT_USERNAME: string
  readonly VITE_CHATBOT_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 