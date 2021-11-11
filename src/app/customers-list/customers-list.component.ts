import {Component, OnInit} from '@angular/core';
import {HttpService} from "../shared/http.service";
import {Customer} from "../shared/customer";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  isEditPos: number | null = null;

  constructor(public httpService: HttpService) {
  }

  ngOnInit(): void {
    this.httpService.getData();
  }

  editCustomer(i: number): void {
    this.isEditPos = i;
  }

  cancelEdit(): void {
    this.isEditPos = null;

  }

  saveCustomer(customer: Customer, i: number): void {

  }

  deleteCustomer(customer: Customer): void {

  }
}
