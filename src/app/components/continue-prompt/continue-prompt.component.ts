import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { QuestionResponse } from '../../models/question.response';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-continue-prompt',
  imports: [CommonModule, TranslateModule],
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
