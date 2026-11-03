import { Injectable } from '@angular/core';
export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
    private readonly storageKey = 'tak-theme';
    mode: ThemeMode = (localStorage.getItem(this.storageKey) as ThemeMode) === 'dark' ? 'dark' : 'light';

    constructor() {
        this.applyTheme();
    }
    setTheme(mode: string): void {
        this.mode = mode as ThemeMode;
        localStorage.setItem(this.storageKey, mode);
        this.applyTheme();
    }

    private applyTheme(): void {
        const isDark = this.mode === 'dark';

        document.documentElement.classList.toggle('ion-palette-dark', isDark);
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light;'
    }
}
