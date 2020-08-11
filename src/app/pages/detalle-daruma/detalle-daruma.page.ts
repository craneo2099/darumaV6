import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
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
  public isEnabled = false;
  public darumas: any;
  public loader: any;
  public data: any;

  constructor(
    // public navCtrl: NavController,
    // public navParams: NavParams,
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
        if (this.estado == 8) {
          this.isEnabled = true;
        }
      });

      this.darumas = []
  }

  cambiarEstado(){
    console.log("CambiarEstadoAA", this.estado);
    let sub = "¿Haz cumplido tu proposito?"
    let mensaje = "Si cambias a \"Completado\" tu Daruma ser\u00E1 finalizado!"
    if (this.estado != 6) {
      this.doAlertConfirm("Alerta!",sub, mensaje)
      this.fechaFin = Date.now();
    }
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
            console.log("Regresa!!!");
            this.estado = 6;
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
              this.isEnabled = true;

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
  }

}
