import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AllContact} from '../all-contact/all-contact';
import { CreateContact} from '../create-contact/create-contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public modalCtrl: ModalController) {
  }
	//function for go to another page
	openAll(){
		//go to all-contact page
		let modal = this.modalCtrl.create(AllContact); 
		modal.present();
	}
	addContact(){
		//go to create-contact page
        let modal = this.modalCtrl.create(CreateContact);
        modal.present();
	}
}
