/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  // readonly VITE_APP_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
