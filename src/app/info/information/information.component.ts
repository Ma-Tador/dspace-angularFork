
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ds-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements AfterViewInit, OnDestroy {

  //install bootstrap dependencies if not present in node_modules: npm install --save jquery (if dependency error, use --force)
  //in angular.json, add dependencies for bootstrap, in order for the accordion to collapse
  // "scripts": [
  //   "node_modules/jquery/dist/jquery.slim.min.js",
  //   "node_modules/popper.js/dist/umd/popper.min.js",
  //   "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
  // ],
 
  selectedFaqId = '';
  selectedFaqTab;
  subs: Subscription[] = [];

  constructor(
    protected translate: TranslateService,
    protected router: Router,
    protected route: ActivatedRoute
    ) 
  {   
    this.subs.push( route.params.subscribe(params => {
      console.log('Params is: ', params)

      //get from path the accordion's tab id    
      if(params.faqId){
        this.selectedFaqId = params.faqId;
        //get HtmlTab to open
        setTimeout(
           () => {
              this.selectedFaqTab = document.getElementById(this.selectedFaqId);
          }
        )
      }
      
      //on back/fwr, open the accordion defined in URL
      var perfEntries = performance.getEntriesByType("navigation");
      for (var i = 0; i < perfEntries.length; i++) {  
          //alert('wow')
          this.goToTab()
        }
     })
    )
  }


  //on toggle tab, reload page to open the tab
  onToggle(selectedId: string): void {
    //if(this.selectedFaqTab.className == "collapse"){
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['./info/faq', selectedId]);
    });
    //}
  }
                 

  ngAfterViewInit(): void {
    //this.scrollToAnchor();
    this.goToTab();
  } 


  goToTab(): void{
    try {
      if(this.selectedFaqId != null || this.selectedFaqId != undefined  || this.selectedFaqId != '' ){
        setTimeout(
          () => {
            this.selectedFaqTab = document.getElementById(this.selectedFaqId);
            if(this.selectedFaqTab != null || this.selectedFaqTab != undefined){
              this.selectedFaqTab.className = "collapse show"; 
              this.selectedFaqTab.scrollIntoView({behavior: "smooth"});
            }
          }
        )
      }
    }catch(e){
        console.error('Oops...something went wrong in goToTab().')
    }
  }

  ngOnDestroy(): void {
    if(this.subs != null || this.subs != undefined){
      this.subs.forEach( sub => sub.unsubscribe() )
    }
  }


  //angular way
  // scrollToAnchor(){
  //   try {
  //     if(this.fragment != null || this.fragment != undefined){
  //       let accordionTab = document.getElementById(this.fragment); //document.querySelector('#' + this.fragment);
  //       if(accordionTab != null){
  //         //open accordion
  //         accordionTab.className = "collapse show"; 
  //         //in app.module added RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'} )
  //         //after page loads, jump to reference accordion body
  //         setTimeout(
  //           () => {
  //             accordionTab.scrollIntoView({behavior: "smooth"});
  //           }
  //         )
  //     }
      
  //     }
  //   } catch (e) { 
  //       console.error('Something went wrong with the fragment.')
  //   }
  //  }


  // Javascript way
  // scrollToAnchor(){
  //   var anchor = window.location.hash;  //get fragment from URL as #policy
  //   let element = document.getElementById(anchor.substring(1));

  //   if(element != null){
  //     //open accordion
  //     element.className = "collapse show"; 
  //     //in app.module added RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'} )
  //     //after page loads, jump to reference accordion body
  //     setTimeout(
  //       () => {
  //         element.scrollIntoView({behavior: "smooth"});
  //       }
  //     )
  //   }
  // }


   // getUrlWithoutFragment(){
  //   let urlTree = this.router.parseUrl(this.router.url);
  //   //urlTree.queryParams = {}; 
  //   urlTree.fragment = null; // optional
  //   return urlTree.toString();
  // }

}

