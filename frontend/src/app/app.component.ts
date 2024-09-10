import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

// components
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, NavbarComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {}
