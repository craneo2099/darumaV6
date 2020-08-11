import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { PasswordValidatorService } from 'src/app/providers/password-validator/password-validator.service';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.page.html',
  styleUrls: ['./cambio-pass.page.scss'],
})
export class CambioPassPage implements OnInit {
  public cambioPassForm: FormGroup;
  matching_passwords_group: FormGroup;
  private usuario;
  private token;
  public loader: any;
  public data: any;
  public isKeyboardHide: boolean = true;
  
  constructor(
  public ds: DarumaService,
  public alertCtrl: AlertController,
  private ngZone: NgZone,
  public loadingCtrl: LoadingController,
  public formBuilder: FormBuilder,
  public route: ActivatedRoute,
  public router: Router
  ) { 
    // this.token =     navParams.get("token");
    this.route.queryParams.subscribe(params => {
      this.data = this.router.getCurrentNavigation().extras.state;
      console.log("paramsDETAIL", this.data.token);
      this.token =        this.data.token;
    });
    this.matching_passwords_group = new FormGroup({
      passwordN: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.maxLength(20)
      ])),
      passwordNC: new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
      return PasswordValidatorService.areEqual(formGroup);
    });
    this.cambioPassForm = this.formBuilder.group({
      passwordO: new FormControl('', Validators.compose([
        Validators.required
      ])),
      matching_passwords: this.matching_passwords_group
    });
  }

  async cambiarPass(){
    this.loader = await this.loadingCtrl.create();
    await this.loader.present();
    // console.log("Cambio contraseña");
    if (this.cambioPassForm.get("passwordO").hasError('required') ||
    this.cambioPassForm.get('matching_passwords').get('passwordN').hasError('required') ||
    this.cambioPassForm.get('matching_passwords').get('passwordNC').hasError('required')) {
      // console.log("Completa todos los campos!!!");
      var texto = "Completa todos los campos!!!"
      await this.loader.dismiss();
      this.doAlert("Error!", texto, "")
    } else {
      if (this.cambioPassForm.get('passwordO').errors &&
      this.cambioPassForm.get('passwordO').dirty) {
        await this.loader.dismiss();
        this.doAlert("Error!!!","Escribe el correo correctamente", "")
      }
      else if (this.cambioPassForm.get('matching_passwords').get('passwordN').hasError('minlength')) {
        await this.loader.dismiss();
        this.doAlert("Error!!!", "Contrase\u00F1a: "+this.validation_messages.passwordN[1]["message"], "")
      }
      else if (this.cambioPassForm.get('matching_passwords').get('passwordN').hasError('maxlength')) {
        await this.loader.dismiss();
        this.doAlert("Error!!!", "Contrase\u00F1a: "+this.validation_messages.passwordN[2]["message"], "")
      }
      else if (this.cambioPassForm.get('matching_passwords').hasError("areEqual")) {
        await this.loader.dismiss();
        this.doAlert("Error!!!", "Contrase\u00F1a: "+this.validation_messages.matching_passwords[0]["message"], "")
      }
      else {
        if (this.cambioPassForm.value.matching_passwords.passwordN == this.cambioPassForm.value.matching_passwords.passwordNC) {
          // console.log(this.usuario, this.token);
          let sha256O = CryptoJS.SHA256(this.cambioPassForm.value.passwordO)
          let sha256N = CryptoJS.SHA256(this.cambioPassForm.value.matching_passwords.passwordN)

          let datosCambioPass = {
            "usuario" : this.usuario,
            "oldPass" : sha256O.toString(CryptoJS.enc.Hex),
            "newPass" : sha256N.toString(CryptoJS.enc.Hex)
          }
          this.ds.actualizarPass(datosCambioPass, this.token)
          .subscribe(async res =>{
            if (res["response"] == true) {
              // console.log("actualizado", res);
              let sub = "¡Contrase\u00F1a actualizada!"
              let mes = "Inicia sesi\u00F3n nuevamente"
              await this.loader.dismiss();
              this.doAlertConfirm("Exito!",sub, mes)
            } else {
              // console.log("pass Incorrecto", res);
              await this.loader.dismiss();
              this.doAlert("Error!!!", "Contrase\u00F1a incorrecta","")
            }
          }, error => {
            console.error("Error actualizarPass", error);
          })
        }
      }
    }
  }

  validation_messages = {
    'passwordN': [
      { type: 'required', message: 'Campo Requerido' },
      { type: 'minlength', message: 'M\u00EDnimo 5 caracteres' },
      { type: 'maxlength', message: 'M\u00E1ximo 20 caracteres' }
    ],
    'passwordNC': [
      { type: 'required', message: 'Campo Requerido' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'No coincide la contrase\u00F1a' }
    ],
    'passwordO': [
      { type: 'required', message: 'Campo Requerido' }
    ]
  };

  obtieneUsuario(){
    this.ds.getUser().then((user)=>{
      this.usuario = user
    }).catch((e: any) => console.log('Error getUser', e));
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

  async doAlertConfirm(titulo, sub, texto) {
    let alert = this.alertCtrl.create({
      header: titulo,
      subHeader: sub,
      message: texto,
      backdropDismiss: false,
      buttons: [
        {
        text: 'Ok',
        handler: () => {
          // this.navCtrl.setRoot(InicioLoginPage)
          this.router.navigate(['inicio-login']);
        }
      }]
    });

    (await alert).present();
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
    this.obtieneUsuario();
  }

}
