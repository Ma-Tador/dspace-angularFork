import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nBreadcrumbResolver } from '../core/breadcrumbs/i18n-breadcrumb.resolver';
import { PRIVACY_PATH, END_USER_AGREEMENT_PATH, FEEDBACK_PATH, FAQ_PATH, ACCESSIBILITY_PATH, IMPRESSUM_PATH, CONTACT_PATH } from './info-routing-paths';
import { ThemedEndUserAgreementComponent } from './end-user-agreement/themed-end-user-agreement.component';
import { ThemedPrivacyComponent } from './privacy/themed-privacy.component';
import { ThemedFeedbackComponent } from './feedback/themed-feedback.component';
import { FeedbackGuard } from '../core/feedback/feedback.guard';
import { environment } from '../../environments/environment';
import { InformationComponent } from './information/information.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ContactComponent } from './contact/contact.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';


const imports = [
  RouterModule.forChild([
    {
      path: FEEDBACK_PATH,
      component: ThemedFeedbackComponent,
      resolve: { breadcrumb: I18nBreadcrumbResolver },
      data: { title: 'info.feedback.title', breadcrumbKey: 'info.feedback' },
    }
  ]),

  RouterModule.forChild([
    {
      path: IMPRESSUM_PATH,
      component: ImpressumComponent,
      resolve: { breadcrumb: I18nBreadcrumbResolver },
      data: { title: 'info.impressum.title', breadcrumbKey: 'info.impressum' },
    }
  ]),

  RouterModule.forChild([
    {
      path: CONTACT_PATH,
      component: ContactComponent,
      resolve: { breadcrumb: I18nBreadcrumbResolver },
      data: { title: 'info.contact.title', breadcrumbKey: 'info.contact' },
    }
  ]),

  RouterModule.forChild([
    {
      path: ACCESSIBILITY_PATH,
      component: AccessibilityComponent,
      resolve: { breadcrumb: I18nBreadcrumbResolver },
      data: { title: 'info.accessibility.title', breadcrumbKey: 'info.accessibility' },
    }
  ]),

  RouterModule.forChild([
    {
      path: FAQ_PATH,
      component: InformationComponent,
      resolve: { breadcrumb: I18nBreadcrumbResolver },
      data: { title: 'info.faq.title', breadcrumbKey: 'info.faq' },
    }
  ]),
  RouterModule.forChild([
    {
      path: `${FAQ_PATH}/:faqId`,
      component: InformationComponent,
      resolve: { breadcrumb: I18nBreadcrumbResolver },
      data: { title: 'info.faq.title', breadcrumbKey: 'info.faq' },
    }
  ])
];

  if (environment.info.enableEndUserAgreement) {
    imports.push(
      RouterModule.forChild([
        {
          path: END_USER_AGREEMENT_PATH,
          component: ThemedEndUserAgreementComponent,
          resolve: { breadcrumb: I18nBreadcrumbResolver },
          data: { title: 'info.end-user-agreement.title', breadcrumbKey: 'info.end-user-agreement' }
        }
      ]));
  }
  // privacy disabled as component, only footer link to ub.fau.de/datenschutz
   if (environment.info.enablePrivacyStatement) {
     imports.push(
       RouterModule.forChild([
         {
           path: PRIVACY_PATH,
           component: ThemedPrivacyComponent,
           resolve: { breadcrumb: I18nBreadcrumbResolver },
           data: { title: 'info.privacy.title', breadcrumbKey: 'info.privacy' }
         }
       ]));
   }

@NgModule({
  imports: [
    ...imports
  ]
})
/**
 * Module for navigating to components within the info module
 */
export class InfoRoutingModule {
}
