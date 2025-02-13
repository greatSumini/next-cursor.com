declare global {
  interface Window {
    gtag: (
      option: string,
      gaId: string,
      options: Record<string, unknown>
    ) => void;
  }
}

export {};
