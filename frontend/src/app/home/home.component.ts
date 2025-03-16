// basic
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

// texts
import * as about from "../../assets/texts/about.json";

@Component({
    selector: "app-home",
    imports: [FontAwesomeModule],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
})
export class HomeComponent implements AfterViewInit {
    @ViewChild("aboutTitle", { static: true }) aboutTitle!: ElementRef;
    @ViewChild("aboutText", { static: true }) aboutText!: ElementRef;
    @ViewChild("aboutImage", { static: true }) aboutImage!: ElementRef;

    arrowDown = faArrowDown;

    tAboutTitle = about.title;
    tAboutText = about.text;

    ngAfterViewInit() {
        // add interaction observer
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    switch (entry.target) {
                        case this.aboutTitle.nativeElement:
                            entry.target.classList.add("animate-slide-up");
                            break;
                        case this.aboutText.nativeElement:
                            entry.target.classList.add("animate-slide-up-d-0.5s");
                            break;
                        case this.aboutImage.nativeElement:
                            entry.target.classList.add("animate-slide-up-d-1s");
                            break;
                    }
                }
            });
        });

        observer.observe(this.aboutTitle.nativeElement);
        observer.observe(this.aboutText.nativeElement);
        observer.observe(this.aboutImage.nativeElement);
    }
}
