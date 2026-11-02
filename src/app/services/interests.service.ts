import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Interest } from "../models/chip.model";
@Injectable({
    providedIn: 'root'
})
export class InterestsService extends ApiService {
    allInterests: Interest[] = [];

     constructor() {
        super()
    }

    async getInterests() {
        this.allInterests = await this.get('/interests');
    }

    get interests(): Interest[]{
        return this.allInterests;
    }

    async getPreferences(): Promise<Interest[]> {
        return await this.get('/preferences');
    }

}