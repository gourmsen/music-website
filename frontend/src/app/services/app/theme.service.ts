import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ThemeService {
    constructor() {}

    isDarkMode(): boolean {
        return localStorage.getItem("darkMode") === "true";
    }

    initTheme() {
        if (this.isDarkMode()) {
            document.body.classList.add("dark");
        }
    }

    toggleDarkMode() {
        document.body.classList.add("transition");
        document.body.classList.add("duration-300");
        document.body.classList.add("ease-in-out");

        if (this.isDarkMode()) {
            document.body.classList.remove("dark");
            localStorage.removeItem("darkMode");
        } else {
            document.body.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        }
    }
}
