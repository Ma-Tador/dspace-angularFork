import { identifierName } from '@angular/compiler';
import { Component, Input } from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-uri-configurable-field',
  templateUrl: './item-page-uri-configurable-field.component.html'
})
/**
 * This component can be used to represent URIs for DOI, URN etc on a simple item page.
 * It expects 4 parameters: The item, a separator, the metadata keys and an i18n key. 
 * Optionally, to prefix other domains in front of metadata value, provide in domain a value. 
 */
export class ItemPageUriConfigurableFieldComponent extends ItemPageFieldComponent {

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

  
  // Prefix the domain for a resolver (doi, urn), if the metadata contains only the identifier. @Steli
  @Input() domain?: string;


  // Checks if the given metadata is a doi and has no domain prefixed
  isDoiWithoutDomain(metadata: string): boolean{
    if (metadata.includes('10.')  && !metadata.includes('http')){
      return true;
      console.log(metadata + 'is DOI')
    }
    return false;
  }

  // Checks if the given metadata is an urn and has no domain prefixed
  isUrnWithoutDomain(metadata: string): boolean{
    if (metadata.includes('urn:')  && !metadata.includes('http')){
      return true;
      console.log(metadata + 'is URN')

    }
    return false;
  }
}
