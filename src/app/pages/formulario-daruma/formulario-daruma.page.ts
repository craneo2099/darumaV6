import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-daruma',
  templateUrl: './formulario-daruma.page.html',
  styleUrls: ['./formulario-daruma.page.scss'],
})
export class FormularioDarumaPage implements OnInit {
  public fecha;
  public logdarumaForm: FormGroup;
  public isKeyboardHide = true;
  public imgDaruma;
  public altImg;
  public newDaruma;
  public loader: any;

  constructor(
    private ngZone: NgZone,
    public router: Router,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ds: DarumaService
  ) {
    this.logdarumaForm = this.formBuilder.group({
      proposito: ['', Validators.compose([Validators.required])],
      nombreDaruma: ['', Validators.compose([Validators.required])]
      });
    }

  async logdaruForm(){
    this.loader = await this.loadingCtrl.create();
    await this.loader.present();
    if (this.logdarumaForm.get('proposito').hasError('required') ||
    this.logdarumaForm.get('nombreDaruma').hasError('required')){
      // console.log("vacio");
      let titutlo="Error"
      let texto="Completa todos los campos"
      await this.loader.dismiss();
      this.doAlert(titutlo, texto)
    }else{
      // Sacar token y QR
      // this.ds.getNewDaruma().then((newDaruma)=>{
        // console.log("NewDarumaQr",newDaruma["qrCode"]);
        // console.log("NewDarumatoken",newDaruma["token"]);
        
        this.ds.isAsignaDaruma(this.newDaruma["qrCode"],this.newDaruma["token"])
        .subscribe(asigna =>{
          console.log("asigna", asigna);
          // console.log("newDArumaAntesDe",newDaruma)
          this.ds.doActivaDaruma(this.newDaruma,
            this.logdarumaForm.value.proposito,
            this.logdarumaForm.value.nombreDaruma)
            .subscribe(async resActiva =>{
              console.log("resActiva",resActiva);

              let result = resActiva["result"];
            if (result == 1) {
              await this.loader.dismiss();
              this.doAlertConfirm("¡Exito!",resActiva["message"])
            }else {
              await this.loader.dismiss();
              this.doAlertConfirm("¡¡¡Error!!!",resActiva["message"])
            }
          }, error => {
            console.log("Error doActivaDaruma",error);
          })
        }, error => {
          console.log("Error isAsignaDaruma",error);
        })
      // }).catch((e: any) => console.log('Error is', e));

    }
  }

  async doAlert(titulo, texto) {
    let alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: texto,
      backdropDismiss: false,
      buttons: [
        {
        text: 'Ok',
        handler: () => {
          
        }
      }]
    });

    await alert.present();
  }

  async doAlertConfirm(titulo, texto) {
    let alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: texto,
      backdropDismiss: false,
      buttons: [
        {
        text: 'Ok',
        handler: () => {
          this.router.navigate(['darumas-gral']);
        }
      }]
    });
    await alert.present();
  }

  ionViewWillEnter() {

    window.addEventListener('keyboardWillHide', () => {
      this.ngZone.run(() => {
        this.isKeyboardHide = true;
      });
    // console.log('keyboard will hide', this.isKeyboardHide);
    });

    window.addEventListener('keyboardWillShow', (e) => {
      this.ngZone.run(() => {
        this.isKeyboardHide = false;
      });
      // console.log('keyboard will show with height', this.isKeyboardHide);
    });
  }

  ngOnInit() {
    this.fecha = Date.now();
    // Sacar token y QR
    this.ds.getNewDaruma().then((newDaruma)=>{
      this.newDaruma = newDaruma;
      let url = "./../../../assets/imgs/colores/"
      if (newDaruma["color"] == "AZ") {
        this.imgDaruma = url+"Darumas_azul_1"+".webp"
        this.altImg = "Darumas_azul_1";
      } else if (newDaruma["color"] == "BL"){
        this.imgDaruma = url+"Darumas_blanco_1"+".webp"
        this.altImg = "Darumas_blanco_1";
      } else if (newDaruma["color"] == "DO"){
        this.imgDaruma = url+"Darumas_dorado_1"+".webp"
        this.altImg = "Darumas_dorado_1";
      } else if (newDaruma["color"] == "NA"){
        this.imgDaruma = url+"Darumas_naranja_1"+".webp"
        this.altImg = "Darumas_naranja_1";
      } else if (newDaruma["color"] == "NE"){
        this.imgDaruma = url+"Darumas_negro_1"+".webp"
        this.altImg = "Darumas_negro_1";
      } else if (newDaruma["color"] == "RS"){
        this.imgDaruma = url+"Darumas_rosa_1"+".webp"
        this.altImg = "Darumas_rosa_1";
      } else if (newDaruma["color"] == "VE"){
        this.imgDaruma = url+"Darumas_verde_1"+".webp"
        this.altImg = "Darumas_verde_1";
      } else if (newDaruma["color"] == "VI"){
        this.imgDaruma = url+"Darumas_lila_1"+".webp"
        this.altImg = "Darumas_lila_1";
      } else {
        this.imgDaruma = url+"Darumas_rojo_1"+".webp"
        this.altImg = "Darumas_rojo_1";
      }
    }).catch((e: any) => console.log('getNewDaruma ', e));
  }

  ionViewWillLeave(){
    
  }
  

}
