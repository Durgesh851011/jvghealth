import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MedicineService } from "../../../_services/medicine.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { environment } from './../../../../environments/environment';
const API_URL = 'http://jvghealth.com/webservices/';

@Component({
  selector: 'ngx-medicine-input',
  templateUrl: './medicine-input.component.html',
  styleUrls: ['./medicine-input.component.scss']
})
export class MedicineInputComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private medicineService: MedicineService,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService) {
    if (this.route.snapshot.params && typeof this.route.snapshot.params.id !== 'undefined') {
      this.medicineId = this.route.snapshot.params.id;
      this.getMedicineInfo(this.medicineId)
      this.pageTitle = "Edit";
    }
  }

  medicineForm: FormGroup;
  submitted = false;
  public medicineId: any = "0";
  public pageTitle: string = "Add";
  public defaultImg = "./assets/images/jack.png";
  public imgURL: any = this.defaultImg;
  public imageChanged: boolean = false;
  public imageFile: any;

  ngOnInit(): void {
    this.medicineForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      prescription: ["1", [Validators.required]],
      medicine_type: ['', [Validators.required]],
    });
  }

  async getMedicineInfo(medicineId) {
    if (medicineId > 0) {
      this.medicineService.findsingleData(medicineId).pipe(first())
        .subscribe((data: any) => {
          if(data.Result.image){
            this.imgURL = API_URL + data.Result.image;
          }
          this.medicineForm = this.fb.group({
            name: [data.Result.name, [Validators.required]],
            price: [data.Result.price, [Validators.required]],
            discount: [data.Result.discount, [Validators.required]],
            prescription: [data.Result.prescription, [Validators.required]],
            medicine_type: [data.Result.medicine_type, [Validators.required]],
          });
        },
          error => {

          });
    } else {
      this.toastr.error('Affiliates Detail not found.', 'Error');
      this.router.navigate(['/pages/medicine/list'], { replaceUrl: true });
    }
  }

  onSelectFile(evt) {
    var files = evt.target.files;
    if (files.length === 0)
      return;
    this.imageChanged = true;
    this.imageFile = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event: any) => {
      this.imgURL = reader.result;
    }
  }


  get f() { return this.medicineForm.controls; }
  onSubmit() {
    if (this.medicineForm.invalid) {
      return false;
    }
    var valueData = this.medicineForm.value;
    valueData.imageChanged = this.imageChanged;
    if(this.medicineId){
      valueData.medicineId = this.medicineId;
    }
    var jsonInput = JSON.stringify(valueData, function (key, value) { return value === null ? "" : value });
    const params = new FormData();
    params.append("jsonInput", jsonInput);
    params.append('image', this.imageFile);
    this.medicineService.saveData(params, this.medicineId).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.toastr.success(data.msg, 'Success');
          this.router.navigate(['/pages/medicine/list']);
        } else {
          this.toastr.error(data.msg, 'Error');
        }
      }, error => {

      });
  }

}
