import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'ngx-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})


export class DemoComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }
  public imageFile:any = [];
  CollegeSubmit(valueData) {
    const params = new FormData();
    params.append('prescriptionFiles', this.imageFile);
    this.http.post('http://jvghealth.com/webservices/test.php', params).subscribe((res: any) => {

    }, error => {
      console.log(error);
    });
  }

  onSelectFile(evt) {
    var files = evt.target.files;
    console.log("files",files);
    if (files.length === 0)
      return;
    this.imageFile = evt.target.files[0];
  }
}
