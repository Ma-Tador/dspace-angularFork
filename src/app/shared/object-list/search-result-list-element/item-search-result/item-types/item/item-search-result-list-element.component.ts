import { Component, OnInit, AfterViewInit } from '@angular/core';
import { listableObjectComponent } from '../../../../../object-collection/shared/listable-object/listable-object.decorator';
import { ViewMode } from '../../../../../../core/shared/view-mode.model';
import { ItemSearchResult } from '../../../../../object-collection/shared/item-search-result.model';
import { SearchResultListElementComponent } from '../../../search-result-list-element.component';
import { Item } from '../../../../../../core/shared/item.model';
import { getItemPageRoute } from '../../../../../../item-page/item-page-routing-paths';

import { Observable, of } from 'rxjs';
import { RemoteData } from 'src/app/core/data/remote-data';
import { DSpaceObject } from 'src/app/core/shared/dspace-object.model';
import { followLink } from '../../../../../utils/follow-link-config.model';
import { find, map } from 'rxjs/operators';
import { ChildHALResource } from '../../../../../../core/shared/child-hal-resource.model';
import { of as observableOf } from 'rxjs';
import { hasValue, isNotEmpty } from '../../../../../empty.util';

@listableObjectComponent('PublicationSearchResult', ViewMode.ListElement)
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement)
@Component({
  selector: 'ds-item-search-result-list-element',
  styleUrls: ['./item-search-result-list-element.component.scss'],
  templateUrl: './item-search-result-list-element.component.html'
})
/**
 * The component for displaying a list element for an item search result of the type Publication
 */
export class ItemSearchResultListElementComponent extends SearchResultListElementComponent<ItemSearchResult, Item> implements OnInit{
  /**
   * Route to the item's page
   */
  itemPageRoute: string;

  /**
   * Display thumbnails if required by configuration
   */
  showThumbnails: boolean;

  //check if the item's Volume Nr should be displayed @Steli
  showVolumeNr$: Observable<string>;


  ngOnInit(): void {
    super.ngOnInit();
    this.showThumbnails = this.appConfig.browseBy.showThumbnails;
    this.itemPageRoute = getItemPageRoute(this.dso);

    //get metadata value for showVolNr @Steli
    this.showVolumeNr$ = this.route.data?.pipe(
      map( (data) => {
        if (data.dso === undefined || data.dso.payload === undefined){
          return '';
        } else {
          return data.dso.payload.firstMetadataValue('local.series.showVolNr');
        }
       }
      ),
    );
  }

}
