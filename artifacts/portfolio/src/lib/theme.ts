export type ThemeMode = 'auto' | 'light' | 'dark';
export type ResolvedTheme = Exclude<ThemeMode, 'auto'>;

export const THEME_STORAGE_KEY = 'portfolio-theme-mode';

export function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'auto' || value === 'light' || value === 'dark';
}

export function resolveTheme(mode: ThemeMode, date = new Date()): ResolvedTheme {
  if (mode !== 'auto') return mode;

  const hour = date.getHours();
  return hour >= 18 || hour < 5 ? 'dark' : 'light';
}

export function millisecondsUntilThemeBoundary(date = new Date()): number {
  const nextBoundary = new Date(date);
  const hour = date.getHours();

  if (hour < 5) {
    nextBoundary.setHours(5, 0, 0, 0);
  } else if (hour < 18) {
    nextBoundary.setHours(18, 0, 0, 0);
  } else {
    nextBoundary.setDate(nextBoundary.getDate() + 1);
    nextBoundary.setHours(5, 0, 0, 0);
  }

  return Math.max(1, nextBoundary.getTime() - date.getTime());
}
