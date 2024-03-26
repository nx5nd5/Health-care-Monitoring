import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeartbeatService {
  private  apiUrl = "http://89.116.236.217:8080/mibandbackend";

  constructor(private http: HttpClient) { }

  // getHeartbeats() {
  //   return this.http.get(`${this.apiUrl}/getHeartbeatsByClient/1?pageNo=0&pageSize=5`);
  // }

  // getClientHeartbeats(clientId: number): Observable<any> {
  //   const url = `${this.apiUrl}/getHeartbeatsByClient/${clientId}`;
  //   return this.http.get(url);
  // }
  getClientHeartbeats(clientId: number): Observable<any[]> {
    const pageSize = 100; // Set a suitable page size
    const url = `${this.apiUrl}/getHeartbeatsByClient/${clientId}`;

    // Recursive function to fetch all pages
    const fetchPages = (pageNo: number, allData: any[]): Observable<any[]> => {
      const pageUrl = `${url}?pageNo=${pageNo}&pageSize=${pageSize}`;

      return this.http.get(pageUrl).pipe(
        mergeMap((response: any) => {
          const newData = response || [];
          const updatedData = [...allData, ...newData];

          if (newData.length === pageSize) {
            // Continue fetching the next page
            return fetchPages(pageNo + 1, updatedData);
          } else {
            // Reached the last page, return all the data
            return of(updatedData);
          }
        })
      );
    };

    // Start fetching the pages
    return fetchPages(0, []);
  }

}
