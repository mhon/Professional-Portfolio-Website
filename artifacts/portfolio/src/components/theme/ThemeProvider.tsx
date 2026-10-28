import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  isThemeMode,
  millisecondsUntilThemeBoundary,
  resolveTheme,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemeMode,
} from '@/lib/theme';

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readSavedMode(): ThemeMode {
  try {
    const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(savedMode) ? savedMode : 'auto';
  } catch {
    return 'auto';
  }
}

function applyTheme(mode: ThemeMode, resolvedTheme: ResolvedTheme) {
  const root = document.documentElement;
  root.dataset.theme = resolvedTheme;
  root.dataset.themeMode = mode;
  root.classList.toggle('dark', resolvedTheme === 'dark');

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  themeColor?.setAttribute('content', resolvedTheme === 'dark' ? '#07090d' : '#f8fafc');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readSavedMode);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(mode));

  const setMode = useCallback((nextMode: ThemeMode) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextMode);
    } catch {
      // The theme still applies for this page session if storage is unavailable.
    }
    setModeState(nextMode);
  }, []);

  useEffect(() => {
    let boundaryTimer: number | undefined;

    const syncTheme = () => {
      const nextResolvedTheme = resolveTheme(mode);
      applyTheme(mode, nextResolvedTheme);
      setResolvedTheme(nextResolvedTheme);
    };

    const scheduleNextBoundary = () => {
      boundaryTimer = window.setTimeout(() => {
        syncTheme();
        if (mode === 'auto') scheduleNextBoundary();
      }, millisecondsUntilThemeBoundary() + 20);
    };

    const refreshThemeAndTimer = () => {
      if (boundaryTimer !== undefined) window.clearTimeout(boundaryTimer);
      syncTheme();
      if (mode === 'auto') scheduleNextBoundary();
    };

    const syncFromStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
      setModeState(isThemeMode(event.newValue) ? event.newValue : 'auto');
    };

    refreshThemeAndTimer();
    window.addEventListener('focus', refreshThemeAndTimer);
    document.addEventListener('visibilitychange', refreshThemeAndTimer);
    window.addEventListener('storage', syncFromStorage);

    return () => {
      if (boundaryTimer !== undefined) window.clearTimeout(boundaryTimer);
      window.removeEventListener('focus', refreshThemeAndTimer);
      document.removeEventListener('visibilitychange', refreshThemeAndTimer);
      window.removeEventListener('storage', syncFromStorage);
    };
  }, [mode]);

  const value = useMemo(() => ({ mode, resolvedTheme, setMode }), [mode, resolvedTheme, setMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeMode must be used inside ThemeProvider.');
  return context;
}
