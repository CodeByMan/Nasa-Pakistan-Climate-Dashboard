import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TemperatureRecord {
  date: string;
  value: number;
}

@Injectable({ providedIn: 'root' })
export class NasaDataService {
  private readonly apiUrl = 'http://localhost:5016/api/nasadata';

  constructor(private readonly http: HttpClient) {}

  getNasaData(location: string, start: string, end: string, parameter: string): Observable<TemperatureRecord[]> {
    const params = new HttpParams()
      .set('location', location)
      .set('start', start)
      .set('end', end)
      .set('parameter', parameter);

    return this.http.get<TemperatureRecord[]>(`${this.apiUrl}/nasa-data`, { params });
  }

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/locations`);
  }
}
