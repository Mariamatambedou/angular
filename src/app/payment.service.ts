import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8021'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  addPayment(payment: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payments`, payment);
  }
}
