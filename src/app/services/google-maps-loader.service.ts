import { Injectable } from '@angular/core';
import {
  importLibrary,
  setOptions
} from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from '../../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {
  private initialized = false;
  private placesPromise?: ReturnType<typeof importLibrary<'places'>>;

    async loadPlaces() {
    if (!this.initialized) {
        setOptions({
        key: GOOGLE_MAPS_API_KEY,
        v: 'weekly'
        });

        this.initialized = true;
    }

    if (!this.placesPromise) {
        this.placesPromise = importLibrary('places');
    }

    return this.placesPromise;
    }
}