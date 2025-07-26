// basic
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastComponent } from "../shared/toast/toast.component";
import { RouterLink } from "@angular/router";

// forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

// services
import { AuthService } from "../services/http/auth.service";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// interfaces
import { LoginRequest, LoginResponse, ResendRequest, ResendResponse } from "../interfaces/auth";

// enums
import { ToastType } from "../shared/toast/toast.enums";

@Component({
    selector: "app-login",
    imports: [CommonModule, RouterLink, ReactiveFormsModule, FontAwesomeModule, ToastComponent],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent {
    loginForm: FormGroup;

    passwordVisible = false;
    passwordIcon = faEye;

    toastVisible: boolean;
    toastType: ToastType;
    toastMessage: string;
    toastDuration: number;
    toastButton: string;

    loginResponse: LoginResponse;
    resendResponse: ResendResponse;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

    ngOnInit() {
        this.toastVisible = false;

        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
        });
    }

    get email() {
        return this.loginForm.get("email");
    }

    get password() {
        return this.loginForm.get("password");
    }

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
        this.passwordIcon = this.passwordVisible ? faEyeSlash : faEye;
    }

    login(email: string, password: string) {
        let request: LoginRequest = {
            email: email,
            password: password,
        };

        this.showToast(ToastType.Info, "Logging in...", -1, "");

        this.authService.login(request).subscribe({
            next: (response) => {
                this.loginResponse = response.body!;

                this.showToast(ToastType.Success, "Successfully logged in", 5000, "");
            },
            error: (error) => {
                if (error.status === 401) {
                    this.showToast(ToastType.Danger, "Invalid credentials", 5000, "");
                } else if (error.status === 403) {
                    this.showToast(ToastType.Warning, "User not verified", -1, "Resend");
                } else {
                    this.showToast(ToastType.Danger, "Unable to log in", 5000, "");
                }
            },
            complete: () => {},
        });
    }

    onToastClosed() {
        this.toastVisible = false;
    }

    showToast(type: ToastType, message: string, duration: number, button: string) {
        this.toastVisible = false;

        this.toastType = type;
        this.toastMessage = message;
        this.toastDuration = duration;
        this.toastButton = button;

        setTimeout(() => {
            this.toastVisible = true;
        }, 10);
    }

    onButtonClicked() {
        let request: ResendRequest = {
            email: this.email!.value,
        };

        this.showToast(ToastType.Info, "Resending verification email...", -1, "");

        this.authService.resend(request).subscribe({
            next: (response) => {
                this.resendResponse = response.body!;

                this.showToast(ToastType.Success, "Verification email sent", 5000, "");
            },
            error: (error) => {
                this.showToast(ToastType.Danger, "Unable to send verification email", 5000, "");
            },
            complete: () => {},
        });
    }
}
