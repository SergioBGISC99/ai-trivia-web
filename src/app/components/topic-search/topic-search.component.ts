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
import { ContinuePromptComponent } from '../continue-prompt/continue-prompt.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-topic-search',
  imports: [
    LoaderComponent,
    QuestionViewComponent,
    ContinuePromptComponent,
    TranslateModule,
  ],
  templateUrl: './topic-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicSearchComponent {
  aiService = inject(AiService);
  toastService = inject(ToastService);

  topic = signal('');
  loading = signal(false);
  response = signal<QuestionResponse | null>(null);

  showContinuePrompt = signal(false);

  async search() {
    const value = this.topic().trim();
    if (!value) return;

    this.loading.set(true);
    this.response.set(null);

    this.aiService.generateGeminiQuestion(this.topic()).subscribe({
      next: (resp) => {
        this.response.set(resp);
        this.loading.set(false);
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
        this.loading.set(false);
      },
    });
  }

  async validateAnswer(index: number) {
    const questionId = this.response()!.id;

    this.aiService.validateAnswer(index, questionId).subscribe({
      next: (resp) => {
        this.response.set(resp);

        if (resp.isCorrect) {
          this.toastService.showSuccess('Respuesta correcta', 'Felicidades🥳');
        } else {
          this.toastService.showInfo('Respuesta incorrecta', 'Mala suerte😣');
        }

        this.showContinuePrompt.set(true);
      },
      error: (err) => {
        console.error(err);
        this.toastService.showError('No se pudo validar la respuesta', 'Error');
      },
    });
  }

  async handleContinuePrompt(value: 'same' | 'change') {
    if (value === 'same') {
      this.search();
    } else {
      this.response.set(null);
      this.topic.set('');
    }

    this.showContinuePrompt.set(false);
  }
}
