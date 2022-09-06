import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: any[] = []
  vehiculos: any[] = []

  constructor() { }

  //Metodos usuario
  agregarUsuario(usuario): boolean{
    if ( this.obtenerUsuario(usuario.rut) == undefined ) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }
  eliminarUsuario(rut: string){
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }
  actualizarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }
  obtenerUsuario(rut: string){
    return this.usuarios.find(usu => usu.rut == rut);
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
    var index = this.vehiculos.findIndex(auto => auto.rut == vehiculo.patente);
    this.vehiculos[index] = vehiculo;
  }
  obtenerVehiculo(patente: string){
    return this.vehiculos.find(auto => auto.patente == patente);
  }
  obtenerVehiculos(){
    return this.vehiculos;
  }

  //Login
  validarLogin(nombre, password){
    return this.usuarios.find(usu => usu.nombre == nombre && usu.password == password);
  }
}
