import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TracksComponent } from './tracks.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { HeaderModule } from '../header/header.module';
import { SliderModule } from '../slider/slider.module';
import { GetFirstImagePipe } from 'src/app/integrations/contentful/pipes/getcontentfulimage.pipe';

const routes: Routes = [
  {
    path: '',
    component: TracksComponent,
  },
  {
    path: ':slug',
    component: TrackDetailComponent,
  },
];

@NgModule({
  declarations: [TracksComponent, TrackDetailComponent, GetFirstImagePipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    TranslocoModule,
    HeaderModule,
    SliderModule,
  ],
})
export class TracksModule {}
