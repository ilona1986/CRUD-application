import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Customer} from "./customer";
import {catchError, Observable, of} from "rxjs";

const url = `https://fir-deploy-3c635-default-rtdb.europe-west1.firebasedatabase.app/customers`
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  customers: Customer[] = []

  constructor(private httpClient: HttpClient) {
  }

  //CRUD

  createData(customer: Customer): void {
    this.httpClient.post<Customer>(`${url}.json`, customer, httpOptions).subscribe(
      response => this.customers.push({...{key: response.name}, ...customer}),
      catchError(this.errorHandler<Customer>('POST'))
    )
  }

  getData(): void {
    this.httpClient.get<Customer[]>(`${url}.json`, httpOptions).subscribe(
      response => Object.keys(response).forEach((key) => this.customers.push({key, ...response[key as any]})),
      catchError(this.errorHandler<Customer[]>('GET'))
    )
  }

  updateData(customer: Customer, i: number): void {
    const {key, ...data} = customer
    this.httpClient.put<Customer>(`${url}/${key}.json`, data, httpOptions).subscribe(
      response => this.customers[i] = customer,
      catchError(this.errorHandler<Customer>('PUT'))
    )
  }

  deleteData(customer: Customer): void {
    this.httpClient.delete<void>(`${url}/${customer.key}.json`, httpOptions).subscribe(
      () => this.customers.splice(this.customers.indexOf(customer), 1),
      catchError(this.errorHandler<void>('DELETE'))
    )
  }

  private errorHandler<T>(operation: string, response?: T): any {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error}`);
      return of(response as T)
    }
  }
}
