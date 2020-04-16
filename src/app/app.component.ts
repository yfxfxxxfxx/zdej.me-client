import {Component, EventEmitter, Output} from '@angular/core';
import {Conversion} from './enum/conversion.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  colorMenu = false;
  conversion: Conversion;
  @Output() onConversionChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.conversion = 4;
  }

  updateConversionType(conversion) {
    console.log('conversion argument: ' + conversion);
    this.conversion = conversion;
    this.onConversionChange.emit({ conversion: conversion });
  }

  selectComponent() {
    return 'selected-option-tag';
  }

  deselectComponent() {
    return 'option-tag';
  }

  selectSidebarComponent() {
    return 'selected-sidebar-option';
  }

  deselectSidebarComponent() {
    return 'sidebar-option';
  }

  showColorMenu() {
    this.colorMenu = !this.colorMenu;
  }
}
