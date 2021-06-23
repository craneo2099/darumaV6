import { Component,  ViewChild, ChangeDetectorRef } from '@angular/core';
import { Platform, IonNav } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InicioLoginPage } from './pages/inicio-login/inicio-login.page';
import { DarumasGralPage } from './pages/darumas-gral/darumas-gral.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild('NAV') nav: IonNav;
  public rootPage: any;
  public pages: Array<{titulo: string, color: string,
    componente: any, icon: string}>
  

  constructor(
    private platform: Platform,
    private statusBar: StatusBar
  ) { this.initializeApp() }

  goToPage(page){
    //console.log(page);
    if (page == InicioLoginPage || page == DarumasGralPage) {
      // Nota: Quita token siempre al cargar inicioPage
      this.nav.setRoot(page);
    }else{
      this.nav.push(page);
      // this.router.navigate(page)
    }
  }
  
  initializeApp() {
    this.platform.ready().then( () => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //prueba modo Dark
      this.comprueba();
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });

  }
  comprueba (){
    // let darkmode = await DarkMode.isDarkModeOn();
    // console.log(darkmode.isDarkModeOn, "obscuro");
  }
}
