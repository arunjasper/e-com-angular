import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from '../../../environments/environment';
LocalstorageService
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _http = inject(HttpClient);
  private _localstorageService = inject(LocalstorageService);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this._localstorageService.getToken()
    })
  };

  getUser(): Observable<any> {
    return this._http.get<any>(`${environment.api}v1/auth/profile`);
  }

  updateUser(user: any): Observable<any> {
    return this._http.put<any>(`${environment.api}/v1/users/1`, user);
  }
}
