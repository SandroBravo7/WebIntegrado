import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  private baseUrl = environment.urlApi + 'paypal';

  constructor(private http: HttpClient) {}

  private paymentData: any = null;


  setPaymentData(data: any): void {
    this.paymentData = data; // Guarda los detalles de la transacción, incluido el orderId
  }
  
  getOrderId(): string | null {
    return this.paymentData ? this.paymentData.id : null; // Devuelve el orderId almacenado
  }
}
