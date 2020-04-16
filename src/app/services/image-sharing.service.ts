import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageSharingService {

  private sharedUrl = new BehaviorSubject('');
  currentSharedUrl = this.sharedUrl.asObservable();

  constructor() { }

  updateSharedUrl(url: string) {
    this.sharedUrl.next(url);
  }
}
