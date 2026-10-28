import { ChevronDown, Clock3, Moon, Sun } from 'lucide-react';
import { useThemeMode } from './ThemeProvider';
import type { ThemeMode } from '@/lib/theme';

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export function ThemeModePicker() {
  const { mode, resolvedTheme, setMode } = useThemeMode();
  const Icon = mode === 'auto' ? Clock3 : mode === 'dark' ? Moon : Sun;
  const description =
    mode === 'auto' ? `Auto theme, currently ${resolvedTheme} based on local time` : `${mode} theme`;

  return (
    <div className="relative flex shrink-0 items-center">
      <Icon aria-hidden="true" className="pointer-events-none absolute left-3 h-4 w-4 text-primary" />
      <select
        aria-label={`Color theme: ${description}`}
        title={description}
        value={mode}
        onChange={(event) => setMode(event.currentTarget.value as ThemeMode)}
        className="h-10 min-w-[92px] appearance-none rounded-full border border-border bg-card/80 pl-9 pr-8 text-xs font-medium text-foreground shadow-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
      >
        {THEME_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-muted-foreground" />
    </div>
  );
}
