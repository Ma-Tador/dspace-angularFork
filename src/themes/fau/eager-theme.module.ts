import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../app/shared/shared.module';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { HeaderComponent } from './app/header/header.component';
import { HeaderNavbarWrapperComponent } from './app/header-nav-wrapper/header-navbar-wrapper.component';
import { SearchModule } from '../../app/shared/search/search.module';
import { RootModule } from '../../app/root.module';
import { NavbarModule } from '../../app/navbar/navbar.module';
// when new Components are themed, we need to import and declare them here @Steli
import { FooterComponent } from './app/footer/footer.component';
import { LoginPageComponent } from './app/login-page/login-page.component';
import { HomePageComponent } from './app/home-page/home-page.component';
import { RecentItemListComponent } from '../../app/home-page/recent-item-list/recent-item-list.component';
import { RootComponent } from './app/root/root.component';

import { HomePageModule } from '../../app/home-page/home-page.module';
import { StatisticsModule } from '../../app/statistics/statistics.module';

/**
 * Add components that use a custom decorator to ENTRY_COMPONENTS as well as DECLARATIONS.
 * This will ensure that decorator gets picked up when the app loads
 */
const ENTRY_COMPONENTS = [
];

const DECLARATIONS = [
  ...ENTRY_COMPONENTS,
  HomeNewsComponent,
  HeaderComponent,
  HeaderNavbarWrapperComponent,
  NavbarComponent,
  FooterComponent,
  LoginPageComponent,
  HomePageComponent,
  RootComponent,

];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SearchModule,
    FormsModule,
    RootModule,
    NavbarModule,

    HomePageModule,
    StatisticsModule,
  ],
  declarations: DECLARATIONS,
  providers: [
    ...ENTRY_COMPONENTS.map((component) => ({ provide: component }))
  ],
})
/**
 * This module is included in the main bundle that gets downloaded at first page load. So it should
 * contain only the themed components that have to be available immediately for the first page load,
 * and the minimal set of imports required to make them work. Anything you can cut from it will make
 * the initial page load faster, but may cause the page to flicker as components that were already
 * rendered server side need to be lazy-loaded again client side
 *
 * Themed EntryComponents should also be added here
 */
export class EagerThemeModule {
}
