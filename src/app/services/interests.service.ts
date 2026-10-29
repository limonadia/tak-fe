import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Interest } from "../models/chip.model";
@Injectable({
    providedIn: 'root'
})
export class InterestsService extends ApiService {

     constructor() {
        super()
    }

    async getInterests(): Promise<Interest[]> {
        return await this.get('/interests');
    }

    async getPreferences(): Promise<Interest[]> {
        return await this.get('/preferences');
    }

}