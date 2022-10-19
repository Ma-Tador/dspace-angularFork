import { Component, Input } from '@angular/core';

/**
 * This component renders only first 3 lines of any content inside this wrapper. Click content to see all content
 * The wrapper prints a label before the content (if available).
 * @Author Steli
 */

@Component({
  selector: 'ds-truncatable-metadata-field-wrapper',
  templateUrl: './truncatable-metadata-field-wrapper.component.html',
  styleUrls: ['./truncatable-metadata-field-wrapper.component.scss']
})
export class TruncatableMetadataFieldWrapperComponent{

  /**
   * The label (title) for the content
   */
   @Input() label: string;

   @Input() hideIfNoTextContent = true;

   id = 0;

   static latestId: number;


   constructor(){
     this.id = TruncatableMetadataFieldWrapperComponent.incrementId();
   }

   static incrementId(){
     if(!TruncatableMetadataFieldWrapperComponent.latestId){
      TruncatableMetadataFieldWrapperComponent.latestId = 1;
     }else{
      TruncatableMetadataFieldWrapperComponent.latestId++;
     }
     return TruncatableMetadataFieldWrapperComponent.latestId;
   }

}
