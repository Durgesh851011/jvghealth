import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Disease1Service } from './../../../_services/disease1.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { environment } from './../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
const API_URL = 'http://jvghealth.com/webservices/';

@Component({
  selector: 'ngx-disease-input',
  templateUrl: './disease-input.component.html',
  styleUrls: ['./disease-input.component.scss']
})
export class DiseaseInputComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private diseaseService: Disease1Service,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.fetchSpecialityData();
    if (this.route.snapshot.params && typeof this.route.snapshot.params.id !== 'undefined') {
      this.diseaseId = this.route.snapshot.params.id;
      this.findsingleData(this.diseaseId);
      this.pageTitle = "Edit";
    }
  }

  diseaseForm: FormGroup;
  submitted = false;
  public pageTitle: string = "Add"
  public defaultImg = "./assets/images/jack.png";
  public imgURL: any = this.defaultImg;
  public imageChanged: boolean = false;
  public imageFile: any;
  public diseaseId = 0;
  public specialityData: any = [];


  ngOnInit(): void {
    this.diseaseForm = this.fb.group({
      name: ['', [Validators.required]],
      specialityId: ['', [Validators.required]]
    });
  }

  async findsingleData(diseaseId) {
    if (diseaseId > 0) {
      this.spinner.show();
      this.diseaseService.findsingleData(diseaseId).pipe(first())
        .subscribe((data: any) => {
          if (data.Result.image) {
            this.imgURL = API_URL + data.Result.image;
          }
          this.diseaseForm = this.fb.group({
            name: [data.Result.name, [Validators.required]],
            specialityId: [data.Result.specialityId, [Validators.required]]
          });
          this.spinner.hide();
        },
          error => {
            this.spinner.hide();
          });
    } else {
      this.toastr.error('Affiliates Detail not found.', 'Error');
      this.router.navigate(['/pages/disease/list'], { replaceUrl: true });
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

  fetchSpecialityData() {
    this.spinner.show();
    this.diseaseService.getSpeciality().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.specialityData = data.Result;
          console.log(this.specialityData);
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      }
    )
  }

  get f() { return this.diseaseForm.controls; }
  onSubmit() {
    if (this.diseaseForm.invalid) {
      return false;
    }
    this.spinner.show();
    var valueData = this.diseaseForm.value;
    valueData.imageChanged = this.imageChanged;
    if (this.diseaseId) {
      valueData.diseaseId = this.diseaseId;
    }
    var jsonInput = JSON.stringify(valueData, function (key, value) { return value === null ? "" : value });
    const params = new FormData();
    params.append("jsonInput", jsonInput);
    params.append('image', this.imageFile);
    this.diseaseService.saveData(params, this.diseaseId).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.toastr.success(data.msg, 'Success');
          this.router.navigate(['/pages/disease/list/']);
        } else {
          this.toastr.error(data.msg, 'Error');
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
  }

}
