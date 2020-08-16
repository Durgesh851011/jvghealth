import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DoctorsService } from "../../../_services/doctors.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../_services/auth.service";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
const API_URL = 'http://jvghealth.com/webservices/';
@Component({
  selector: 'ngx-doctor-input',
  templateUrl: './doctor-input.component.html',
  styleUrls: ['./doctor-input.component.scss']
})
export class DoctorInputComponent implements OnInit {
  doctorForm: FormGroup;
  submitted = false;
  loader = false;
  doctorId;
  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
  public defaultImg = "./assets/images/jack.png";
  public imgURL: any = this.defaultImg;
  public cityList: any[] = [];
  public hospitalList: any[] = [];
  public specialityList: any[] = [];
  public yearList: any[] = [];
  public monthList: any[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  public imageChanged: boolean = false;
  public imageFile: any;

  constructor(private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private doctorsService: DoctorsService,
    private auth: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.getCityHospitalSpecialityList();
    if (this.route.snapshot.params && typeof this.route.snapshot.params.id !== 'undefined') {
      this.doctorId = this.route.snapshot.params.id;
      this.getDoctorInfo();
      this.pageTitle = "Edit";
    }
  }
  public pageTitle: string = "Add";
  ngOnInit(): void {
    for (var i = 0; i <= 100; i++) {
      this.yearList.push(i);
    }
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required]],
      doctorCost: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      cityId: ['0', [Validators.required]],
      hospitalId: ['0', [Validators.required]],
      availability: ['', [Validators.required]],
      experienceMonth: [0, [Validators.required]],
      experienceYear: [0, [Validators.required]],
      speciality: this.fb.array([]),
    });
    this.addmoreSpeciality();
  }

  addmoreSpeciality() {
    const arrayControl = <FormArray>this.doctorForm.controls['speciality'];
    let newGroup = this.fb.group({
      specialityId: [''],
      amount: [''],
    });
    arrayControl.push(newGroup);
    this.doctorForm.controls['speciality'] = arrayControl;
  }

  DeleteSpecialityInput(index: number): void {
    const arrayControl = <FormArray>this.doctorForm.controls['speciality'];
    arrayControl.removeAt(index);
  }

  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }

  async getDoctorInfo() {
    this.spinner.show();
    this.doctorsService.findsingleData(this.doctorId).pipe(first())
      .subscribe((data: any) => {
        var res = data.Data;
        var experienceYear = Math.floor(res.experianc_tot_month / 12);
        var experienceMonth = res.experianc_tot_month % 12;
        this.doctorForm = this.fb.group({
          name: [res.name, [Validators.required]],
          doctorCost: [res.doctorCost, [Validators.required]],
          phone: [res.phone, [Validators.required]],
          email: [res.email, [Validators.required]],
          cityId: [res.cityId, [Validators.required]],
          hospitalId: [res.hospitalId, [Validators.required]],
          availability: [res.availability, [Validators.required]],
          experienceMonth: [experienceMonth, [Validators.required]],
          experienceYear: [experienceYear, [Validators.required]],
          speciality: this.fb.array([]),
        });


        let fb = this.fb;
        if (res.specility.length) {
          const arrayControl = <FormArray>this.doctorForm.controls['speciality'];
          res.specility.forEach(function (value, key) {
            let newGroup = fb.group({
              specialityId: [value.specialityId],
              amount: [value.amount],
            });
            arrayControl.push(newGroup);
          });
          this.doctorForm.controls['speciality'] = arrayControl;
        } else {
          this.addmoreSpeciality();
        }

        this.imgURL = API_URL + res.image;
        if (res.image == '') {
          this.imgURL = this.defaultImg;
        }
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
        });

  }

  getCityHospitalSpecialityList() {
    this.spinner.show();
    this.doctorsService.GetCityHospitalSpecialityLists().pipe(first())
      .subscribe((data: any) => {
        this.spinner.hide();
        this.cityList = data.CityHospitalList;
        this.specialityList = data.specialityList;
      },
        error => {
          this.spinner.hide();
        });

  }


  GetHospitalListByCityId(id) {
    let index = this.cityList.findIndex(a => a.cityId == id);
    console.log(index);
    if (index > -1) {
      this.hospitalList = [];
      this.hospitalList = this.cityList[index].hospital;
    } else {
      this.hospitalList = [];
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

  get f() { return this.doctorForm.controls; }
  onSubmit() {
    if (this.doctorForm.invalid) {
      return false;
    }
    this.spinner.show();
    var valueData = this.doctorForm.value;
    valueData.imageChanged = this.imageChanged;
    if (this.doctorId) {
      valueData.doctorId = this.doctorId;
    }
    var jsonInput = JSON.stringify(valueData, function (key, value) { return value === null ? "" : value });
    const params = new FormData();
    params.append("jsonInput", jsonInput);
    params.append('image', this.imageFile);
    this.doctorsService.saveData(params, this.doctorId).subscribe(
      (data: any) => {
        if (data.success == true) {
          this.toastr.success(data.msg, 'Success');
          this.router.navigate(['/pages/doctor/list']);
        } else {
          this.toastr.error(data.msg, 'Error');
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
  }

}
