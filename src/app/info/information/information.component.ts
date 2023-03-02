
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


  //install bootstrap dependencies if not present in node_modules: npm install --save jquery (if dependency error, use --force)
  //in angular.json, add dependencies for bootstrap, in order for the accordion to collapse
  // "scripts": [
  //   "node_modules/jquery/dist/jquery.slim.min.js",
  //   "node_modules/popper.js/dist/umd/popper.min.js",
  //   "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
  // ],

@Component({
  selector: 'ds-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements AfterViewInit, OnDestroy {

  selectedFaqId = '';
  selectedFaqTab: any;
  currentLanguage;
  subs: Subscription[] = [];

  constructor(
    protected translate: TranslateService,
    protected router: Router,
    protected route: ActivatedRoute
    ) {
      this.currentLanguage = this.translate.currentLang;
      this.subs.push( route.params.subscribe(params => {
      //get from path the accordion's tab id
      if (params.faqId){
        this.selectedFaqId = params.faqId;
        //get HtmlTab to open
        setTimeout(
           () => {
              this.selectedFaqTab = document.getElementById(this.selectedFaqId);
          }
        );
      }
      //on back/fwr, open the accordion defined in URL
      let perfEntries = performance.getEntriesByType('navigation');
      for (let i = 0; i < perfEntries.length; i++) {
          this.goToTab();
        }
     })
    );
  }

  //on toggle tab, reload page to open the tab
  onToggle(selectedId: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['./info/faq', selectedId]);
    });
  }

  goToTab(): void{
    try {
      if (this.selectedFaqId) {
        setTimeout(
          () => {
            this.selectedFaqTab = document.getElementById(this.selectedFaqId);
            if (this.selectedFaqTab != null || this.selectedFaqTab !== undefined){
              this.selectedFaqTab.className = 'collapse show';
              this.selectedFaqTab.scrollIntoView({behavior: 'smooth'});
            }
          }
        );
      }
    } catch (e){
        console.error('Oops...something went wrong in goToTab().');
    }
  }


  ngAfterViewInit(): void {
    this.goToTab();
  }

  ngOnDestroy(): void {
    if (this.subs != null || this.subs !== undefined){
      this.subs.forEach( sub => sub.unsubscribe() );
    }
  }

}

