import { Component, OnInit, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, MenuController, 
  LoadingController, 
  Platform} from '@ionic/angular';
import { LoginInt } from '../../Interfaces/login'
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
import { Storage } from '@ionic/storage';
import { Router} from '@angular/router';
import { LogueadoGuard } from 'src/app/logueado.guard';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inicio-login',
  templateUrl: './inicio-login.page.html',
  styleUrls: ['./inicio-login.page.scss'],
})
export class InicioLoginPage implements OnInit {
  public loginForm: FormGroup;
  private datosLogin: LoginInt;
  public token: string;
  public isKeyboardHide = true;

  minLength = 5;
  public loader: any;
  subscription: any;

  constructor(public router: Router,
    public ds: DarumaService,
    private ngZone: NgZone,
    public formBuilder: FormBuilder,    
    public alertCtrl: AlertController,
    public storage: Storage,
    public datePipe: DatePipe,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController
    ,public platform: Platform
    , public logGuard: LogueadoGuard
    ) {
      
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
        ])
      ],
        password: ['', Validators.compose([
          Validators.required,
          // Validators.minLength(4)
        ])]
      })
      //this.storage.remove('tokenS')
      this.menuCtrl.enable(false);
      this.verificaToken();
     }

  ngOnInit() {
    
  }

  async logForm(){
    
    this.loader = await this.loadingCtrl.create();
    if (this.loginForm.get('email').hasError('required') || this.loginForm.get('password').hasError('required')) {
      // console.log("campo nulo");
      let error="Error!"
      let texto="Escribe tu Usuario (e-mail) y/o Password";
      this.doAlert(error, texto);
    } else {
      //console.log("datos completos");
      if (this.loginForm.get('email').errors &&
      this.loginForm.get('email').dirty &&
      this.loginForm.get('email').hasError('pattern')) {
      //  console.log("No entra");
       this.doAlert("Error!!!","Escribe el correo correctamente")
      } else {
        this.loader.present();
        let z = this.datePipe.transform(new Date(), 'Z')
        // console.log("zeeetaa", z);

        let sha256 = CryptoJS.SHA256(this.loginForm.value.password)
        // comentario
        // sha256.toString(CryptoJS.enc.Base64)
        // console.log("crypto",sha256.toString(CryptoJS.enc.Hex));
        //////////
        this.datosLogin = {
          usuario: this.loginForm.value.email,
          pass: sha256.toString(CryptoJS.enc.Hex),
          zona: z
        }
        this.ds.doLogin(this.datosLogin)
        .subscribe(data => {
          // console.log("data InLog.ts",data);
          if (data["response"]==false) {
            // console.log("datos Incorrectos");
            let error="Error!!!";
            // this.doAlert(error, data["message"])
            this.loader.dismiss();
            this.doAlert(error, "Usuario o contrase\u00F1a incorrecto")
          } else {
            this.storage.set('tokenS', data["result"]);
            this.storage.set('userS', this.loginForm.value.email)
            // this.logGuard.canActivate( , data["response"]);
            this.router.navigate(['darumas-gral']);
            // RouterModule.forRoot([
            //   { path: 'darumas-gral', component: DarumasGralPage } 
            // ])
          }
        }, error => {
          // console.log("errooor",error);
          this.loader.dismiss();
          this.doAlert("Error!!","Prueba mas tarde...");
        });
      }
    }
  }

  async doAlert(titulo, texto) {
    let alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: texto,
      backdropDismiss: false,
      buttons: ['Ok']
    });

    await alert.present();
  }

  async goToRegistro() {
    this.loader = await this.loadingCtrl.create();
    await this.loader.present();
    this.router.navigate(['registro']);    
  }

  async goToRecuperar(){
    this.loader = await this.loadingCtrl.create();
    this.loader.present();
    this.router.navigate(['recuperar'])
    
  }

  verificaToken() {
    //verificar si hay un token para inicio de sesión
    this.ds.getToken().then(async (token)=>{
      this.loader = await this.loadingCtrl.create();
      if (token == null) {
        console.log("No Token");
      } else {
        //console.log("tokenIni: ", token);
        this.router.navigate(['darumas-gral']);
      }
    }).catch((e: any) => console.log('Error getToken', e));
  }

  async ionViewDidLeave(){
    await this.loader.dismiss();
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

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(()=>{
        navigator['app'].exitApp();
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
}
