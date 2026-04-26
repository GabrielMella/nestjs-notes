// Type declarations for project-specific globals.
// This file is a TypeScript declaration file (.d.ts) — it should be
// excluded from security analysis since it contains no runtime code.

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

export {};
