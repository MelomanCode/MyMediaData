import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandwichComponent } from './sandwich.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SandwichComponent],
  imports: [CommonModule, MatIconModule],
  exports: [SandwichComponent],
})
export class SandwichModule {}
