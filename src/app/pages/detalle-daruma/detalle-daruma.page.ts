import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-daruma',
  templateUrl: './detalle-daruma.page.html',
  styleUrls: ['./detalle-daruma.page.scss'],
})
export class DetalleDarumaPage implements OnInit {
  public darumaId: number;
  public proposito:   number;
  public estado: number;
  public nombre: string;
  public fechaIni: any;
  public fechaFin: any;
  public qrCode: number;
  public token: string;
  public isDisabled = false;
  public darumas: any;
  public loader: any;
  public data: any;
  public color;
  public imgDaruma;
  public altImg;
  public imgDaruma2: string;
  public altImg2: string;

  constructor(
    public ds: DarumaService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) { 
      this.route.queryParams.subscribe(params => {
        this.data = this.router.getCurrentNavigation().extras.state;
        console.log("paramsDETAIL", this.data.daruma);
        this.nombre =       this.data.daruma["nombre"];     
        this.proposito =    this.data.daruma["descripcion"];
        this.fechaIni =     this.data.daruma["fechaInicio"];
        this.fechaFin =     this.data.daruma["fechaCompletado"];
        this.estado =       this.data.daruma["estado"];
        this.qrCode =       this.data.daruma["qrcode"];
        this.token =        this.data.token;
        this.color =        this.data.daruma["cveColor"];
        if (this.estado == 8) {
          this.isDisabled = true;
        }
      });

      this.darumas = []
  }

  cambiarEstado(){
    console.log("CambiarEstadoAA", this.estado);
    let sub = "¿Haz cumplido tu proposito?"
    let mensaje = "Si cambias a \"Completado\" tu Daruma ser\u00E1 finalizado!"
    if (this.estado == 8) {
      this.doAlertConfirm("¡Alerta!",sub, mensaje)
      this.fechaFin = Date.now();
    }
    if (this.estado == null) {
      console.log("sin estado");
      this.estado = 6;
      console.log("estadoSE ", this.estado);
      this.doAlert("¡Atención!","Selecciona un estatus para tu daruma","");
    }
  }

  cancela(){
    console.log("Regresa!!!");
    this.estado = 6;
  }

  async doAlertConfirm(titulo, texto, mensaje) {
    let alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: texto,
      message: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Regresar',
          handler: () => {
          this.cancela();  
            
          }
        },
        {
          text: 'Ok',
          handler: async () => {
            this.loader = await this.loadingCtrl.create();
            await this.loader.present();
            this.ds.completarDaruma(this.qrCode, this.token)
            .subscribe( res => {
              // console.log("completadoo", res);
              // console.log("Estado ", this.estado);
              this.isDisabled = true;

            }, error => {
              console.log("Error completarDaruma", error);
            }, async () =>{
              await this.loader.dismiss();
              this.doAlert("\u00A1Felicidades!",
              "Lo haz conseguido", "\u00A1El Daruma est\u00E1 terminado!")
            })
          }
        }
    ]
    });
    await alert.present();
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

  ngOnInit() {
    let url = "./../../../assets/imgs/colores/";
      console.log("integer ",this.estado);
      
      if (this.color == "AZ") {
        this.imgDaruma = url+"Darumas_azul_2"+".webp"
        this.altImg = "Darumas_azul_2";
        this.imgDaruma2 = url+"Darumas_azul_3"+".webp"
        this.altImg2 = "Darumas_azul_3";
      } else if (this.color == "BL"){
        this.imgDaruma = url+"Darumas_blanco_2"+".webp"
        this.altImg = "Darumas_blanco_2";
        this.imgDaruma2 = url+"Darumas_blanco_3"+".webp"
        this.altImg2 = "Darumas_blanco_3";
      } else if (this.color == "DO"){
        this.imgDaruma = url+"Darumas_dorado_2"+".webp"
        this.altImg = "Darumas_dorado_2";
        this.imgDaruma2 = url+"Darumas_dorado_3"+".webp"
        this.altImg2 = "Darumas_dorado_3";
      } else if (this.color == "NA"){
        this.imgDaruma = url+"Darumas_naranja_2"+".webp"
        this.altImg = "Darumas_naranja_2";
        this.imgDaruma2 = url+"Darumas_naranja_3"+".webp"
        this.altImg2 = "Darumas_naranja_3";
      } else if (this.color == "NE"){
        this.imgDaruma = url+"Darumas_negro_2"+".webp"
        this.altImg = "Darumas_negro_2";
        this.imgDaruma2 = url+"Darumas_negro_3"+".webp"
        this.altImg2 = "Darumas_negro_3";
      } else if (this.color == "RS"){
        this.imgDaruma = url+"Darumas_rosa_2"+".webp"
        this.altImg = "Darumas_rosa_2";
        this.imgDaruma2 = url+"Darumas_rosa_3"+".webp"
        this.altImg2 = "Darumas_rosa_3";
      } else if (this.color == "VE"){
        this.imgDaruma = url+"Darumas_verde_2"+".webp"
        this.altImg = "Darumas_verde_2";
        this.imgDaruma2 = url+"Darumas_verde_3"+".webp"
        this.altImg2 = "Darumas_verde_3";
      } else if (this.color == "VI"){
        this.imgDaruma = url+"Darumas_lila_2"+".webp"
        this.altImg = "Darumas_lila_2";
        this.imgDaruma2 = url+"Darumas_lila_3"+".webp"
        this.altImg2 = "Darumas_lila_3";
      } else {
        this.imgDaruma = url+"Darumas_rojo_2"+".webp"
        this.altImg = "Darumas_rojo_2";
        this.imgDaruma2 = url+"Darumas_rojo_3"+".webp"
        this.altImg = "Darumas_rojo_3";
      }
      //     if (this.color == "AZ") {
      //   this.imgDaruma2 = url+"Darumas_azul_3"+".webp"
      //   this.altImg2 = "Darumas_azul_3";
      // } else if (this.color == "BL"){
      //   this.imgDaruma2 = url+"Darumas_blanco_3"+".webp"
      //   this.altImg2 = "Darumas_blanco_3";
      // } else if (this.color == "DO"){
      //   this.imgDaruma2 = url+"Darumas_dorado_3"+".webp"
      //   this.altImg2 = "Darumas_dorado_3";
      // } else if (this.color == "NA"){
      //   this.imgDaruma2 = url+"Darumas_naranja_3"+".webp"
      //   this.altImg2 = "Darumas_naranja_3";
      // } else if (this.color == "NE"){
      //   this.imgDaruma2 = url+"Darumas_negro_3"+".webp"
      //   this.altImg2 = "Darumas_negro_3";
      // } else if (this.color == "RS"){
      //   this.imgDaruma2 = url+"Darumas_rosa_3"+".webp"
      //   this.altImg2 = "Darumas_rosa_3";
      // } else if (this.color == "VE"){
      //   this.imgDaruma2 = url+"Darumas_verde_3"+".webp"
      //   this.altImg2 = "Darumas_verde_3";
      // } else if (this.color == "VI"){
      //   this.imgDaruma2 = url+"Darumas_lila_3"+".webp"
      //   this.altImg2 = "Darumas_lila_3";
      // } else {
      //   this.imgDaruma2 = url+"Darumas_rojo_3"+".webp"
      //   this.altImg = "Darumas_rojo_3";
      // }
    
      
  }
    

}
