// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [CommonModule],
  providers: [],
  declarations: [
  ], // Add any global services here
})

export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [], // Global services
    };
  }
}
