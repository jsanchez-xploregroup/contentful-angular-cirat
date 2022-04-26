import { Component } from '@angular/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private headerService: LanguageService) {}

  changeLang(lang: string) {
    this.headerService.changeLang(lang);
  }
}
