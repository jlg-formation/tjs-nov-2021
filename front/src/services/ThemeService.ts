import { BehaviorSubject } from "rxjs";

export type ThemeValue = "dark" | "light";

class ThemeService {
  theme$ = new BehaviorSubject<ThemeValue>("light");

  toggle() {
    if (this.theme$.value === "light") {
      this.theme$.next("dark");
      return;
    }
    this.theme$.next("light");
  }
}

export const themeService = new ThemeService();
