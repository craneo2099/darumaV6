import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroPage } from './pages/registro/registro.page';
import { InicioLoginPage } from './pages/inicio-login/inicio-login.page';
import { CambioPassPage } from './pages/cambio-pass/cambio-pass.page';
import { AjustesPage } from './pages/ajustes/ajustes.page';
import { RecuperarPage } from './pages/recuperar/recuperar.page';
import { DetalleDarumaPage } from './pages/detalle-daruma/detalle-daruma.page';
import { AcercaPage } from './pages/acerca/acerca.page';
import { FormularioDarumaPage } from './pages/formulario-daruma/formulario-daruma.page';
import { DarumasGralPage } from './pages/darumas-gral/darumas-gral.page';
import { AddDarumaQrPage } from './pages/add-daruma-qr/add-daruma-qr.page';
import { IonicStorageModule } from '@ionic/storage';
import { DarumaService } from './providers/daruma-service/daruma.service';
import { PasswordValidatorService } from './providers/password-validator/password-validator.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MenuComponent } from './components/menu/menu.component';
import { Keyboard } from '@ionic-native/keyboard/ngx';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent

  ],
  entryComponents: [
    MenuComponent

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: "darumaBDM"
    }),
    AppRoutingModule
    
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    Camera,
    QRScanner,
    DarumaService,
    InAppBrowser,
    Keyboard,
    PasswordValidatorService,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
