// basic
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ToastComponent } from "../shared/toast/toast.component";

// forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

// services
import { AuthService } from "../services/http/auth.service";

// interfaces
import { ResetPasswordRequest, ResetPasswordResponse } from "../interfaces/auth";

// enums
import { ToastTypes } from "../shared/toast/toast.enums";

@Component({
    selector: "app-reset",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToastComponent],
    templateUrl: "./reset.component.html",
    styleUrl: "./reset.component.css",
})
export class ResetComponent {
    emailForm: FormGroup;

    token: string | null;

    toastVisible: boolean;
    toastType: ToastTypes;
    toastMessage: string;
    toastDuration: number;

    resetPasswordResponse: ResetPasswordResponse;

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService) {}

    ngOnInit() {
        this.token = null;
        this.toastVisible = false;

        this.route.queryParamMap.subscribe((paramMap) => {
            this.token = paramMap.get("token");
        });

        this.emailForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
        });
    }

    get email() {
        return this.emailForm.get("email");
    }

    resetPassword(email: string) {
        let request: ResetPasswordRequest = {
            email: email,
        };

        this.toastVisible = false;

        this.toastType = ToastTypes.Info;
        this.toastMessage = "Sending email...";
        this.toastDuration = -1;

        setTimeout(() => {
            this.toastVisible = true;
        }, 10);

        this.authService.resetPassword(request).subscribe({
            next: (response) => {
                this.resetPasswordResponse = response.body!;

                this.toastVisible = false;

                this.toastType = ToastTypes.Success;
                this.toastMessage = "Reset email sent";
                this.toastDuration = -1;

                setTimeout(() => {
                    this.toastVisible = true;
                }, 10);
            },
            error: (error) => {
                this.toastVisible = false;

                this.toastType = ToastTypes.Success;
                this.toastMessage = "Reset email sent";
                this.toastDuration = -1;

                setTimeout(() => {
                    this.toastVisible = true;
                }, 10);
            },
            complete: () => {},
        });
    }

    onToastClosed() {
        this.toastVisible = false;
    }
}
