import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, SwiperModule],
  exports: [SliderComponent],
})
export class SliderModule {}
