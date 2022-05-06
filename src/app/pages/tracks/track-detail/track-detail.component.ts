import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Entry } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/utils/contentful.service';
import { TranslocoService } from '@ngneat/transloco';
import { ITrackFields } from 'src/app/integrations/contentful/models/contentful';
import { ContentfullContentService } from 'src/app/integrations/contentful/services/contentful-content.service';

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
    private contentfulContentService: ContentfullContentService<ITrackFields>,
    public contentfulService: ContentfulService,
    private transloco: TranslocoService
  ) {
    this.track$ = this.contentfulContentService.entry$;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const locale = this.transloco.getActiveLang();
      const queryObj = {
        locale,
      };
      this.contentfulContentService.getEntry(
        params.get('slug') as string,
        queryObj
      );
    });
  }

  goBack(): void {
    this.router.navigate(['/tracks']);
  }
}
