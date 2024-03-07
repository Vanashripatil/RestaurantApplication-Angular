import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder} from '@angular/forms';
import { App } from '../modal/app';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {

  showModal: boolean | undefined;
  formValue!:FormGroup;
  RestaurantModelObj: App = new App;
  allRestaurantData: any;
  showAdd!: boolean;
  showBtn!: boolean;
  
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: ['']
    })

    this.getAllData();
  }

  clickAddResto(){
    this.showAdd = true;
    this.showBtn = false;
  }

  addResto(){
    this.RestaurantModelObj.name = this.formValue.value.name;
    this.RestaurantModelObj.email = this.formValue.value.email;
    this.RestaurantModelObj.mobile = this.formValue.value.mobile;
    this.RestaurantModelObj.address = this.formValue.value.address;
    this.RestaurantModelObj.service = this.formValue.value.service;

    this.api.postRestaurant(this.RestaurantModelObj).subscribe(res => {
      console.log(res);
      alert("successful");
      this.formValue.reset();
      this.getAllData();
    },
    err => {
      alert("fault");
      
    })
  }

  getAllData(){
    this.api.getRestaurant().subscribe((res => {
      console.log(res);
      
      this.allRestaurantData = res;
    }));
  }
  
  deleteData(data:any){
    this.api.deleteRestaurant(data.id).subscribe((res => {
      console.log(res);
      this.getAllData();
    }));
  }

  onEditData(data:any){
    this.showAdd = false;
    this.showBtn = true;
    this.RestaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['service'].setValue(data.service);
  }

  updateData(){
    this.RestaurantModelObj.name = this.formValue.value.name;
    this.RestaurantModelObj.email = this.formValue.value.email;
    this.RestaurantModelObj.mobile = this.formValue.value.mobile;
    this.RestaurantModelObj.address = this.formValue.value.address;
    this.RestaurantModelObj.service = this.formValue.value.service;

    this.api.updateRestaurant(this.RestaurantModelObj.id, this.RestaurantModelObj ).subscribe((res =>{
      console.log("Updated successfully");
      
      this.formValue.reset();
      this.getAllData();
    }))
  }
}
