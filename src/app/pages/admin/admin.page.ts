import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  usuario = new FormGroup({
    run: new FormControl('', [Validators.required, 
                               Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required, 
                                  Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, 
                                    Validators.minLength(4)]),
    correo: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{2,10}.[A-Za-z]{2,20}@duocuc.cl$|[A-Za-z]{2,10}.[A-Za-z]{2,20}@profesor.duoc.cl$')]),
    password: new FormControl('', [Validators.required, 
                                   Validators.minLength(6), 
                                   Validators.maxLength(18)]),
    tipo_usuario: new FormControl('', [Validators.required]),
    vehi: new FormGroup({
      marca: new FormControl('',[Validators.minLength(2)]),
      modelo: new FormControl('',[Validators.minLength(2)]),
      patente: new FormControl('',[Validators.pattern('[A-Z]{2}-[A-Z]{2}-[0-9]{2}')]),
      anio: new FormControl('',),
      color: new FormControl('',),
      capac: new FormControl('',[Validators.min(1)]),
      licencia: new FormControl('',[Validators.min(11111111),Validators.max(99999999)]),
    })
  });

  verificar_password: string;
  usuarios: any[] = [];
  KEY_HUMANOS = 'humanos';

  constructor(private router: Router, private storage: StorageService, private loading: LoadingController) { }

  async ngOnInit() {
    await this.loadInfos();
  }
  
  async loadInfos(){
    this.usuarios = await this.storage.getInfos(this.KEY_HUMANOS);
  }
  async registrar(){
    if (this.usuario.controls.password.value != this.verificar_password) {
      alert('Contraseñas no coinciden');
      return;
    }
    var registrado: boolean = await this.storage.agregar(this.KEY_HUMANOS,this.usuario.value);
    if (registrado) {
      this.usuario.reset();
      alert('Usuario Registrado');
      this.verificar_password = '';
    }else{
      alert('Usuario Existente');
      return;
    }
  }
  
  async eliminar(rutEliminar){
    await this.storage.eliminar(this.KEY_HUMANOS,rutEliminar);
    await this.loadInfos();
  }

  async buscar(rutBuscar){
    var usuarioEncontrado = await this.storage.getInfo(this.KEY_HUMANOS,rutBuscar);
    this.usuario.setValue(usuarioEncontrado);
    this.verificar_password = usuarioEncontrado.password;
  }

  async modificar(){
    await this.storage.actualizar (this.KEY_HUMANOS, this.usuario.value);
    await this.loadInfos();
    this.limpiar();
  }

  limpiar(){
    this.usuario.reset();
    this.verificar_password = '';
  }

}
