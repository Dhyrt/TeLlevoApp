import { Injectable } from '@angular/core';
import {AngularFirestore  } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private fire:AngularFirestore,private router: Router) { }
  usuarios: any[] = []
  viajes:  any[] = []
  isAuthenticated = new BehaviorSubject(false);
  
  agregar(coleccion,value){
    try {
      this.fire.collection(coleccion).add(value);
    } catch (error) {
      console.log(error)
    }
  }
  
  getInfos(coleccion){
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log(error);
    }
  }

  eliminar(coleccion, id){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  getInfo(coleccion, id){
    try {
      return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error);
    }
  }
  //modificar
  actualizar(coleccion, id, value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
    }
  }

  validarLogin(correo, password){
    var usuarioLogin = this.usuarios.find(usu => usu.correo == correo && usu.password == password);
    if(usuarioLogin != undefined){
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
  }

  getAuth(){
    return this.isAuthenticated.value;
  }
  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login'])
  } 
  modificarViajesExistentes(coleccion, id, arregloConUnRutMas){
    try {
    this.fire.collection(coleccion).doc(id).set(arregloConUnRutMas); 
    } catch (error) {
      console.log (error);
    }
  }    
}