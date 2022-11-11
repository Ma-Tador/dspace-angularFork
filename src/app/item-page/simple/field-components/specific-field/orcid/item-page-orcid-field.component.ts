import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { hasValue } from 'src/app/shared/empty.util';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';

  export class PersonInfo{
    constructor(
      public id: string,
      public authority_type: string,
      public value: string,
      public orcid_id: string
      )
      {
        //create obj via ctr^
      }
  }


@Component({
  selector: 'ds-item-page-orcid-field',
  templateUrl: './item-page-orcid-field.component.html'
})
/**
 * This component can be used to represent all author's ORCID on a simple item page.
 * It expects 4 parameters: The item, a separator, the metadata keys and an i18n key
 */
export class ItemPageOrcidFieldComponent implements OnInit{

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Separator string between multiple values of the metadata fields defined
   * @type {string}
   */
  @Input() separator: string;

  /**
   * Fields (schema.element.qualifier) used to render their values.
   */
  @Input() fields: string[];

  /**
   * Label i18n key for the rendered metadata
   */
  @Input() label: string;

  constructor(private http: HttpClient, private httpBackend: HttpBackend) { }

  authority_id: any; // = '3baea581-c1aa-4dcf-bf90-59f1ffdb2c4a';

  solr_rest_endpoint: any;

  orcid_query$: Observable<PersonInfo[]>;

  deduplicatedAuthors: any;


  ngOnInit(): void {
/*
        let metadataContributors = this.item.allMetadata(this.fields);
        this.deduplicatedAuthors = metadataContributors.filter((value, index, self) => { return self.findIndex(v => v.value === value.value) === index; });
        this.authority_id  =  this.deduplicatedAuthors.map( allMetadata => allMetadata.authority);
        //this.solr_rest_endpoint = 'http://repotest.ub.fau.de:8984/solr/authority/select?fq=authority_type%3Aorcid&fl=orcid_id&q.op=AND&q=id%3A' + this.authority_id;
        this.solr_rest_endpoint = 'https://repotest.ub.fau.de/solr/authority/select?fq=authority_type%3Aorcid&q=*%3A*&rows=10000';
        this.getOrcidsForAuthors();
*/
  }



  getOrcidsForAuthors(){
   // this.orcid_query$ = httpClient.get<any>(this.solr_rest_endpoint), {headers})
    this.orcid_query$ = this.http.get<any>(this.solr_rest_endpoint)
    .pipe(
      map((solrData) => solrData.response.docs.filter(pi => this.authority_id.includes(pi.id))
      )
    );
  }


}

  /* add in [Solr]/server/solr-webapp/webapp/WEB-INF sudo nano web.xml
    add before the defined filter, this filter (put instead of *, your host url)
  <filter>
   <filter-name>cross-origin</filter-name>
   <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
   <init-param>
     <param-name>allowedOrigins</param-name>
     <param-value>*</param-value>
   </init-param>
   <init-param>
     <param-name>allowedMethods</param-name>
     <param-value>GET,POST,OPTIONS,DELETE,PUT,HEAD</param-value>
   </init-param>
   <init-param>
     <param-name>allowedHeaders</param-name>
     <param-value>origin, content-type, accept</param-value>
   </init-param>
 </filter>
 <filter-mapping>
   <filter-name>cross-origin</filter-name>
   <url-pattern>/*</url-pattern>
 </filter-mapping>
 */
