import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { QuestionResponse } from '../../models/question.response';

@Component({
  selector: 'app-question-view',
  imports: [],
  templateUrl: './question-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionViewComponent {
  questionData = input.required<QuestionResponse>();
  anwserSelected = output<number>();

  selectAnswer(index: number) {
    console.log(index);
    this.anwserSelected.emit(index);
  }
}
