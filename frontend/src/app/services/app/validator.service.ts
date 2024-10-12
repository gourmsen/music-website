// basic
import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class ValidatorService {
    constructor() {}

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
