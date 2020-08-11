import { Injectable } from '@angular/core';
import { QrAsignarInt } from './../../Interfaces/qr-asignar-int';
import { GetDaruDatosInt } from './../../Interfaces/get-daru-datos-int';
import { LoginInt } from './../../Interfaces/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class DarumaService {
  public darumaUrl: string;
  public datosLogin: LoginInt;
  public tok: string;
  datos: GetDaruDatosInt;
  datosAsignar: QrAsignarInt;

  public respuesta: any;

  constructor(public http: HttpClient,
    private storage: Storage) { 
    //console.log('Hello DarumaServiceProvider Provider');
    //produccion
    this.darumaUrl = "https://koinobori-artesanias.com/darumas/public/";
    //Proxy pruebas
    //this.darumaUrl = "/darumaUrl/";
    }

  doLogin(loginData){
    console.log("provider", loginData);
    this.datosLogin = loginData;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": ""
      })
    };

  return this.respuesta = this.http.post(
    this.darumaUrl + "loginApp/login" ,
    this.datosLogin, httpOptions)
    // .retry(3)
    // .catch(err =>{
    //   console.log("errServ",err);
    //   return Observable.of(err);
    // })
  }

  getToken(){
    return this.storage.get('tokenS')
  }
  
  getUser(){
    return this.storage.get('userS')
  }

  getNewDaruma(){
    return this.storage.get('newDAruma')
  }

  getDarumas(token){
    // console.log("tokInGetDar", token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": token
      })
    };

    this.datos = {
      clave: null,
      darumas:null
    }
    return this.http.post(this.darumaUrl + "DarumasWS/getDarumas",
    this.datos, httpOptions)
  }

  getDarumasDetalle(daruma, token){
    console.log("tokInGetDarDet", token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": token
      })
    };
    return this.http.post(this.darumaUrl + "DarumasWS/getDarumas",
    daruma, httpOptions)
  }
  isQrCodeRegistrado(qrCode, token){
    // console.log("isQrCodeRegistrado", qrCode);

    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": token
      })
    };
    this.datosAsignar = {
      "qrCode": qrCode,
    }
    // return this.http.post(this.darumaUrl + "DarumasWS/asignar", this.datosAsignar
     return this.http.get(this.darumaUrl + "QrCodeWS/isQrCodeRegistrado"+"?qrCode"+"="+qrCode
    //return this.http.get(this.darumaUrl + "QrCodeWS/isQrCodeAsignado"+"?qrCode"+"="+qrCode
    ,httpOptions)
  }

  isQrCodeAsignado(qrCode, token){
    // console.log("qrText22", qrCode);

    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": token
      })
    };
    this.datosAsignar = {
      "qrCode": qrCode

    }
    return this.http.get(this.darumaUrl + 'QrCodeWS/isQrCodeAsignado'+'?qrCode'+'='+qrCode
    ,httpOptions)
  }
  
  requerirPass(correo, infoCaptcha){
    // console.log("Correo", correo);
    // console.log("captcha", infoCaptcha);

    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": infoCaptcha["token"]
      })
    };
    return this.http.get(this.darumaUrl + "loginApp/requerirPass?email="+correo+"&word="+infoCaptcha["word"]
    ,httpOptions)
  }

  actualizarPass(datos,token){
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": token
      })
    };
    return this.http.post(this.darumaUrl + "registro/setPass", datos
    ,httpOptions)
  }

  obtenerCaptcha(){
    return this.http.get(this.darumaUrl + "loginApp/getCaptcha")
  }

  doRegistrarUsuario(data, token){
    // console.log("data", data);
    // console.log("token", token);

    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": token
      })
    };

    return this.http.post(this.darumaUrl + "registro/alta", data
    ,httpOptions)
  }

  isAsignaDaruma(qrCode: string, token: string){
    // console.log("qrText", qrCode);
    // console.log("qrToken", token);

    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": token
      })
    };
    this.datosAsignar = {
      "qrCode": qrCode
    }
    return this.http.post(this.darumaUrl + "DarumasWS/asignar", this.datosAsignar
    ,httpOptions)
  }

  doActivaDaruma(daruma, proposito, nombre){
    //console.log("EntraActivar", proposito);
    // console.log("EntraToken", daruma["token"]);
    // console.log("EntraQR", daruma["qrCode"]);
    let tok: string = daruma["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": tok
      })
    };
    let Daruma = {
      "qrcode": daruma["qrCode"],
      "descripcion": proposito,
      "nombre": nombre
    }
    return this.http.post(this.darumaUrl + "DarumasWS/activar", Daruma
    ,httpOptions)
  }

  completarDaruma (qrcode,token) {
    // console.log(" completAqrcode ",qrcode, " token ", token);
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": token
      })
    };
    let Daruma = {
      "qrCode": qrcode
    }
    return this.http.post(this.darumaUrl + "DarumasWS/completar", Daruma
    ,httpOptions)
  }

  eliminarCuenta(token){
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": token
      })
    };
    let datos = {
      clave: null,
      darumas:null
    }
    return this.http.post(this.darumaUrl + "registro/baja", datos
    ,httpOptions)
  }
}