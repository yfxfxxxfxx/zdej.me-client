import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpImageService} from '../services/http-image.service';
import {HttpClient} from '@angular/common/http';
import {ImageSharingService} from '../services/image-sharing.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  // TODO: implement purging of inactive URL's from array
  thumbnailURLs: string[] = [];
  providedUrl = '';

  constructor(
    private httpImageService: HttpImageService,
    private http: HttpClient,
    private imageSharingService: ImageSharingService
  ) {
    this.httpImageService = new HttpImageService(http);
  }

  ngOnInit(): void {
    this.getImagesFromServer();
    this.imageSharingService.currentSharedUrl.subscribe(
      url => this.providedUrl = url
    );
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

  updateSharedUrl(url: string) {
    this.imageSharingService.updateSharedUrl(url);
  }
}
