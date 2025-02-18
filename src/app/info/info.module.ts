import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EndUserAgreementComponent } from './end-user-agreement/end-user-agreement.component';
import { InfoRoutingModule } from './info-routing.module';
import { EndUserAgreementContentComponent } from './end-user-agreement/end-user-agreement-content/end-user-agreement-content.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { PrivacyContentComponent } from './privacy/privacy-content/privacy-content.component';
import { ThemedEndUserAgreementComponent } from './end-user-agreement/themed-end-user-agreement.component';
import { ThemedPrivacyComponent } from './privacy/themed-privacy.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackFormComponent } from './feedback/feedback-form/feedback-form.component';
import { ThemedFeedbackComponent } from './feedback/themed-feedback.component';
import { FeedbackGuard } from '../core/feedback/feedback.guard';
import { InformationComponent } from './information/information.component';
import { NgbAccordionModule
 } from '@ng-bootstrap/ng-bootstrap';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ContactComponent } from './contact/contact.component';


const DECLARATIONS = [
  EndUserAgreementComponent,
  ThemedEndUserAgreementComponent,
  EndUserAgreementContentComponent,
  PrivacyComponent,
  PrivacyContentComponent,
  ThemedPrivacyComponent,
  FeedbackComponent,
  FeedbackFormComponent,
  ThemedFeedbackComponent,
  InformationComponent,
  AccessibilityComponent,
  ImpressumComponent,
  ContactComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InfoRoutingModule,
    NgbAccordionModule
  ],
  declarations: [
    ...DECLARATIONS
  ],
  exports: [
    ...DECLARATIONS
  ],
  providers: [FeedbackGuard]
})
export class InfoModule {
}
