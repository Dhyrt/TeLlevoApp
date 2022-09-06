import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
    tipo_usuario: new FormControl('', [Validators.required])
  });

  verificar_password: string;
  usuarios: any[] = [];

  constructor(private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios()
  }

  registrar(){
    if (this.usuario.controls.password.value != this.verificar_password) {
      alert('Contraseñas no coinciden');
      return;
    }
    var registrado: boolean = this.usuarioService.agregarUsuario(this.usuario.value);
    if (registrado) {
      this.usuario.reset();
      alert('Usuario Registrado');
      this.verificar_password = '';
    }else{
      alert('Usuario Existente');
      return;
    }
  }
  
  eliminar(rutEliminar){
    this.usuarioService.eliminarUsuario(rutEliminar);
  }

  buscar(rutBuscar){
    var usuarioEncontrado = this.usuarioService.obtenerUsuario(rutBuscar);
    this.usuario.setValue(usuarioEncontrado);
    this.verificar_password = usuarioEncontrado.password;
  }

  modificar(){
    this.usuarioService.actualizarUsuario(this.usuario.value);
    this.limpiar();
  }

  limpiar(){
    this.usuario.reset();
    this.verificar_password = '';
  }

}
