import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-continue-prompt',
  imports: [],
  templateUrl: './continue-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContinuePromptComponent {
  action = output<'same' | 'change'>();

  choose(option: 'same' | 'change') {
    this.action.emit(option);
  }
}
