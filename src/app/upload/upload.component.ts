import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Conversion} from '../enum/conversion.enum';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../app.component';
import {HttpImageService} from '../services/http-image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  conversionType = 'GRAY';
  URLObservable: Observable<any>;
  convertedURL = '';
  contrastLevel = 0;
  processed = false;

  constructor(
    private httpImageService: HttpImageService,
    private http: HttpClient,
    private root: AppComponent
  ) {
    this.httpImageService = new HttpImageService(http);
  }

  ngOnInit(): void {
    this.root.conversionChange.subscribe((data) => {
      this.conversionType = Conversion[data.conversion];
    });
  }

  postImage(file) {
    console.log(this.processed);
    this.URLObservable = this.httpImageService.postImage(
      file, this.conversionType, this.contrastLevel
    );
    this.URLObservable.subscribe(
      response => {
        this.convertedURL = response.body;
      }
    );
  }

  updateContrastLevel(event) {
    this.contrastLevel = event.value;
  }

}
