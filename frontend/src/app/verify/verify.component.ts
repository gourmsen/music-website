// basic
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastComponent } from "../shared/toast/toast.component";

// services
import { AuthService } from "../services/http/auth.service";

// interfaces
import { VerifyRequest, VerifyResponse } from "../interfaces/auth";

// enums
import { ToastTypes } from "../shared/toast/toast.enums";

@Component({
    selector: "app-verify",
    standalone: true,
    imports: [ToastComponent],
    templateUrl: "./verify.component.html",
    styleUrl: "./verify.component.css",
})
export class VerifyComponent {
    token: string | null;

    toastVisible: boolean;
    toastType: ToastTypes;
    toastMessage: string;
    toastDuration: number;

    constructor(private route: ActivatedRoute, private authService: AuthService) {}

    ngOnInit() {
        this.token = null;
        this.toastVisible = false;

        this.route.queryParamMap.subscribe((paramMap) => {
            this.token = paramMap.get("token");
        });

        if (this.token) {
            let request: VerifyRequest = {
                token: this.token,
            };

            this.toastVisible = false;

            this.toastType = ToastTypes.Info;
            this.toastMessage = "Verifying email...";
            this.toastDuration = -1;

            setTimeout(() => {
                this.toastVisible = true;
            }, 10);

            this.authService.verify(request).subscribe({
                next: (response) => {
                    this.toastVisible = false;

                    this.toastType = ToastTypes.Success;
                    this.toastMessage = "Email verified";
                    this.toastDuration = -1;

                    setTimeout(() => {
                        this.toastVisible = true;
                    }, 10);
                },
                error: (error) => {
                    this.toastVisible = false;

                    this.toastType = ToastTypes.Danger;
                    this.toastDuration = -1;

                    if (error.status === 401) {
                        this.toastMessage = "Invalid or expired token.";
                    } else if (error.status === 404) {
                        this.toastMessage = "User not found.";
                    }

                    setTimeout(() => {
                        this.toastVisible = true;
                    }, 10);
                },
                complete: () => {},
            });
        }
    }

    onToastClosed() {
        this.toastVisible = false;
    }
}
