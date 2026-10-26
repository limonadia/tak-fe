import { Injectable } from "@angular/core";
import { LoginRequestBody, LoginResponse, User } from "../models/user.model";
import { ApiService } from "./api.service";
import { email } from "@angular/forms/signals";
@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {
    tokenKey: string = '';

     constructor() {
        super({
            baseURL: 'http://localhost:8080/api/v1',
            defaultHeaders: {
                'Content-Type': 'application/json'
            }
        });
    }

    async Signup(formData: FormData) {
        const userJson = formData.get('user');

        if (typeof userJson !== 'string') {
            throw new Error('Missing user data in signup request');
        }

        const userData = JSON.parse(userJson);

        const requestBody = {
            email: userData.email,
            password_hash: userData.password,
            first_name: userData.firstname,
            last_name: userData.lastname,
            city: userData.city,
            birthday: userData.birthday,
            profile_picture: userData.profilePicture,
            description: userData.description,
            preferences: userData.preferences
        }
        const request = new FormData();
        request.append('user', JSON.stringify(requestBody));

        const profilePicture = formData.get('profile_picture');
        if (profilePicture instanceof File) {
            request.append(
            'profile_picture',
            profilePicture,
            profilePicture.name
            );
        }

        return await this.post('/signup', request);
    }

    async Login( userData: LoginRequestBody ): Promise<LoginResponse> {
        const requestBody = {
            email: userData.email,
            password_hash: userData.password,
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