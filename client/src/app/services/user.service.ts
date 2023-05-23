import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  setLoggedIn(value: boolean) {
    return this.isLoggedInSubject.next(value);
  }

  loginUser(body: object): Observable<any> {
    return this.http.post<object>(`${environment.apiUrl}/users/login`, body, {
      withCredentials: true,
    });
  }
  getUserProfile(): Observable<any> {
    return this.http.get<object>(`${environment.apiUrl}/users/profile`, {
      withCredentials: true,
    });
  }

  registerUser(body: object): Observable<any> {
    return this.http.post<object>(
      `${environment.apiUrl}/users/register`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  updateUser(body:object): Observable<any> {
    return this.http.patch<object>(`${environment.apiUrl}/users/profile`, body,{
      withCredentials: true,
    });
  }

  logoutUser(): Observable<any> {
    return this.http.post<object>(`${environment.apiUrl}/users/logout`,{
      withCredentials: true,
    });
  }
}
