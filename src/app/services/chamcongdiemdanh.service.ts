import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { objectToQueryString } from './queryStringHelper';
const baseUrl = environment.hrmApiUrl + 'ChamCongDiemDanh';

@Injectable({
  providedIn: 'root'
})

export class ChamCongDiemDanhService {
  constructor(private http: HttpClient) { }

  getAll(query: any): Observable<any[]> {
    const queryString = objectToQueryString(query);
    return this.http.get<any[]>(`${baseUrl}?${queryString}`);
  }

  getAllNoPaging(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/nopaging`);
  }

  get(id: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  getDataByUserId(userId: any, data: any): Observable<any> {
    return this.http.get(`${baseUrl}/${userId}?${objectToQueryString(data)}`);
  }

  checkInThuCong(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/diem-danh-thu-cong`, data);
  }

  getBangChamCong(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/bang-cham-cong`, data);
  }

  getDetail(data:any): Observable<any> {
    return this.http.get(`${baseUrl}/detail?${objectToQueryString(data)}`);
  }
}
