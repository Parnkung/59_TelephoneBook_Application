import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular'; 
import { Database } from '../../providers/database';

/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class Details {
	public contact: any = {};
	constructor(public navCtrl: NavController
			, public navParams: NavParams
			, private viewCtrl: ViewController
			, private database: Database
			, public alerCtrl: AlertController) {
  }
	//show only selected contact
  ionViewDidLoad() {
    let editContact = this.navParams.get('contact');
		this.contact = editContact;
  }
	//go back to previos page
  	goBack(){
		this.navCtrl.pop();
	}
	//alert before save change. 
	save(){
		let confirm = this.alerCtrl.create({
      title: 'Update this contact',
      message: 'Are you sure you want to update this contact?',
      buttons: [
        {
			//if clicks 'OK', data will be updated to database.
          text: 'OK',
          handler: () => {
			this.database.update(this.contact)
                .catch(console.error.bind(console));
			this.navCtrl.pop();
          }
        },
        {
			//if clicks 'Cancel', nothing happen
          text: 'Cancel',
          handler: () => {}
        }
      ]
    });
    confirm.present()
	}
	//confirm alert before delete contact 
	deleteContact() {
		let confirm = this.alerCtrl.create({
      title: 'Delete this contact?',
      message: 'Are you sure you want to delete this contact?',
      buttons: [
        {
			//if clicks 'Yes', data will be removed.
          text: 'Yes',
          handler: () => {
			 this.database.delete(this.contact)
				.catch(console.error.bind(console));
			this.dismiss();
          }
        },
        {
			//if clicks 'No', nothing happen.
          text: 'No',
          handler: () => {}
        }
      ]
    });
    confirm.present()
    }

    dismiss() {
        this.viewCtrl.dismiss(this.contact);
    }

}
