import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { QuestionResponse } from '../../models/question.response';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-topic-search',
  imports: [],
  templateUrl: './topic-search.component.html',
  styleUrl: './topic-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicSearchComponent {
  geminiService = inject(GeminiService);

  topic = signal('');
  loading = signal(false);
  response = signal<QuestionResponse | null>(null);

  async search() {
    const value = this.topic().trim();
    if (!value) return;

    console.log(value);
    this.loading.set(true);

    this.geminiService.generateQuestion(this.topic()).subscribe({
      next: (resp) => {
        this.response.set(resp);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading.set(false);
        this.topic.set('');
      },
    });
  }
}
