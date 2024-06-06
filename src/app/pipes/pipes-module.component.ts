import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourFormatterPipe } from './hourFormatter.pipe';
import { DateFormatterPipe } from './date-formatter.pipe';

@NgModule({
  declarations: [
    DateFormatterPipe,
    HourFormatterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateFormatterPipe,
    HourFormatterPipe
  ],
})
export class PipesModule { }