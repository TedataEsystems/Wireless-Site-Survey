import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value;

        if (!value) {
            return null; // Handle empty input separately, if needed
        }

        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasDigit = /\d/.test(value);
        //const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const hasMinLength = value.length >= 7;

        const isValid =
            hasUpperCase && hasLowerCase && hasDigit  && hasMinLength;

        return isValid ? null : { passwordRequirements: true };
    };
}