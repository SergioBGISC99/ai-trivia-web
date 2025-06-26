import { Component } from '@angular/core';
import { TopicSearchComponent } from './components/topic-search/topic-search.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [TopicSearchComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    const lang = navigator.language.split('-')[0];
    const validLangs: string[] = ['es', 'en'];

    const useLang = validLangs.find((l) => l === lang) ? lang : 'en';

    this.translate.addLangs(validLangs);
    this.translate.setDefaultLang(useLang);
    this.translate.use(useLang);
  }
}
