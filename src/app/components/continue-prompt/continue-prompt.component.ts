import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { QuestionResponse } from '../../models/question.response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-continue-prompt',
  imports: [CommonModule],
  templateUrl: './continue-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContinuePromptComponent {
  userAnswer = input.required<QuestionResponse>();
  action = output<'same' | 'change'>();

  choose(option: 'same' | 'change') {
    this.action.emit(option);
  }
}
