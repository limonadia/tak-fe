import { ActivatedRouteSnapshot, ResolveFn, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const emailResetResolver: ResolveFn<boolean | UrlTree> = async (
    route: ActivatedRouteSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = route.queryParamMap.get('token')!;

    if(!token){
        return router.navigate(['/error'], {
            queryParams: {
                reason: 'missing-token'
            }
        });
    }

    try {
        await authService.validateToken(token, "email");
        return true;
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