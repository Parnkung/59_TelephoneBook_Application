import { Component, NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ModalController, ViewController   } from 'ionic-angular';
import { CreateContact} from '../create-contact/create-contact';
import { Database }	from '../../providers/database';
import { Details} from '../details/details';
/**
 * Generated class for the AllContact page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-all-contact',
  templateUrl: 'all-contact.html',
})
export class AllContact {
	private contacts = [];
	public contact: any = {};
   constructor(public navCtrl: NavController
			, public navParams: NavParams
			, public alertCtrl: AlertController
			, private database: Database
			, private platform: Platform
			, private zone: NgZone
			, public modalCtrl: ModalController
			, private viewCtrl: ViewController)
  {}
	//this func: load and display all data for local databse
	ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.database.initDB();
			//getAll() func to retrieve data from database
            this.database.getAll()
                .then(data => {
                    this.zone.run(() => {
						this.contacts = data;
                    });
                })
                .catch(console.error.bind(console));
        });
    }
	//back to previous page
	goBack(){
		this.navCtrl.pop();
	}
	//go to create-contact page
	addContact(){
        let modal = this.modalCtrl.create(CreateContact);
        modal.present();
	}
	//go to detail page
	showDetail(contact){
		let modal = this.modalCtrl.create(Details, {contact: contact });
        modal.present();
	}
	//delete this.contact form database service
	deleteContact(contact) {
		//comfirm alert to make a decision 
		let confirm = this.alertCtrl.create({
      title: 'Delete this contact',
      message: 'Are you sure you want to delete this contact?',
      buttons: [
        {
			//if clicks ok, delete this contact
          text: 'OK',
          handler: () => {
			  //call delete func of database.ts
			 this.database.delete(contact)
				.catch(console.error.bind(console));
			this.dismiss();
          }
        },
        {
			//if clicks cancel, nothing happen
          text: 'Cancel',
          handler: () => {}
        }
      ]
    });
    confirm.present()
    }
	//function of search bar
	//get what user type in search bar	
	getName(str:any) {
		//if no input, show all contacts
		if(str.target.value === ""){
			this.ionViewDidLoad();
		}
		
		// set val to the value of the ev target
		var val = str.target.value;

		// if the value is an empty string don't filter the items
		//if there are any input, it will search and compare that input to any string of each data
		//it will show match contact
		if (val && val.trim() != '') {
			this.contacts = this.contacts.filter((name) => {
				let names : any=name;
			return (names.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
		})
    }
  }
  
showAlert() {
			let alert = this.alertCtrl.create({
				title: 'More about Contact!',
				subTitle: 'You can swipe left for seeing more details or delete',
				buttons: ['OK']
			});
			alert.present();
		}		
      dismiss() {
        this.viewCtrl.dismiss(this.contact);
    }
}
1