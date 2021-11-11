import {Component, OnInit} from '@angular/core';
import {HttpService} from "../shared/http.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.minLength(8)]],
    location: ['', [Validators.required]],
  })

  constructor(private httpService: HttpService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createControls()
  }

  onSubmit(): void {
    this.httpService.createData(this.form.value)
  }

  private createControls(): void {
    this.form.controls['name'].setValue('John Smith')
    this.form.controls['email'].setValue('john@gmail.ru')
    this.form.controls['mobile'].setValue('12345678')
    this.form.controls['location'].setValue('Somewhere')
  }
}
