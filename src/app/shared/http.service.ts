import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Customer} from "./customer";

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
      error => console.error(error)
    )
  }

  getData(): void {
    this.httpClient.get<Customer[]>(`${url}.json`, httpOptions).subscribe(
      response => Object.keys(response).forEach((key) => this.customers.push({key, ...response[key as any]}))
    )
  }

  updateData(): void {

  }

  deleteData(): void {

  }
}
