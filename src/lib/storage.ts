/**
 * Safe wrappers around localStorage and sessionStorage.
 * These functions catch SecurityErrors when the browser blocks storage access
 * (e.g., when third-party cookies are blocked or in strict privacy modes).
 */

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignored
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignored
    }
  },
  keys: (): string[] => {
    try {
      return Object.keys(localStorage);
    } catch {
      return [];
    }
  }
};

export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // Ignored
    }
  },
  removeItem: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch {
      // Ignored
    }
  }
};
