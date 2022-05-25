import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, AlertController, MenuController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-darumas-gral',
  templateUrl: './darumas-gral.page.html',
  styleUrls: ['./darumas-gral.page.scss'],
})
export class DarumasGralPage implements OnInit {
  public userID: number;
  darumas: any;
  toki: string;
  public loader: any;
  public usuario;
  public noDarumaFlag;
  public darumasIncompletos: boolean;

  public url = "./../../../assets/imgs/colores/";

  constructor(
    public router: Router,
    public ds: DarumaService,
    public loadingCtrl: LoadingController,
    private localNotifications: LocalNotifications,
    private plt: Platform,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController
  ) {
    
  }

  scheduleNotification(){
    // console.log("EntraNoti");
    if (this.darumasIncompletos == true) {
      // console.log("DarumasIncompletos", this.darumasIncompletos);
      this.localNotifications.hasPermission()
      .then(permiso => {
        //verifica permiso para notificaciones
        // console.log("TienePermisoNotif", permiso);
        if (permiso == true) {
          // tiene permiso
          // console.log("Programa Notificaciones");
          this.localNotifications.schedule({
            id: 1,
            title: 'Tienes Darumas activos',
            text: '\u00A1Cumple tus prop\u00F3sitos!',
            // trigger: { at: new Date(new Date().getTime() + 40 * 1000) },
            trigger: { every: ELocalNotificationTriggerUnit.WEEK },
            data: {myData: this.usuario},
            led: { color: '#FF005E', on: 500, off: 500 } ,
            icon: 'res://ic_action_name.png',
            smallIcon: 'res://ic_stat_name'
          });
        } else {
          // no tiene permiso Notificaciones
          this.localNotifications.requestPermission( )
          .then(permisoRquest => {
            //pide permiso Notificaciones
            console.log("NotifRequest", permisoRquest);
          }).catch((e: any) => console.log('Error requestPermissionNotif', e));
        }
      }).catch((e: any) => console.log('Error permisoNotif', e));
    }
  }

  verficaNotiYBorra(){
    //verifica si ya hay una notificacion
    this.localNotifications.getAll()
    .then(obtnNoti => {
      if (obtnNoti.length == 0) {
        // console.log("obtnNoti: nada");
      } else {
        // console.log("obtnNoti", obtnNoti);
        // console.log("obtnNotiData", JSON.parse(obtnNoti["0"].data)["myData"]);
        this.localNotifications.cancelAll()
        .then(cancelNoti => {
          // console.log("cancelNoti",cancelNoti);
          this.localNotifications.clearAll()
          .then(clearNoti => {
            // console.log("limpiaNoti", clearNoti);
          }).catch((e: any) => console.log('Error clearAllNotif', e));
        }).catch((e: any) => console.log('Error cancelAllNotif', e));
      }
    }).catch((e: any) => console.log('Error getAllNotif', e));
  }

  async goToDetalle(qrcode, token){
    //peticion de daruma y mandarlo
    this.loader = await this.loadingCtrl.create();
    await this.loader.present();
    let daruma = {
      "daruma" : {"qrcode" : qrcode}
    }

    this.ds.getDarumasDetalle(daruma, token)
    .subscribe(detalle =>{
      detalle["result"].forEach(element => {
        // console.log("detalle1", element);
        let navigationExtras: NavigationExtras = {
          state: {
            daruma: element,
            token: this.toki
          }
        }
        this.router.navigate(['detalle-daruma'],navigationExtras);
      })
    }, error => {
      console.log("Error getDarumasDetalle", error);
    })
  }

  goToScanQr(){
    this.router.navigate(['add-daruma-qr']);
  }

  async cargaDarumasLst(){
    this.loader = await this.loadingCtrl.create();
    await this.loader.present();
    // mandar llamar servicio para traer darumas
    //se deshabilita llamar al token
    // this.ds.getToken().then((token)=>{
    //   this.toki = token
      this.ds.getDarumas(this.toki).subscribe(daruma =>{
        // console.log("EntraGetDarumas", daruma );
        if (daruma["result"].length == 0) {
          this.noDarumaFlag = true;
        }
        daruma["result"].forEach(element => {
          // console.log("qr ",element);
          // elige color daruma
          this.darumas.push(element)
          if (element["estado"] == 6 && this.darumasIncompletos == false) {
            this.darumasIncompletos = true;
            this.scheduleNotification();
          }
        });
      }, error => {
        this.loader.dismiss();
        console.log("Error getDarumas", error);
        this.doAlertErrorCarga("¡Lo sentimos!", "Haz iniciado sesión en otro dispositivo.", 
        "Inicia sesión nuevamente y ¡Cumple tus metas!")
      }, () => {
        this.loader.dismiss();
      })
    // }).catch((e: any) => console.log('Error getToken', e));
  }

  async obtieneUsuario(){
    this.loader = await this.loadingCtrl.create();
    this.ds.getUser().then((user)=>{
      this.usuario = user
      console.log("usuario ", this.usuario);
      
    }).catch((e: any) => console.log('Error getUser', e));
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

  async doAlertErrorCarga(titulo, texto, mensaje) {
    let alert = this.alertCtrl.create({
      header: titulo,
      subHeader: texto,
      message: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //Borra Token y redirige a inicio
            this.ds.borraToken().then((token)=>{
              // console.log("tokenBorrado ");
              this.router.navigate(['inicio-login']);        
            }).catch((e: any) => console.log('Error borraToken', e));
          }
        }
      ]
    });

    (await alert).present();
  }

  alertOfNotification(){
    this.plt.ready().then (() =>{
      this.localNotifications.on('trigger').subscribe (ras =>{
        //let user = ras.data ? ras.data.myData : '';
        // console.log("msgOC",user);
        this.doAlert(ras.title, "", ras.text);
      }, error => {
        // console.log("Error triggerNotifCons", error);
      });
    }).catch((e: any) => console.log('Error pltReadycons', e));

  }

  verificaToken() {
    //verificar si hay un token para inicio de sesión
    this.ds.getToken().then( (token)=>{
      
      if (token == null) {
        console.log("No Token");
        this.router.navigate(['inicio-login']);
      } else {
        console.log("hayTokenIni: ", token);
        this.toki = token
        this.darumas = [];
        this.menuCtrl.isEnabled().then(res =>{
          // this.verificaToken();
          if (res == false) {
             this.menuCtrl.enable(true)
           }
          this.cargaDarumasLst();
         }).catch((e: any) => console.log('Error menuCtrlDGral', e));
        
      }
    }).catch((e: any) => console.log('Error getToken', e));
  }

  ionViewWillEnter(){
    this.obtieneUsuario();
    this.noDarumaFlag = false;
    this.darumasIncompletos = false;
    this.verficaNotiYBorra();

    
  }

  ionViewDidEnter(){
    this.verificaToken();
    // console.log("tokiiiiii ", this.toki);
    // if (this.toki != null) {
    //   this.darumas = [];
    //   this.cargaDarumasLst();
    // }
  }

  async ionViewDidLeave(){
    await this.loader.dismiss();
  }

  toggleMenu(){
    
    this.menuCtrl.toggle();
  }

  ngOnInit() {

  }

}
