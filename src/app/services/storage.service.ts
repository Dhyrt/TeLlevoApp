import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
//import { info } from 'console';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuarios: any[] = [
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
    },
    {
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
    },
    {
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

  ];
  viajes:  any[] = []

  isAuthenticated = new BehaviorSubject(false);

  constructor(private storage: Storage, private router: Router) { 
    storage.create(); 
  }

  async agregar(key, info){
    this.usuarios = await this.storage.get(key) || [];
    var infor =await this.getInfo(key, info.run);
    if (infor == undefined) {
      this.usuarios.push(info);
      await this.storage.set(key, this.usuarios);
      return true;
    }
    return false;
  }

  async agViaje(key, viaje){
    this.viajes = await this.storage.get(key) || [];

    if(viaje.id == ''){
      var id = this.viajes.length + 1;
      viaje.id = id;
      this.viajes.push(viaje);
      await this.storage.set(key, this.viajes);
      return true;
    }
    return false;
  }

  async getInfo(key, run){
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios.find(info => info.run == run);
  }
  async getInfov(key, id){
    this.viajes = await this.storage.get(key) || [];
    return this.viajes.find(viaje => viaje.id == id);
  }

  async getInfos(key){
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios;
  }
  
  async getInfosV(key){
    this.viajes = await this.storage.get(key) || [];
    return this.viajes;
  }

  async eliminar (key, run){
    this.usuarios = await this.storage.get(key) || [];

    this.usuarios.forEach((value, index) => {
      if(value.run == run){
        this.usuarios.splice(index,1);
      }
    });
    await this.storage.set(key,this.usuarios);
  }

  async actualizar (key, info){
    this.usuarios = await this.storage.get(key) ||[];
    var index = this.usuarios.findIndex(value => value.run == info.run);
    this.usuarios[index]= info;
    await this.storage.set(key, this.usuarios);
  }
  //Login
  validarLogin(correo, password){
    var usuarioLogin = this.usuarios.find(usu => usu.correo == correo && usu.password == password);
    if(usuarioLogin != undefined){
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
    //return this.usuarios.find(usu => usu.correo == correo && usu.password == password);
  }
  getAuth(){
    return this.isAuthenticated.value;
  }
  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login'])
  }

  async validarLogin1(key, correo, password){
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios.find(usu => usu.correo == correo && usu.password == password);
  }


  //m??todo customer:
  async modificarViajesExistentes(key, arregloConUnRutMas){
    await this.storage.set(key, arregloConUnRutMas);
  }
}


