import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ds-accessibility',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
/**
 * Component displaying the Accessibility Statement
 */
export class ImpressumComponent {

  constructor(protected translate: TranslateService) {}

}
