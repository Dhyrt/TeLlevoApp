import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  admin =
    {
      run: '11.111.111-1',
      nombre: 'admin',
      apellido: 'admin',
      correo: 'admin@duocuc.cl',
      password: 'admin',
      fNac:'03/04/1990',
      tipo_usuario: 'administrador',
      vehi: {
        marca:'' ,
        modelo: '',
        patente: '',
        anio: '',
        color:'',
        capac: '',
        licencia: '',
      }
    };

    pasajero = {
      run: '22.222.222-2',
      nombre: 'jhona',
      apellido: 'quiro',
      correo: 'jh.quiro@duocuc.cl',
      password: 'jhona123',
      fNac:'07/01/1998',
      tipo_usuario: 'pasajero',
      vehi: {
        marca:'' ,
        modelo: '',
        patente: '',
        anio: '',
        color:'',
        capac: '',
        licencia: '',
      }
    };

    conductor = {
      run: '33.333.333-3',
      nombre: 'caro',
      apellido: 'lina',
      correo: 'ca.lina@duocuc.cl',
      password: 'caro123',
      fNac:'05/06/1995',
      tipo_usuario: 'conductor',
      vehi: {
        marca:'hyundai' ,
        modelo: 'elantra',
        patente: 'RS-OP-69',
        anio: '2022',
        color:'negro',
        capac: '4',
        licencia: '12345678',
      }
    }

 
  
  constructor (private router: Router, private storage: StorageService, private loading: LoadingController) { }
 
  async ngOnInit() {
    await this.storage.agregar ('usuarios', this.admin);
  
    await this.storage.agregar ('usuarios', this.conductor);
 
    await this.storage.agregar ('usuarios', this.pasajero );
  }

}
