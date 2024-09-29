// basic
import { Component } from "@angular/core";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
})
export class HomeComponent {
    arrowDown = faArrowDown;
}
