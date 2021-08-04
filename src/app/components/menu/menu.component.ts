import { Component, OnInit } from '@angular/core';
import { InicioLoginPage } from 'src/app/pages/inicio-login/inicio-login.page';
import { Router, RouterEvent } from '@angular/router';
import { DarumaService } from 'src/app/providers/daruma-service/daruma.service';

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
  
  constructor(public router: Router,
    public ds: DarumaService  
  ) { 
    
    this.rootPage = InicioLoginPage;
    this.pages = [

        {titulo: "Mis Darumas", color: "azul", componente: '/darumas-gral', icon: "home"},
        {titulo: 'Agregar Daruma', color: "azul", componente: '/add-daruma-qr', icon: 'qr-code-outline'},
        {titulo: 'Acerca de', color: "azul", componente: '/acerca', icon: 'information-circle'},
        {titulo: "Ajustes", color: "azul", componente: '/ajustes', icon: "settings"},
        {titulo: "Los Colores", color: "naranjadaruma", componente: '/colores', icon: "color-palette-outline"},
        {titulo: "Salir", color: "rosados", componente: '', icon: "log-out"}
    ]    
  }

  ngOnInit() {
    this.router.events.subscribe((event : RouterEvent) => {
      
      if (this.selectedPath == '') {
        this.selectedPath = event.url;
      }
      // console.log("pathhhh", this.selectedPath);
      
    })
  }

  siSale(titulo) {
    //Al salir borra Token
    if (titulo == "Salir") {
      this.ds.borraToken().then((token)=>{
        console.log("tokenBorrado ");
        this.router.navigate(['inicio-login']);     
      }).catch((e: any) => console.log('Error borraToken', e));      
    }
  }
}
