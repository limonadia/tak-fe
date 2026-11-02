import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { InterestsService } from './interests.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ApiService {
    user: User = {};
    constructor(private interestsService: InterestsService) {
        super()
    }

    async getProfile() {
        this.user = await this.get('/profile');
    }

    async updateProfile(body: FormData) {
        this.user = await this.put('/profile', body);
        await this.interestsService.getPreferences();
    }

    get userObject() {
        return this.user;
    }

    get profileP() {
        const apiBaseUrl = environment.apiUrl.replace(/\/api\/v1\/?$/, '');
        return this.user.profilePicture ? `${apiBaseUrl}/${this.user.profilePicture.replace(/^\/+/, '')}` : 'https://ionicframework.com/docs/img/demos/avatar.svg';
    }

    onImageSelected(event: Event, imagePreview: string | null): File | null {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return null;

        if (!file.type.startsWith('image/')) {
            console.error('Please select a valid image.');
            input.value = '';
            return null;
        }

        if (file.size > 5 * 1024 * 1024) {
            console.error('Image size must be less than 5 MB.');
            input.value = '';
            return null;
        }

        if (imagePreview?.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
        }

        return file;
    }

    removeImage(imagePreview: any): void {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    }

    getMaxBirthday(minAge: number): string {
        const today = new Date();
        today.setFullYear(today.getFullYear() - minAge);
        return today.toISOString().split('T')[0];
    }
    
}
