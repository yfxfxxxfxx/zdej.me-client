import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {GalleryComponent} from '../../gallery/gallery.component';

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

  constructor() { }

  ngOnInit(): void {
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

    const pattern = /image\/(jpg|png)/;
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

  loadFromGallery() {

  }

}
