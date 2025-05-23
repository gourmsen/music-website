// basic
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ToastComponent } from "../shared/toast/toast.component";

// forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

// services
import { AuthService } from "../services/http/auth.service";
import { UserService } from "../services/http/user.service";
import { ValidatorService } from "../services/app/validator.service";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// interfaces
import { ResetPasswordRequest, ResetPasswordResponse } from "../interfaces/auth";
import { UserUpdateRequest, UserUpdateResponse } from "../interfaces/user";

// enums
import { ToastType } from "../shared/toast/toast.enums";

@Component({
    selector: "app-reset",
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, ToastComponent],
    templateUrl: "./reset.component.html",
    styleUrl: "./reset.component.css",
})
export class ResetComponent {
    emailForm: FormGroup;
    passwordForm: FormGroup;

    token: string | null;

    passwordVisible = false;
    passwordIcon = faEye;

    toastVisible: boolean;
    toastType: ToastType;
    toastMessage: string;
    toastDuration: number;

    resetPasswordResponse: ResetPasswordResponse;
    userUpdateResponse: UserUpdateResponse;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private validatorService: ValidatorService
    ) {}

    ngOnInit() {
        this.token = null;
        this.toastVisible = false;

        this.route.queryParamMap.subscribe((paramMap) => {
            this.token = paramMap.get("token");
        });

        this.emailForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
        });

        this.passwordForm = this.formBuilder.group({
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
        return this.emailForm.get("email");
    }

    get password() {
        return this.passwordForm.get("password");
    }

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
        this.passwordIcon = this.passwordVisible ? faEyeSlash : faEye;
    }

    sendResetEmail(email: string) {
        let request: ResetPasswordRequest = {
            email: email,
        };

        this.showToast(ToastType.Info, "Sending email...", -1);

        this.authService.resetPassword(request).subscribe({
            next: (response) => {
                this.resetPasswordResponse = response.body!;

                this.showToast(ToastType.Success, "Reset email sent", 5000);
            },
            error: (error) => {
                this.showToast(ToastType.Danger, "Unable to send reset email", 5000);
            },
            complete: () => {},
        });
    }

    updatePassword(password: string) {
        let request: UserUpdateRequest = {
            token: this.token!,
            password: password,
        };

        this.showToast(ToastType.Info, "Updating password...", -1);

        this.userService.update(request).subscribe({
            next: (response) => {
                this.userUpdateResponse = response.body!;

                this.showToast(ToastType.Success, "Password updated", 5000);
            },
            error: (error) => {
                if (error.status === 401) {
                    this.showToast(ToastType.Danger, "Invalid or expired token", 5000);
                } else if (error.status === 404) {
                    this.showToast(ToastType.Danger, "User not found", 5000);
                }
            },
            complete: () => {},
        });
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
