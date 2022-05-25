import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
// import { BarcodeScanner, BarcodeScannerOriginal } from '@ionic-native/barcode-scanner';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-daruma-qr',
  templateUrl: './add-daruma-qr.page.html',
  styleUrls: ['./add-daruma-qr.page.scss'],
})
export class AddDarumaQrPage implements OnInit {
  private isBackMode: boolean = false;
  private isFlashLightOn: boolean = false;
  private scanSub: any ;
  public loader: any;

  constructor(
    public router: Router,
    private barcodeScanner: BarcodeScanner,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public ds: DarumaService
  ) {  }



  ngOnInit() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
