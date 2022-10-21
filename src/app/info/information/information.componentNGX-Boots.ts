
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'ds-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit, AfterViewInit {

  openaccessIsOpen: boolean = false;
  openAccessLocal = false;
  isOpenAcordion: boolean[]= [false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false, false, false, false, false]

              
  //innerLink = undefined;

  constructor(protected translate: TranslateService,
              protected router: Router,
              protected route: ActivatedRoute,
              protected scroller: ViewportScroller
              ) 
              {       }



  
  
  ngAfterViewInit(): void {

        if(this.route.snapshot.fragment.split('-').length > 0){
          let idAccordionGroup = +(this.route.snapshot.fragment.split('-')[1]);
          this.expandAcordion(idAccordionGroup);
        }

        setTimeout(
          () => {
           this.scroller.scrollToAnchor(this.route.snapshot.fragment);
          }
        )

  }
  
  

  ngOnInit(): void {
  }



  expandAcordion(idAcordion: number){ 
    //console.log('expandAccordion called with id > ' + idAcordion)
    //open the accordion
    this.isOpenAcordion[idAcordion - 1] = true;
  }

  checkOpened(id: number){
    //console.log('checkOpened called with id> ' + id)
    //triggers the acordion to expand if needed
    return this.isOpenAcordion[id - 1];
  }

  checkCollapsed(event: boolean, id: number){
    //console.log('checkCollapsed called with id >' + id)
    this.isOpenAcordion[id-1] = event;
  }

}