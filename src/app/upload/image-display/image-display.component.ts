import {Component, Input, OnInit} from '@angular/core';
import {HttpImageService} from '../../services/http-image.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {

  @Input('sourceUrl') sourceUrl = '';
  processed: boolean;

  constructor(
    private httpImageService: HttpImageService,
    private http: HttpClient
  ) {
    this.httpImageService = new HttpImageService(http);
  }

  ngOnInit(): void {
  }

  markAsProcessed() {
    this.processed = true;
  }

  getImageFromURL() {
    this.httpImageService.getImage(this.sourceUrl).subscribe(
      (data) => {
        console.log(data);
        this.downloadFile(data);
      },
      error => console.log(error),
      () => console.log('OK')
    );
  }

  downloadFile(data: Response) {
    console.log(data);
    // @ts-ignore
    const blob = new Blob([data], { type: 'image/*' });
    console.log(data.type);
    const fileURL = URL.createObjectURL(blob);

    // create <a> tag dynamically
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;

    // it forces the name of the downloaded file
    fileLink.download = this.sourceUrl.split('/').pop();

    // triggers the click event
    fileLink.click();
  }

  clearImage(e) {
    this.sourceUrl = '';
    this.processed = false;
    e.preventDefault();
  }

}
