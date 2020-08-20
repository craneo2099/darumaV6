import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, AlertController, MenuController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
import { Router, NavigationExtras } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';

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

  constructor(
    public router: Router,
    public keyboard: Keyboard,
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
          console.log("Programa Notificaciones");
          this.localNotifications.schedule({
            id: 1,
            title: 'Tienes Darumas activos',
            text: '\u00A1Cumple tus prop\u00F3sitos!',
            // trigger: { at: new Date(new Date().getTime() + 40 * 1000) },
            trigger: { every: ELocalNotificationTriggerUnit.WEEK },
            data: {myData: this.usuario},
            led: { color: '#FF005E', on: 500, off: 500 } ,
            icon: 'res://ic_stat_name.png',
            smallIcon: 'res://ic_no'
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
        console.log("detalle1", element);
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
    this.ds.getToken().then((token)=>{
      this.toki = token
      this.ds.getDarumas(token).subscribe(daruma =>{
        console.log("EntraGetDarumas", daruma );
        if (daruma["result"].length == 0) {
          this.noDarumaFlag = true;
        }
        daruma["result"].forEach(element => {
          console.log("qr ",element);
          this.darumas.push(element)
          if (element["estado"] == 6 && this.darumasIncompletos == false) {
            this.darumasIncompletos = true;
            this.scheduleNotification();
          }
        });
      }, error => {
        console.log("Error getDarumas", error);
      }, () => {
        this.loader.dismiss();
      })
    }).catch((e: any) => console.log('Error getToken', e));
  }

  obtieneUsuario(){
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

  ionViewWillEnter(){
    this.obtieneUsuario();
    this.noDarumaFlag = false;
    this.darumasIncompletos = false;
    this.verficaNotiYBorra();

    
  }

  ionViewDidEnter(){
    this.darumas = [];
    this.cargaDarumasLst();
  }

  async ionViewDidLeave(){
    await this.loader.dismiss();
  }

  toggleMenu(){
    
    this.menuCtrl.toggle();
  }

  ngOnInit() {
    this.menuCtrl.isEnabled().then(res =>{
      if (res == false) {
        this.menuCtrl.enable(true)
      }
    })
  }

}
