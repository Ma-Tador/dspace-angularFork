import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ds-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
/**
 * Component displaying the Accessibility Statement
 */
export class AccessibilityComponent {

  constructor(protected translate: TranslateService) {}
}
