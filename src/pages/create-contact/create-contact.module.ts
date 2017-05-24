import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateContact } from './create-contact';

@NgModule({
  declarations: [
    CreateContact,
  ],
  imports: [
    IonicPageModule.forChild(CreateContact),
  ],
  exports: [
    CreateContact
  ]
})
export class CreateContactModule {}
