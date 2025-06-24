import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
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
export class ContinuePromptComponent implements OnInit {
  userAnswer = input.required<QuestionResponse>();
  action = output<'same' | 'change'>();

  ngOnInit(): void {
    console.log(this.userAnswer());
  }

  choose(option: 'same' | 'change') {
    this.action.emit(option);
  }
}
