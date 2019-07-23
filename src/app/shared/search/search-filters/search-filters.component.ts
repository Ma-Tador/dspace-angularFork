import { Component, Inject, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { SearchService } from '../../../core/shared/search/search.service';
import { RemoteData } from '../../../core/data/remote-data';
import { SearchFilterConfig } from '../search-filter-config.model';
import { SearchConfigurationService } from '../../../core/shared/search/search-configuration.service';
import { SearchFilterService } from '../../../core/shared/search/search-filter.service';
import { getSucceededRemoteData, obsLog } from '../../../core/shared/operators';
import { SEARCH_CONFIG_SERVICE } from '../../../+my-dspace-page/my-dspace-page.component';
import { currentPath } from '../../utils/route.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'ds-search-filters',
  styleUrls: ['./search-filters.component.scss'],
  templateUrl: './search-filters.component.html',
})

/**
 * This component represents the part of the search sidebar that contains filters.
 */
export class SearchFiltersComponent implements OnInit {
  /**
   * An observable containing configuration about which filters are shown and how they are shown
   */
  filters: Observable<RemoteData<SearchFilterConfig[]>>;

  /**
   * List of all filters that are currently active with their value set to null.
   * Used to reset all filters at once
   */
  clearParams;

  /**
   * True when the search component should show results on the current page
   */
  @Input() inPlaceSearch;

  /**
   * Initialize instance variables
   * @param {SearchService} searchService
   * @param {SearchConfigurationService} searchConfigService
   * @param {SearchFilterService} filterService
   */
  constructor(
    private searchService: SearchService,
    private filterService: SearchFilterService,
    private router: Router,
    @Inject(SEARCH_CONFIG_SERVICE) private searchConfigService: SearchConfigurationService) {

  }

  ngOnInit(): void {
    this.filters = this.searchConfigService.searchOptions.pipe(
      switchMap((options) => this.searchService.getConfig(options.scope, options.configuration).pipe(getSucceededRemoteData())),
      obsLog('searchoptions')
    );

    this.clearParams = this.searchConfigService.getCurrentFrontendFilters().pipe(map((filters) => {
      Object.keys(filters).forEach((f) => filters[f] = null);
      return filters;
    }));
  }

  /**
   * @returns {string} The base path to the search page, or the current page when inPlaceSearch is true
   */
  public getSearchLink(): string {
    if (this.inPlaceSearch) {
      return currentPath(this.router);
    }
    return this.searchService.getSearchLink();
  }

  /**
   * Prevent unnecessary rerendering
   */
  trackUpdate(index, config: SearchFilterConfig) {
    return config ? config.name : undefined;
  }
}
