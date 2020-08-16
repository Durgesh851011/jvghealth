import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SubDiseaseService } from './../../../_services/sub-disease.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { environment } from './../../../../environments/environment';
const API_URL = 'http://jvghealth.com/webservices/';

@Component({
  selector: 'ngx-sub-diseasdiseaseDatae-input',
  templateUrl: './sub-disease-input.component.html',
  styleUrls: ['./sub-disease-input.component.scss']
})
export class SubDiseaseInputComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private subDiseaseService: SubDiseaseService,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService) {
    this.fetchDiseaseData();
    if (this.route.snapshot.params && typeof this.route.snapshot.params.id !== 'undefined') {
      this.subDiseaseId = this.route.snapshot.params.id;
      this.findsingleData(this.subDiseaseId);
      this.pageTitle = "Edit";
    }
  }

  subDiseaseForm: FormGroup;
  submitted = false;
  public pageTitle: string = "Add"
  public defaultImg = "./assets/images/jack.png";
  public imgURL: any = this.defaultImg;
  public imageChanged: boolean = false;
  public imageFile: any;
  public subDiseaseId = 0;
  public diseaseData: any = [];


  ngOnInit(): void {
    this.subDiseaseForm = this.fb.group({
      name: ['', [Validators.required]],
      diseaseId: ['', [Validators.required]]
    });
  }

  async findsingleData(subDiseaseId) {
    if (subDiseaseId > 0) {
      this.subDiseaseService.findsingleData(subDiseaseId).pipe(first())
        .subscribe((data: any) => {
          if(data.Result.image){
            this.imgURL = API_URL + data.Result.image;
          }
          this.subDiseaseForm = this.fb.group({
            name: [data.Result.name, [Validators.required]],
            diseaseId: [data.Result.diseaseId, [Validators.required]]
          });
        },
          error => {

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

  fetchDiseaseData() {
    this.subDiseaseService.getDisease().pipe(first()).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.diseaseData = data.Result;
        }
      },
      error => {

      }
    )
  }

  get f() { return this.subDiseaseForm.controls; }
  onSubmit() {
    if (this.subDiseaseForm.invalid) {
      return false;
    }
    var valueData = this.subDiseaseForm.value;
    valueData.imageChanged = this.imageChanged;
    if(this.subDiseaseId){
      valueData.subDiseaseId = this.subDiseaseId;
    }
    var jsonInput = JSON.stringify(valueData, function (key, value) { return value === null ? "" : value });
    const params = new FormData();
    params.append("jsonInput", jsonInput);
    params.append('image', this.imageFile);
    this.subDiseaseService.saveData(params, this.subDiseaseId).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.toastr.success(data.msg, 'Success');
          this.router.navigate(['/pages/subdisease/list/']);
        } else {
          this.toastr.error(data.msg, 'Error');
        }
      }, error => {

      });
  }

}
