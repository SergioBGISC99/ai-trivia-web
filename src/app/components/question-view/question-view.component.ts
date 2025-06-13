import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { QuestionResponse } from '../../models/question.response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-view',
  imports: [CommonModule],
  templateUrl: './question-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionViewComponent {
  questionData = input.required<QuestionResponse>();
  anwserSelected = output<number>();
  selectedIndex = signal<number | null>(null);

  selectAnswer(index: number) {
    if (this.selectedIndex() !== null) return;
    this.selectedIndex.set(index);
    this.anwserSelected.emit(index);
  }
}
