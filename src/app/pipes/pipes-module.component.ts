import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourFormatterPipe } from './hourFormatter.pipe';
import { DateFormatterPipe } from './date-formatter.pipe';
import { DecimalCommaPipe } from './decimal.pipe';

@NgModule({
  declarations: [
    DateFormatterPipe,
    HourFormatterPipe,
    DecimalCommaPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateFormatterPipe,
    HourFormatterPipe,
    DecimalCommaPipe
  ],
})
export class PipesModule { }