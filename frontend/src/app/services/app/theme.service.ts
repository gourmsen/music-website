import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ThemeService {
    constructor() {}

    isDarkMode(): boolean {
        return localStorage.getItem("darkMode") === "true";
    }

    toggleDarkMode() {
        if (this.isDarkMode()) {
            document.body.classList.remove("dark");
            localStorage.removeItem("darkMode");
        } else {
            document.body.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        }
    }
}
