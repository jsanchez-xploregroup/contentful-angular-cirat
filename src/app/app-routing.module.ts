import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetEntriesResolver } from './integrations/contentful/services/getentries.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'track',
    pathMatch: 'full',
  },
  {
    path: 'track',
    resolve: {
      tracks: GetEntriesResolver,
    },
    loadChildren: () =>
      import('./pages/tracks/tracks.module').then((m) => m.TracksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
