// basic
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastComponent } from "../shared/toast/toast.component";
import { RouterLink } from "@angular/router";

// forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

// services
import { AuthService } from "../services/http/auth.service";
import { ValidatorService } from "../services/app/validator.service";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// interfaces
import { RegisterRequest, RegisterResponse } from "../interfaces/auth";

// enums
import { ToastTypes } from "../shared/toast/toast.enums";

@Component({
    selector: "app-register",
    imports: [CommonModule, RouterLink, ReactiveFormsModule, FontAwesomeModule, ToastComponent],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.css",
})
export class RegisterComponent {
    registerForm: FormGroup;

    passwordVisible = false;
    passwordIcon = faEye;

    toastVisible: boolean;
    toastType: ToastTypes;
    toastMessage: string;
    toastDuration: number;

    registerResponse: RegisterResponse;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private validatorService: ValidatorService
    ) {}

    ngOnInit() {
        this.toastVisible = false;

        this.registerForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: [
                "",
                [
                    Validators.required,
                    Validators.minLength(12),
                    this.validatorService.lowercaseCharacterValidator(),
                    this.validatorService.uppercaseCharacterValidator(),
                    this.validatorService.numberCharacterValidator(),
                    this.validatorService.specialCharacterValidator(),
                ],
            ],
        });
    }

    get email() {
        return this.registerForm.get("email");
    }

    get password() {
        return this.registerForm.get("password");
    }

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
        this.passwordIcon = this.passwordVisible ? faEyeSlash : faEye;
    }

    register(email: string, password: string) {
        let request: RegisterRequest = {
            email: email,
            password: password,
        };

        this.toastVisible = false;

        this.toastType = ToastTypes.Info;
        this.toastMessage = "Setting up your account...";
        this.toastDuration = -1;

        setTimeout(() => {
            this.toastVisible = true;
        }, 10);

        this.authService.register(request).subscribe({
            next: (response) => {
                this.registerResponse = response.body!;

                this.toastVisible = false;

                this.toastType = ToastTypes.Success;
                this.toastMessage = "Verification email sent";
                this.toastDuration = 5000;

                setTimeout(() => {
                    this.toastVisible = true;
                }, 10);
            },
            error: (error) => {
                if (error.status === 409) {
                    this.toastVisible = false;

                    this.toastType = ToastTypes.Danger;
                    this.toastMessage = "User already exists";
                    this.toastDuration = 5000;

                    setTimeout(() => {
                        this.toastVisible = true;
                    }, 10);
                }
            },
            complete: () => {},
        });
    }

    onToastClosed() {
        this.toastVisible = false;
    }
}
