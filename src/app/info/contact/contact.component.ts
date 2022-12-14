import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ds-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
/**
 * Component displaying the Contact details
 */
export class ContactComponent {

  constructor(protected translate: TranslateService) {}

}
