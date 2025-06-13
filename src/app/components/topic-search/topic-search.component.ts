import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { QuestionResponse } from '../../models/question.response';
import { AiService } from '../../services/ai.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-topic-search',
  imports: [],
  templateUrl: './topic-search.component.html',
  styleUrl: './topic-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicSearchComponent {
  aiService = inject(AiService);
  toastService = inject(ToastService);

  topic = signal('');
  loading = signal(false);
  response = signal<QuestionResponse | null>(null);

  async search() {
    const value = this.topic().trim();
    if (!value) return;

    this.loading.set(true);

    this.aiService.generateGeminiQuestion(this.topic()).subscribe({
      next: (resp) => {
        this.response.set(resp);
        this.toastService.showSuccess('Pregunta generada con éxito!', 'Éxito');
      },
      error: (err) => {
        console.error(err);
        this.toastService.showError('No se pudo generar la pregunta', 'Error');
      },
      complete: () => {
        this.loading.set(false);
        this.topic.set('');
      },
    });
  }
}
