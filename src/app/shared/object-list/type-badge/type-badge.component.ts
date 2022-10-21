import { Component, Input } from '@angular/core';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { hasValue, isEmpty } from '../../empty.util';
import { getResourceTypeValueFor } from '../../../core/cache/object-cache.reducer';

@Component({
  selector: 'ds-type-badge',
  templateUrl: './type-badge.component.html'
})
/**
 * Component rendering the type of an item as a badge
 */
export class TypeBadgeComponent {

  private _object: DSpaceObject;
  private _typeMessage: string;

  /**
   * The component used to retrieve the type from
   */
  /*
  @Input() set object(object: DSpaceObject) {
    this._object = object;

    const renderTypes = this._object.getRenderTypes();
    if (!isEmpty(renderTypes.length)) {
      const renderType = renderTypes[0];
      if (renderType instanceof Function) {
        const resourceTypeValue = getResourceTypeValueFor(object.type);
        if (hasValue(resourceTypeValue)) {
          this._typeMessage = `${resourceTypeValue.toLowerCase()}.listelement.badge`;
        } else {
          this._typeMessage = `${renderType.name.toLowerCase()}.listelement.badge`;
        }
      } else {
        this._typeMessage = `${renderType.toLowerCase()}.listelement.badge`;
      }
    }
  }
  */

  //modified to show doc type steli
@Input() set object(object: DSpaceObject) {
  this._object = object;

 const renderTypes = this._object.getRenderTypes();
 if (!isEmpty(renderTypes.length)) {
   const renderType = renderTypes[0];
   if (renderType instanceof Function) {
     const resourceTypeValue = getResourceTypeValueFor(object.type);
     if (hasValue(resourceTypeValue)) {
       //added Steli -> if 'item', replace with dc.type-value
       var resourceTypeValueString = `${resourceTypeValue.toLowerCase()}`;
       if(resourceTypeValueString == "item"){
         if(object.firstMetadataValue('dc.type') != 'undefined' && object.firstMetadataValue('dc.type')){
          resourceTypeValueString = object.firstMetadataValue('dc.type');
         }
       }
       this._typeMessage = `${resourceTypeValueString}.listelement.badge`;
       //
       //this._typeMessage = `${resourceTypeValue.toLowerCase()}.listelement.badge`;  //ORG
     } else {
       //added Steli -> if 'item', replace with dc.type-value
       var renderTypeValueString = `${renderType.name.toLowerCase()}`;
       if(renderTypeValueString == "item"){
         if(object.firstMetadataValue('dc.type') != 'undefined' && object.firstMetadataValue('dc.type')){
          renderTypeValueString = object.firstMetadataValue('dc.type');
         }
       }
       this._typeMessage = `${renderTypeValueString}.listelement.badge`;
       //
       //this._typeMessage = `${renderType.name.toLowerCase()}.listelement.badge`;  //ORG
     }
   } else {
      //added Steli -> if 'item', replace with dc.type-value
      var typeString = `${renderType.toLowerCase()}`;
      if(typeString == "item"){
        if(object.firstMetadataValue('dc.type') != 'undefined' && object.firstMetadataValue('dc.type')){
          typeString = object.firstMetadataValue('dc.type');
        }
      }
      this._typeMessage = `${typeString}.listelement.badge`;
      //
     //this._typeMessage = `${renderType.toLowerCase()}.listelement.badge`; //ORG
   }
 }
}

  get object(): DSpaceObject {
    return this._object;
  }

  get typeMessage(): string {
    return this._typeMessage;
  }
}
