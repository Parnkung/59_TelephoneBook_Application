import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Database }	from '../providers/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreateContact} from '../pages/create-contact/create-contact';
import { AllContact} from '../pages/all-contact/all-contact';
import { Details} from '../pages/details/details';

@NgModule({
//declare all pages
  declarations: [
    MyApp,
    HomePage, 
	CreateContact,
	AllContact,
	Details
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
	CreateContact,
	AllContact,
	Details
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	//add database service here 
	Database,
  ]
})
export class AppModule {}
