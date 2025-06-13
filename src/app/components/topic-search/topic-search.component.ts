import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { QuestionResponse } from '../../models/question.response';
import { AiService } from '../../services/ai.service';
import { ToastService } from '../../services/toast.service';
import { LoaderComponent } from '../loader/loader.component';
import { QuestionViewComponent } from '../question-view/question-view.component';

@Component({
  selector: 'app-topic-search',
  imports: [LoaderComponent, QuestionViewComponent],
  templateUrl: './topic-search.component.html',
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
        this.loading.set(false);
        this.topic.set('');
      },
      error: (err) => {
        console.error(err);
        this.checkOpenAI();
      },
    });
  }

  async checkOpenAI() {
    this.aiService.generateOpenAIQuestion(this.topic()).subscribe({
      next: (resp) => {
        this.response.set(resp);
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

  async validateAnswer(index: number) {
    this.loading.set(true);

    const questionId = this.response()!.id;

    this.aiService.validateAnswer(index, questionId).subscribe({
      next: (resp) => {
        if (resp.isCorrect) {
          this.toastService.showSuccess('Respuesta correcta', 'Felicidades🥳');
        } else {
          this.toastService.showInfo('Respuesta incorrecta', 'Mala suerte😣');
        }
      },
      error: (err) => {
        console.error(err);
        this.toastService.showError('No se pudo validar la respuesta', 'Error');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
