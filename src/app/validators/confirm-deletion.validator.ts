import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

export function confirmDeletionValidator(translate: TranslateService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const confirm = control.get('confirm')?.value;

        if (!confirm) {
            return null;
        }

        return confirm === translate.instant('profile.confirm-deletion') ? null : { confirmMismatch: true};
    };
};
