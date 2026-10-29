import { Injectable } from "@angular/core";
import { LoginRequestBody, LoginResponse, User } from "../models/user.model";
import { ApiService } from "./api.service";
@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {
    tokenKey: string = 'token';

     constructor() {
        super()
    }

    async Signup(formData: FormData) {
        const userJson = formData.get('user');

        if (typeof userJson !== 'string') {
            throw new Error('Missing user data in signup request');
        }

        const userData = JSON.parse(userJson);

        const requestBody = {
            email: userData.email,
            password: userData.password,
            firstname: userData.firstname,
            lastname: userData.lastname,
            city: userData.city,
            birthday: userData.birthday,
            profilePicture: userData.profilePicture,
            description: userData.description,
            preferences: userData.preferences
        }
        const request = new FormData();
        request.append('user', JSON.stringify(requestBody));

        const profilePicture = formData.get('profilePicture');
        if (profilePicture instanceof File) {
            request.append(
            'profilePicture',
            profilePicture,
            profilePicture.name
            );
        }

        return await this.post('/signup', request);
    }

    async Login( userData: LoginRequestBody ): Promise<LoginResponse> {
        const requestBody = {
            email: userData.email,
            password: userData.password,
        };

        return await this.post('/login', requestBody);
    }

    async Logout() {
        localStorage.removeItem(this.tokenKey);
        window.location.href = "/";
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }
}