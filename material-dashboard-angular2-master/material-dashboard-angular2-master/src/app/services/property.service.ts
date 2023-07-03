import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'https://localhost:7255/api/Property/all';

  constructor(private http: HttpClient) { }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }
  deleteCardById(id: number): Promise<void> {
    return fetch(`https://localhost:7255/api/Property?id=${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`Card with ID ${id} deleted successfully`);
    })
    .catch(error => {
      console.error(`Error deleting card with ID ${id}: ${error}`);
    });
  }
}
