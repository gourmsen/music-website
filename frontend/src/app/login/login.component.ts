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

        this.toastVisible = false;

        this.toastType = ToastType.Info;
        this.toastMessage = "Logging in...";
        this.toastDuration = -1;
        this.toastButton = "";

        setTimeout(() => {
            this.toastVisible = true;
        }, 10);

        this.authService.login(request).subscribe({
            next: (response) => {
                this.loginResponse = response.body!;

                this.toastVisible = false;

                this.toastType = ToastType.Success;
                this.toastMessage = "Successfully logged in";
                this.toastDuration = 5000;
                this.toastButton = "";

                setTimeout(() => {
                    this.toastVisible = true;
                }, 10);
            },
            error: (error) => {
                this.toastVisible = false;

                this.toastType = ToastType.Danger;
                this.toastDuration = 5000;

                if (error.status === 401) {
                    this.toastMessage = "Invalid credentials";
                    this.toastButton = "";
                } else if (error.status === 403) {
                    this.toastMessage = "User not verified";
                    this.toastButton = "Resend";
                }

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

    onButtonClicked() {
        let request: ResendRequest = {
            email: this.email!.value,
        };

        this.toastVisible = false;

        this.toastType = ToastType.Info;
        this.toastMessage = "Resending verification email...";
        this.toastDuration = -1;
        this.toastButton = "";

        setTimeout(() => {
            this.toastVisible = true;
        }, 10);

        this.authService.resend(request).subscribe({
            next: (response) => {
                this.resendResponse = response.body!;

                this.toastVisible = false;

                this.toastType = ToastType.Success;
                this.toastMessage = "Verification email sent";
                this.toastDuration = 5000;
                this.toastButton = "";

                setTimeout(() => {
                    this.toastVisible = true;
                }, 10);
            },
            error: (error) => {},
            complete: () => {},
        });
    }
}
