import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  private token;

  constructor(public ds: DarumaService,
    public router: Router,
    public alertCtrl: AlertController) { }

  goToCambioPass(){
    let navigationExtras: NavigationExtras = {
      state: {
        token: this.token
      }
    }
    this.router.navigate(['cambio-pass'], navigationExtras);
  }

  eliminarCuenta(){
    let sub = "Est\u00E1s a punto de eliminar tu cuenta"
    let mensaje = "¡Si continuas perder\u00E1s todos tus darumas y prop\u00F3sitos!"
    this.doAlertConfirm("¡¡Advertencia!!", sub, mensaje)
  }

  obtieneToken(){
    this.ds.getToken().then((token)=>{
      this.token = token
      console.log("token", this.token);
      
    }).catch((e: any) => console.log('Error getToken', e));
  }

  async doAlert(titulo, sub, texto) {
    let alert = this.alertCtrl.create({
      header: titulo,
      subHeader: sub,
      message: texto,
      backdropDismiss: false,
      buttons: ['Ok']
      
    });

    (await alert).present();
  }

  async doAlertConfirm(titulo, texto, mensaje) {
    let alert = this.alertCtrl.create({
      header: titulo,
      subHeader: texto,
      message: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Regresar',
          handler: () => {
            console.log("Regresa!!!");
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log("token Eliminar cuenta", this.token);

            this.ds.eliminarCuenta(this.token).subscribe(res =>{
              console.log("cuenta Eliminada");
            }, error => {
              console.log("Error eliminarCuenta", error);
            })
            //Borra Token y redirige a inicio
            this.ds.borraToken().then((token)=>{
              console.log("tokenBorrado ");
              this.router.navigate(['inicio-login']);        
            }).catch((e: any) => console.log('Error borraToken', e));
          }
        }
      ]
    });

    (await alert).present();
  }

  ngOnInit() {
    // console.log("obtiene token");
    this.obtieneToken();
  }

}
