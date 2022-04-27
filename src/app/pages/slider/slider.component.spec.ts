import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { tracks } from 'src/app/spec-helpers/track.spec-helper';
import { SwiperModule } from 'swiper/angular';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let spectator: Spectator<SliderComponent>;
  const createComponent = createComponentFactory({
    component: SliderComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: { slides: tracks.items[0].fields.images as any },
    });
  });

  it('should be truthy', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should be set the images', () => {
    spectator.detectChanges();
    const imageArr = [
      `${tracks.items[0].fields.images[0].fields.imageFile.fields.file.url}?w=768`,
    ];
    expect(spectator.component.imageSlides).toEqual(imageArr);
  });
});
