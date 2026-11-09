import { ActivatedRouteSnapshot, ResolveFn, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { formatNumber } from "@angular/common";

export const emailResetResolver: ResolveFn<boolean | UrlTree> = async (
    route: ActivatedRouteSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = route.queryParamMap.get('token')!;
    const userId = route.queryParamMap.get('userId')!;
    const path = route.routeConfig?.path ?? '';
    const type = path.split('reset-')[1];

    if (!token || (type === 'password' && !userId)) {
        return router.createUrlTree(['/error'], {
            queryParams: { reason: 'missing-token' }
        });
    }

    try {
        if(type === 'email'){
            await authService.validateEmailToken(token);
            return true;
        } else if (type === 'password'){
            await authService.validatePasswordToken(token, Number(userId));
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        const response = error.toString();
        let errorCode = '';

        if (response.includes('Unauthorized')){
            errorCode = 'unauthorized'
        } else if (response.includes('Token expired')){
            errorCode = 'token-expired'
        } else if (response.includes('Invalid token')) {
            errorCode = 'invalid-token'
        } else if (response.includes('No active reset token')){
            errorCode = 'token-used'
        } else {
            errorCode = 'went-wrong'
        }

        return router.navigate(['/error'], {
            queryParams: {
                reason: `${errorCode}`
            }
        })
    }
}