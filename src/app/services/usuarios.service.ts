import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: any[] = [
    {
      run: '11.111.111-1',
      nombre: 'admin',
      apellido: 'admin',
      correo: 'admin',
      password: 'admin',
      tipo_usuario: 'administrador'
    },
    {
      run: '22.222.222-2',
      nombre: 'jhona',
      apellido: 'quiro',
      correo: 'jh.quiro@duocuc.cl',
      password: 'jhona123',
      tipo_usuario: 'pasajero'
    },
    {
      run: '33.333.333-3',
      nombre: 'caro',
      apellido: 'lina',
      correo: 'ca.lina@duocuc.cl',
      password: 'caro123',
      tipo_usuario: 'conductor'
    }
  ]
  vehiculos: any[] = []

  constructor() { }

  //Metodos usuario
  agregarUsuario(usuario): boolean{
    if ( this.obtenerUsuario(usuario.run) == undefined ) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }
  eliminarUsuario(run: string){
    this.usuarios.forEach((usu, index) => {
      if (usu.run == run) {
        this.usuarios.splice(index, 1);
      }
    });
  }
  actualizarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.run == usuario.run);
    this.usuarios[index] = usuario;
  }
  obtenerUsuario(run: string){
    return this.usuarios.find(usu => usu.run == run);
  }
  obtenerUsuarios(){
    return this.usuarios;
  }

  //Metodos Vehiculo
 agregarVehiculo(vehiculo): boolean{
    if ( this.obtenerVehiculo(vehiculo.patente) == undefined ) {
      this.vehiculos.push(vehiculo);
      return true;
    }
    return false;
  }
  eliminarVehiculo(patente: string){
    this.vehiculos.forEach((auto, index) => {
      if (auto.patente == patente) {
        this.vehiculos.splice(index, 1);
      }
    });
  }
  actualizarVehiculo(vehiculo){
    var index = this.vehiculos.findIndex(auto => auto.patente == vehiculo.patente);
    this.vehiculos[index] = vehiculo;
  }
  obtenerVehiculo(patente: string){
    return this.vehiculos.find(auto => auto.patente == patente);
  }
  obtenerVehiculos(){
    return this.vehiculos;
  }

  //Login
  validarLogin(correo, password){
    return this.usuarios.find(usu => usu.correo == correo && usu.password == password);
  }
}
