import { Component,  ViewChild } from '@angular/core';
import { Platform, IonNav, IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InicioLoginPage } from './pages/inicio-login/inicio-login.page';
import { DarumasGralPage } from './pages/darumas-gral/darumas-gral.page';
import { AddDarumaQrPage } from './pages/add-daruma-qr/add-daruma-qr.page';
import { AcercaPage } from './pages/acerca/acerca.page';
import { AjustesPage } from './pages/ajustes/ajustes.page';
import { Router } from '@angular/router';


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
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
    // , public app: IonApp
  ) {
    // incluido
    // this.initializeApp();

    // this.rootPage = InicioLoginPage;
    // this.pages = [

    //     {titulo: "Mis Darumas", color: "azul", componente: DarumasGralPage, icon: "home"},
    //     {titulo: 'Agregar Daruma', color: "azul", componente: AddDarumaQrPage, icon: 'qr-scanner'},
    //     {titulo: 'Acerca de', color: "azul", componente: AcercaPage, icon: 'information-circle'},
    //     {titulo: "Ajustes", color: "azul", componente: AjustesPage, icon: "settings"},
    //     {titulo: "Salir", color: "rosa3", componente: InicioLoginPage, icon: "log-out"}
    // ];

    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   if(this.platform.is('android')) {
    //     statusBar.styleBlackTranslucent();
    //   } else {
    //     statusBar.styleDefault();
    //   }

    //   splashScreen.hide();

    // });
  }

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
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(this.platform.is('android')) {
        this.statusBar.styleBlackTranslucent();
      } else {
        this.statusBar.styleDefault();
      }

      this.splashScreen.hide();

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
