// basic
import { Component } from "@angular/core";

// router
import { RouterLink, RouterLinkActive } from "@angular/router";

// services
import { ThemeService } from "../services/app/theme.service";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
    pageLinks = [
        { name: "Home", path: "/" },
        { name: "Tabs", path: "/tabs" },
        { name: "Music", path: "/music" },
        { name: "FAQ", path: "/faq" },
    ];

    constructor(private themeService: ThemeService) {}

    toggleDarkMode() {
        this.themeService.toggleDarkMode();
    }
}
