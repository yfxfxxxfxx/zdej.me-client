import { TestBed } from '@angular/core/testing';

import { ImageSharingService } from './image-sharing.service';

describe('ImageSharingService', () => {
  let service: ImageSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
