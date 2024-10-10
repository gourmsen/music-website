// basic
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastComponent } from "../shared/toast/toast.component";
import { RouterLink } from "@angular/router";

// forms
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
} from "@angular/forms";

// services
import { AuthService } from "../services/http/auth.service";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// interfaces
import { RegisterRequest, RegisterResponse } from "../interfaces/auth";

// enums
import { ToastTypes } from "../shared/toast/toast.enums";

@Component({
    selector: "app-register",
    standalone: true,
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

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

    ngOnInit() {
        this.toastVisible = false;

        this.registerForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: [
                "",
                [
                    Validators.required,
                    Validators.minLength(12),
                    this.lowercaseCharacterValidator(),
                    this.uppercaseCharacterValidator(),
                    this.numberCharacterValidator(),
                    this.specialCharacterValidator(),
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
        setTimeout(() => {
            this.toastVisible = true;
        }, 10);

        this.toastType = ToastTypes.Info;
        this.toastMessage = "Setting up your account...";
        this.toastDuration = -1;

        this.authService.register(request).subscribe({
            next: (response) => {
                this.registerResponse = response.body!;

                this.toastVisible = false;
                setTimeout(() => {
                    this.toastVisible = true;
                }, 10);

                this.toastType = ToastTypes.Success;
                this.toastMessage = "Verification email sent.";
                this.toastDuration = 5000;
            },
            error: (error) => {
                if (error.status === 409) {
                    this.toastVisible = false;
                    setTimeout(() => {
                        this.toastVisible = true;
                    }, 10);

                    this.toastType = ToastTypes.Danger;
                    this.toastMessage = "User already exists.";
                    this.toastDuration = 5000;
                }
            },
            complete: () => {},
        });
    }

    onToastClosed() {
        this.toastVisible = false;
    }

    lowercaseCharacterValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let pattern = /[a-z]/;
            let hasCharacter = pattern.test(control.value);

            return hasCharacter ? null : { lowercaseCharacter: { value: control.value } };
        };
    }

    uppercaseCharacterValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let pattern = /[A-Z]/;
            let hasCharacter = pattern.test(control.value);

            return hasCharacter ? null : { uppercaseCharacter: { value: control.value } };
        };
    }

    numberCharacterValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let pattern = /\d/;
            let hasCharacter = pattern.test(control.value);

            return hasCharacter ? null : { numberCharacter: { value: control.value } };
        };
    }

    specialCharacterValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let pattern = /[!@#$%^&*(),.?":{}|<>]/;
            let hasCharacter = pattern.test(control.value);

            return hasCharacter ? null : { specialCharacter: { value: control.value } };
        };
    }
}
