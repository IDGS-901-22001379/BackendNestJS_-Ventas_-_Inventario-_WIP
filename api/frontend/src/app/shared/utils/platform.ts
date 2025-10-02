// src/app/shared/utils/platform.ts
export const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
