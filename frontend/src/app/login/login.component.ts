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
import { LoginRequest, LoginResponse } from "../interfaces/auth";

// enums
import { ToastTypes } from "../shared/toast/toast.enums";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, FontAwesomeModule, ToastComponent],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent {
    loginForm: FormGroup;

    passwordVisible = false;
    passwordIcon = faEye;

    toastVisible: boolean;
    toastType: ToastTypes;
    toastMessage: string;
    toastDuration: number;

    loginResponse: LoginResponse;

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
        setTimeout(() => {
            this.toastVisible = true;
        }, 10);

        this.toastType = ToastTypes.Info;
        this.toastMessage = "Logging in...";
        this.toastDuration = -1;

        this.authService.login(request).subscribe({
            next: (response) => {
                this.loginResponse = response.body!;

                this.toastVisible = false;
                setTimeout(() => {
                    this.toastVisible = true;
                }, 10);

                this.toastType = ToastTypes.Success;
                this.toastMessage = "Successfully logged in.";
                this.toastDuration = 5000;
            },
            error: (error) => {
                if (error.status === 401) {
                    this.toastVisible = false;
                    setTimeout(() => {
                        this.toastVisible = true;
                    }, 10);

                    this.toastType = ToastTypes.Danger;
                    this.toastMessage = "Invalid credentials.";
                    this.toastDuration = 5000;
                }
            },
            complete: () => {},
        });
    }

    onToastClosed() {
        this.toastVisible = false;
    }
}
