import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailLoaderComponent } from './thumbnail-loader.component';

describe('ThumbnailLoaderComponent', () => {
  let component: ThumbnailLoaderComponent;
  let fixture: ComponentFixture<ThumbnailLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
