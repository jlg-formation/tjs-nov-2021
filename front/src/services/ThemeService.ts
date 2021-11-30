import { BehaviorSubject } from "rxjs";

export type ThemeValue = "dark" | "light";

class ThemeService {
  theme$ = new BehaviorSubject<ThemeValue>("light");

  constructor() {
    this.theme$.subscribe((theme) => {
      ["dark", "light"].forEach((theme) => {
        document.body.classList.remove(theme);
      });
      document.body.classList.add(theme);
    });
  }

  toggle() {
    if (this.theme$.value === "light") {
      this.theme$.next("dark");
      return;
    }
    this.theme$.next("light");
  }
}

export const themeService = new ThemeService();
