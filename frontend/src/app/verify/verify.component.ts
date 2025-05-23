// basic
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastComponent } from "../shared/toast/toast.component";

// services
import { AuthService } from "../services/http/auth.service";

// interfaces
import { VerifyRequest, VerifyResponse } from "../interfaces/auth";

// enums
import { ToastType } from "../shared/toast/toast.enums";

@Component({
    selector: "app-verify",
    imports: [ToastComponent],
    templateUrl: "./verify.component.html",
    styleUrl: "./verify.component.css",
})
export class VerifyComponent {
    token: string | null;

    toastVisible: boolean;
    toastType: ToastType;
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

            this.showToast(ToastType.Info, "Verifying email...", -1);

            this.authService.verify(request).subscribe({
                next: (response) => {
                    this.showToast(ToastType.Success, "Email verified", 5000);
                },
                error: (error) => {
                    if (error.status === 401) {
                        this.showToast(ToastType.Danger, "Invalid or expired token", 5000);
                    } else if (error.status === 404) {
                        this.showToast(ToastType.Danger, "User not found", 5000);
                    } else {
                        this.showToast(ToastType.Danger, "Unable to verify email", 5000);
                    }
                },
                complete: () => {},
            });
        }
    }

    onToastClosed() {
        this.toastVisible = false;
    }

    showToast(type: ToastType, message: string, duration: number) {
        this.toastVisible = false;

        this.toastType = type;
        this.toastMessage = message;
        this.toastDuration = duration;

        setTimeout(() => {
            this.toastVisible = true;
        }, 10);
    }
}
