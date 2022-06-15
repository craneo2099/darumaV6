import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
// import { BarcodeScanner, BarcodeScannerOriginal } from '@ionic-native/barcode-scanner';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-daruma-qr',
  templateUrl: './add-daruma-qr.page.html',
  styleUrls: ['./add-daruma-qr.page.scss'],
})
export class AddDarumaQrPage implements OnInit {
  public loader: any;
  public toki: any;
  public data: any;

  constructor(
    public router: Router,
    private barcodeScanner: BarcodeScanner,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public route: ActivatedRoute,
    public ds: DarumaService
  ) { 
    this.route.queryParams.subscribe(params => {
      this.data = this.router.getCurrentNavigation().extras.state;
      // console.log("paramsDETAIL", this.data.token);

      this.toki =        this.data.token;
      
    });
   }

  ionViewWillEnter(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      // console.log("We got a barcode\n" +
      // "Result: " + barcodeData.text + "\n" +
      // "Format: " + barcodeData.format + "\n" +
      // "Cancelled: " + barcodeData.cancelled);
      
      if (barcodeData.cancelled == true) {
        // console.log("cancelado");
        this.goToDarumasGral();
      } else {
        
        if (barcodeData.format == "QR_CODE") {
          // console.log("QR leido");
          this.ds.isQrCodeRegistrado(barcodeData.text, this.toki)
          .subscribe(res => {
            
            if(res["result"] == true){
              let mensaje = "Codigo Aceptado"
              // console.log("existe");
              // console.log("resExiste", res);
              /////////////Inicio////////////////////////
              this.ds.isQrCodeAsignado(barcodeData.text, this.toki)
              .subscribe(res2 =>{
                // console.log("res2", res2);
                // devuelve false cuando no existe el qrcode
                if(res2["result"] == false){
              /////////////Fin/////////////////////////
                  // console.log("no esta usado");
                  //se almacena
                  let nuevoDaruma = {
                    "qrCode": barcodeData.text,
                    "token": this.toki,
                    "color": res2["message"]
                  }
                  this.storage.set("newDAruma", nuevoDaruma)
                  this.presentToast(mensaje);
                  this.goToFormDaruma();
              ///////////////Inicio///////////////////////
                }else{
                  let titulo = "¡Error!"
                  let texto = "El codigo ya ha sido usado"
                  this.doAlert("¡Atención!",texto, "")
                  // quitar comentario
                  // this.navCtrl.setRoot(DarumasGralPage)
                  this.goToDarumasGral();
                }
              }, error => {
                console.log("Error isQrCodeAsignado",error);
              })
              ////////////////Fin////////////////////////

            }else{
              let titulo = "¡Error!"
              let texto = "El codigo es incorrecto"
              this.doAlert("¡Atención!",texto, "")
              // this.navCtrl.setRoot(DarumasGralPage)
              this.goToDarumasGral();
            }
          }, error => {
                console.log("Error isQrCodeRegistrado",error);
          })
        } else {
          // console.log("no es QR");
          this.doAlert("¡Atención!","Escanea un Código QR","");
          this.goToDarumasGral();
        }
      }    
     }).catch(err => {
         console.log('Error scanner', err);
     });
  }

  ngOnInit() {
    
  }


  async doAlert(titulo, sub, mensaje) {
    let alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: sub,
      message: mensaje,
      backdropDismiss: false,
      buttons: ['Ok']
    });
    await alert.present();
  }

  async presentToast(text:string) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });

    await toast.present();
  }

  goToFormDaruma() {
    this.router.navigate(['formulario-daruma']);
  }

  goToDarumasGral() {
    this.router.navigate(['darumas-gral']);
  }
}
