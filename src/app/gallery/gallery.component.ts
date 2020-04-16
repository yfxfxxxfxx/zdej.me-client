import { Component, OnInit } from '@angular/core';
import {HttpImageService} from '../services/http-image.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  thumbnailURLs: string[] = [];

  constructor(
    private httpImageService: HttpImageService,
    private http: HttpClient
  ) {
    this.httpImageService = new HttpImageService(http);
  }

  ngOnInit(): void {
    this.getImagesFromServer();
  }

  getImagesFromServer() {
    this.httpImageService.getAllImages().subscribe(
      (data) => {
        for (const url of data) {
          this.thumbnailURLs.push(url);
        }
      },
      error => console.log(error),
      () => console.log('OK')
    );
  }

}
