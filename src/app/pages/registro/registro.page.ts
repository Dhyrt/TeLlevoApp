import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario = new FormGroup({
    run: new FormControl('', [Validators.required, 
                               Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required, 
                                  Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, 
                                    Validators.minLength(4)]),
    correo: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{2,10}.[A-Za-z]{2,20}@[A-Za-z.]{6,13}.cl')]),
    password: new FormControl('', [Validators.required, 
                                   Validators.minLength(6), 
                                   Validators.maxLength(18)]),
    tipo_usuario: new FormControl('')
  });

  verificar_password: string;
  usuarios: any[] = [];

  constructor(private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios()
  }

  registrar(){
    if (this.usuario.controls.password.value != this.verificar_password) {
      alert('contraseñas no coinciden');
      return;
    }
    this.usuarioService.agregarUsuario(this.usuario.value);
    alert('Usuario registrado');
    if (this.usuario.controls.tipo_usuario.value == "conductor"){
      this.router.navigate(['/reg-vehi']);
    }else{
      this.router.navigate(['/login']);
    }
  }

}
