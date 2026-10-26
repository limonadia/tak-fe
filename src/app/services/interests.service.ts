import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Interest } from "../models/chip.model";
@Injectable({
    providedIn: 'root'
})
export class InterestsService extends ApiService {

     constructor() {
        super({
            baseURL: 'http://localhost:8080/api/v1',
            defaultHeaders: {
                'Content-Type': 'application/json'
            }
        });
    }

    async getInterests(): Promise<Interest[]> {
        return await this.get('/interests');
    }

}