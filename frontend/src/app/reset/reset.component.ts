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
import { ToastTypes } from "../shared/toast/toast.enums";

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
    toastType: ToastTypes;
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

    updatePassword(password: string) {
        let request: UserUpdateRequest = {
            token: this.token!,
            password: password,
        };

        this.toastVisible = false;

        this.toastType = ToastTypes.Info;
        this.toastMessage = "Updating password...";
        this.toastDuration = -1;

        setTimeout(() => {
            this.toastVisible = true;
        }, 10);

        this.userService.update(request).subscribe({
            next: (response) => {
                this.userUpdateResponse = response.body!;

                this.toastVisible = false;

                this.toastType = ToastTypes.Success;
                this.toastMessage = "Password updated";
                this.toastDuration = 5000;

                setTimeout(() => {
                    this.toastVisible = true;
                }, 10);
            },
            error: (error) => {
                this.toastVisible = false;

                this.toastType = ToastTypes.Danger;
                this.toastDuration = 5000;

                if (error.status === 401) {
                    this.toastMessage = "Invalid or expired token";
                } else if (error.status === 404) {
                    this.toastMessage = "User not found";
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
}
