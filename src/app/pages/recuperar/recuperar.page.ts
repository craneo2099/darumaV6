import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  public recuperarForm: FormGroup;
  public imgUrl;
  public tokenR;
  public loader: any;
  public isKeyboardHide = true;

  constructor(
    public router: Router,
    private ngZone: NgZone,
    public ds: DarumaService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder
  ) { 
    this.recuperarForm = this.formBuilder.group({
      correo: ['', Validators.compose([Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ])],
      captcha: ['', Validators.compose([Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])]
    });
  }

  async enviarMail(){
    this.loader = await this.loadingCtrl.create();
    await this.loader.present();
    console.log("correo",this.recuperarForm.value.correo);

    if (this.recuperarForm.get('correo').hasError('required') ||
      this.recuperarForm.get('captcha').hasError('required')) {
      await this.loader.dismiss();
      this.doAlert("Error!!!","Campo requerido")
    } else {
      if (this.recuperarForm.get('correo').errors &&
        this.recuperarForm.get('correo').dirty &&
        this.recuperarForm.get('correo').hasError('pattern')) {
         console.log("No entra");
         await this.loader.dismiss();
         this.doAlert("Error!!!","Escribe el correo correctamente")
      }
      else if (this.recuperarForm.get('captcha').hasError('minlength')){
        await this.loader.dismiss();
        this.doAlert("Error!!!", "Captcha: "+this.validation_messages.captcha[1]["message"])
      }
      else if (this.recuperarForm.get('captcha').hasError('maxlength')){
        await this.loader.dismiss();
        this.doAlert("Error!!!", "Captcha: "+this.validation_messages.captcha[2]["message"])
      }
      else {
        console.log("Entroooo");
        let infoCaptcha = {
          token: this.tokenR,
          word: this.recuperarForm.value.captcha
        }
        // requerirPass
        this.ds.requerirPass(this.recuperarForm.value.correo, infoCaptcha)
        .subscribe(async res2 =>{
          console.log("res2", res2);
          await this.loader.dismiss();
          this.doAlertConfirm("Info","Se ha enviado el correo, Sigue los pasos para reestablecer tu contraseña")
        }, async error => {
          console.log("error al registrar", error);
          await this.loader.dismiss();
          this.doAlert("Error!!!","Captcha incorrecto")
        })
      }
    }
  }

  obtnerCaptchaTs(){
    this.ds.obtenerCaptcha()
    .subscribe(res =>{
      this.imgUrl = res["result"]["captcha"];
      this.tokenR = res["result"]["token"];
    }, error => {
      console.log("error obtener Captcha",error);
    })
  }

  validation_messages = {
    'captcha': [
      { type: 'required', message: 'Campo Requerido' },
      { type: 'minlength', message: 'M\u00EDnimo 6 caracteres' },
      { type: 'maxlength', message: 'M\u00E1ximo 6 caracteres' }
    ]
  };

  async doAlert(titulo, texto) {
    let alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: texto,
      backdropDismiss: false,
      buttons: ['Ok']
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
          this.router.navigate(['inicio-login'])
        }
      }]
    });

    await alert.present();
  }

  ionViewWillEnter(){
    this.obtnerCaptchaTs();

    window.addEventListener('keyboardWillHide', () => {
      this.ngZone.run(() => {
        this.isKeyboardHide = true;
      });
    });
  
    window.addEventListener('keyboardWillShow', (e) => {
      this.ngZone.run(() => {
        this.isKeyboardHide = false;
      });
    });
  }
  
  ngOnInit() {
  }

}
