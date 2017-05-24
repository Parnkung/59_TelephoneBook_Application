import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllContact } from './all-contact';

@NgModule({
  declarations: [
    AllContact,
  ],
  imports: [
    IonicPageModule.forChild(AllContact),
  ],
  exports: [
    AllContact
  ]
})
export class AllContactModule {}
