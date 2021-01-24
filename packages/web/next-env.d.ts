// cannot put into `/typings` direcotry otherwise nextjs will generate a new file

/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.css';

type Theme = 'light' | 'dark';

declare interface Window {
  // defeind in ./public/preload.js
  __setTheme: (theme: Theme) => void;
}
