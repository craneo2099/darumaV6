import { Component, OnInit } from '@angular/core';
import { InicioLoginPage } from 'src/app/pages/inicio-login/inicio-login.page';
import { DarumasGralPage } from 'src/app/pages/darumas-gral/darumas-gral.page';
import { AddDarumaQrPage } from 'src/app/pages/add-daruma-qr/add-daruma-qr.page';
import { AcercaPage } from 'src/app/pages/acerca/acerca.page';
import { AjustesPage } from 'src/app/pages/ajustes/ajustes.page';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public rootPage: any;
  public pages: Array<{titulo: string, color: string,
    componente: any, icon: string}>;
  public selectedPath = '';
  
  constructor(public router: Router   
  ) { 
    
    this.rootPage = InicioLoginPage;
    this.pages = [

        {titulo: "Mis Darumas", color: "azul", componente: '/darumas-gral', icon: "home"},
        {titulo: 'Agregar Daruma', color: "azul", componente: '/add-daruma-qr', icon: 'qr-code-outline'},
        {titulo: 'Acerca de', color: "azul", componente: '/acerca', icon: 'information-circle'},
        {titulo: "Ajustes", color: "azul", componente: '/ajustes', icon: "settings"},
        {titulo: "Salir", color: "rosados", componente: '', icon: "log-out"}
    ]
    
    
    
  }

  goToPage(page){
    // Nota: Quita token siempre al cargar inicioPage
    this.selectedPath = '';
}

  // ionViewDidLeave(){
  //   this.selectedPath = '';
  // }

  ngOnInit() {
    this.router.events.subscribe((event : RouterEvent) => {
      
      if (this.selectedPath == '') {
        this.selectedPath = event.url;
      }
      // console.log("pathhhh", this.selectedPath);
      
    })
  }

}
