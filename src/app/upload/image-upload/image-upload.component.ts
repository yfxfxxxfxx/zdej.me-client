import { Component, OnInit } from '@angular/core';
import {HttpImageService} from '../../services/http-image.service';
import {ImageSharingService} from '../../services/image-sharing.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  dragging = false;
  loaded = false;
  imageLoaded = false;
  imageSrc = '';
  file: Blob;

  constructor(
    private imageSharingService: ImageSharingService,
    private httpImageService: HttpImageService,
    private http: HttpClient
  ) {
    this.httpImageService = new HttpImageService(http);
  }

  ngOnInit(): void {
    this.imageSharingService.currentSharedUrl.subscribe(
      url => {
        if (url.toString().length > 0) {
          this.imageSrc = url.toString();
          this.loaded = true;
          this.httpImageService.getImage(this.imageSrc).subscribe(img => {
              this.file = this.blobToFile(img, url.split('/').pop());
            }
          );
        }
      }
    );
  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleInputChange(e) {
    this.file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    const pattern = /image\/(jpe?g|png)/;
    const reader = new FileReader();

    if (!this.file.type.match(pattern)) {
      alert('Please select a PNG or JPG image.');
      return;
    }

    this.loaded = false;

    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.file);
  }

  handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
  }

  clearImage(e) {
    this.imageSrc = '';
    this.file = null;
    this.loaded = false;
    e.preventDefault();
  }

  blobToFile(blob: Blob, filename: string) {
    const b: any = blob;
    b.lastModifiedDate = new Date();
    b.name = filename;

    return blob as File;
  }

}
