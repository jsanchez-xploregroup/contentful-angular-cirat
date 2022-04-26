import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tracks',
    pathMatch: 'full',
  },
  {
    path: 'tracks',
    loadChildren: () =>
      import('./pages/tracks/tracks.module').then((m) => m.TracksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
