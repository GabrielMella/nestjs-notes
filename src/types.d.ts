// Type declarations for project-specific globals.
// This file is a TypeScript declaration file (.d.ts) — it should be
// excluded from security analysis since it contains no runtime code.
//
// Scope: this file only augments the ambient NodeJS namespace shipped by
// types/node. That augmentation genuinely needs to live in the global
// scope, since ProcessEnv is consumed via process.env and ConfigService
// across every module (auth, todo, user, etc.), so it is intentionally
// kept here instead of being split into a feature module. Do not add
// application-specific types to this file: those belong next to the DTOs
// and entities of the module that owns them, so they stay colocated with
// the code that uses them and do not pollute the global namespace.
//
// Note: because this file contains a top-level export statement, it is
// treated by TypeScript as a module rather than a script. To make sure
// the namespace below still augments the real global NodeJS namespace
// (instead of only existing inside this module's scope), it is wrapped
// in a "declare global" block.
declare global {
  namespace NodeJS {
    // Augments the environment variable typings used across the app.
    interface ProcessEnv {
      // Connection string used by the database/ORM module.
      DATABASE_URL: string;
      // Secret used to sign and verify JWTs (see src/auth).
      JWT_SECRET: string;
      // Standard Node runtime environment flag.
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
