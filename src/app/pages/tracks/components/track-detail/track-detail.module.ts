import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackDetailComponent } from './track-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SliderModule } from 'src/app/pages/slider/slider.module';
import { TranslocoModule } from '@ngneat/transloco';

const routes: Routes = [
  {
    path: '',
    component: TrackDetailComponent,
  },
];

@NgModule({
  declarations: [TrackDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    SliderModule,
  ],
  exports: [],
})
export class TrackDetailModule {}
