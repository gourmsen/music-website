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
            password: ["", Validators.required],
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

        this.authService.register(request).subscribe({
            next: (response) => {
                this.registerResponse = response.body!;

                this.toastVisible = true;
                this.toastType = ToastTypes.Success;
                this.toastMessage = "Successfully registered.";
                this.toastDuration = 5000;
            },
            error: (error) => {
                if (error.status === 409) {
                    this.toastVisible = true;
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
}
