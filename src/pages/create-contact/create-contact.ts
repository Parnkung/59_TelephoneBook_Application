import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Database }	from '../../providers/database';
/**
 * Generated class for the CreateContact page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-contact',
  templateUrl: 'create-contact.html',
})
export class CreateContact {
    public contact: any = {};

  constructor(public navCtrl: NavController
			, public navParams: NavParams
			, public alerCtrl: AlertController
			, private viewCtrl: ViewController
			, private database: Database
			)
  {}
  //alert to make decision before go back to previous page 
    goBack(){
		let confirm = this.alerCtrl.create({
      title: 'Discart New contact?',
      message: 'Are you sure you want to discart this new contact?',
      buttons: [
        {
			//if clicks 'Yes', go back
          text: 'Yes',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
			//if clicks 'No', stay on current page
          text: 'No',
          handler: () => {
            
          }
        }
      ]
    });
    confirm.present()
	}
	
	//add this contact to database
	saveNew(contact) {      
        this.database.add(this.contact)
                .catch(console.error.bind(console));
        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.contact);
    }

}
