import { Component } from '@angular/core';
import { TopicSearchComponent } from './components/topic-search/topic-search.component';

@Component({
  selector: 'app-root',
  imports: [TopicSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ai-trivias-web';
}
