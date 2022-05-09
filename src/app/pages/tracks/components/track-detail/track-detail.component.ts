import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from 'contentful';
import { Observable, of } from 'rxjs';
import { ContentfulService } from 'src/app/utils/contentful.service';
import { ITrackFields } from 'src/app/integrations/contentful/models/contentful';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackDetailComponent implements OnInit {
  track$!: Observable<Entry<ITrackFields>>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public contentfulService: ContentfulService
  ) {}

  ngOnInit(): void {
    this.track$ = of(
      this.route.snapshot.data['tracks'].items[0] as Entry<ITrackFields>
    );
  }

  goBack(): void {
    this.router.navigate(['/track']);
  }
}
