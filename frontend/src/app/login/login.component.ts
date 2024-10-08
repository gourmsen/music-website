// basic
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

// forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

// services
import { AuthService } from "../services/http/auth.service";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// interfaces
import { LoginRequest, LoginResponse } from "../interfaces/auth";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent {
    loginForm: FormGroup;

    passwordVisible = false;
    passwordIcon = faEye;

    loginResponse: LoginResponse;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

    ngOnInit() {
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

        this.authService.login(request).subscribe({
            next: (response) => {
                this.loginResponse = response.body!;
            },
            error: (error) => {
                if (error.status === 401) {
                }
            },
            complete: () => {},
        });
    }
}
