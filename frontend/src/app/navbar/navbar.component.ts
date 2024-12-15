// basic
import { Component } from "@angular/core";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// router
import { RouterLink, RouterLinkActive } from "@angular/router";

// services
import { ThemeService } from "../services/app/theme.service";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [RouterLink, FontAwesomeModule],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
    pageLinks = [
        { name: "Home", path: "/" },
        { name: "Songs", path: "/songs" },
        { name: "Music", path: "/music" },
        { name: "FAQ", path: "/faq" },
    ];

    themeIcon: any = null;

    constructor(private themeService: ThemeService) {}

    ngOnInit() {
        this.themeIcon = this.themeService.isDarkMode() ? faSun : faMoon;
    }

    toggleDarkMode() {
        this.themeService.toggleDarkMode();
        this.themeIcon = this.themeService.isDarkMode() ? faSun : faMoon;
    }
}
