import { Component, Input, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { IImages } from 'src/app/integrations/contentful/models/contentful';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent {
  pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };
  imageSlides: string[] = [];

  @Input() set slides(slides: IImages[]) {
    this.imageSlides = slides.map(
      (slide: any) => `${slide.fields.imageFile.fields.file.url}?w=768`
    );
  }
}
