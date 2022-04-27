import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';
import { AppSettings } from '../../../common/appSettings';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private subject = new BehaviorSubject<string>(
    localStorage.getItem('lang') || AppSettings.LANGUAGES.EN
  );
  private lang$ = this.subject.asObservable();

  constructor(private translocoService: TranslocoService) {}

  changeLang(lang: string) {
    this.subject.next(lang);
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('lang', lang);
  }

  get lang() {
    return this.lang$;
  }
}
