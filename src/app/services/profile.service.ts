import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ApiService {
    user: User = {};
    constructor() {
        super()
    }

    async getProfile() {
        this.user = await this.get('/profile');
    }

    get userObject() {
        return this.user;
    }

    get profileP() {
        const apiBaseUrl = environment.apiUrl.replace(/\/api\/v1\/?$/, '');
        return this.user.profilePicture ? `${apiBaseUrl}/${this.user.profilePicture.replace(/^\/+/, '')}` : 'https://ionicframework.com/docs/img/demos/avatar.svg';
    }

    onImageSelected(event: Event, imagePreview: any): any {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            return;
        }

        if (imagePreview) {
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
