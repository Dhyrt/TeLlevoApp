import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ValidService } from 'src/app/services/valid.service';

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
    fNac: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{2,10}.[A-Za-z]{2,20}@duocuc.cl$|[A-Za-z]{2,10}.[A-Za-z]{2,20}@profesor.duoc.cl$')]),
    password: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(18)]),
    tipo_usuario: new FormControl('', []),
    vehi: new FormControl('', [])
    
  });
  vehi: any = {
    marca: '',
    modelo: '', 
    patente: '', 
    anio: '',
    color: '',
    capac: '',
    licencia: ''
  }
  verificar_password: string;
  usuarios: any[] = [];
  KEY_HUMANOS = 'usuarios';
  registrado : boolean = false 
  id_nuevo: any = '';
  usuarioExiste : any = '';
  tipo_usuario: any = '';
  
  //variable de pruebas unitarias:
  v_registrar: boolean = false;


  constructor(private usuarioService: UsuariosService, private router: Router, private validoService: ValidService,
    private fireService: FireService, private toastController: ToastController) { }

  ngOnInit() {
    //this.usuarios = this.usuarioService.obtenerUsuarios()
    this.loadInfos();
  }

  loadInfos() {
    //this.usuarios = await this.storage.getInfos(this.KEY_HUMANOS);
    this.fireService.getInfos(this.KEY_HUMANOS).subscribe(
      info => {
        this.usuarios = [];
        for (let usuario of info) {
          console.log(usuario.payload.doc.data());
          let us = usuario.payload.doc.data();
          us['id'] = usuario.payload.doc.id;
          this.usuarios.push(us);
        }
      }
    );
  }

  cancelar() {
    this.usuario.reset();
    this.router.navigate(['/home']);
    
  }

  registrar (){
    this.usuario.controls.tipo_usuario.setValue (this.tipo_usuario);
    //alert('test')
     //Validacion run
     if(!this.validoService.validRun(this.usuario.controls.run.value)){
      //alert("Rut invalido");
      this.toastgeneral('bottom','Rut invalido')
      return;
    }
    //Validacion edad
    if(!this.validoService.validEdad(17, this.usuario.controls.fNac.value)){
      //alert("Debe ser mayor de 17 para registrarse");
      this.toastgeneral('bottom','Debe ser mayor de 17 para registrarse')
      return;
    }
    //Validacion contraseña
    if (this.usuario.controls.password.value != this.verificar_password) {
      //alert('contraseñas no coinciden');
      this.toastgeneral('bottom','contraseñas no coinciden')
      
      return;
    }
    if (this.usuario.controls.password.value != this.verificar_password) {
      //alert('Contraseñas no coinciden');
      this.toastgeneral('bottom','contraseñas no coinciden')
      return;
    }
    if (this.vehi.patente == '' && this.tipo_usuario == 'conductor') {
      //alert('patente esta vacia ingrese patente')
      this.toastgeneral('bottom','patente esta vacia ingrese patente')
      return;
    }
    if (this.vehi.licencia == '' && this.tipo_usuario == 'conductor') {
      this.toastgeneral('bottom','Campo licencia esta vacio')
      return;
    }
    this.usuario.controls.vehi.setValue(this.vehi);

    this.usuarioExiste = this.usuarios.find(us => us.run == this.usuario.controls.run.value && us.correo == this.usuario.controls.correo.value)
      if (this.usuarioExiste == undefined){
      this.fireService.agregar(this.KEY_HUMANOS, this.usuario.value);
      this.v_registrar = true;
      this.toastgeneral('bottom','Usuario registrado')
      this.usuario.reset();
      this.router.navigate(['/login']);
      }else{
        
        this.toastgeneral2('bottom','Usuario registrado')
      }
  }
  async toastgeneral(position, message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: position,
      icon: 'skull-outline'
    });
    toast.present();
  }
  async toastgeneral2(position , message: string ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: position,
      icon: 'thumbs-up-outline'
    });
    toast.present();
  }
}
//"thumbs-up-outline"
//'skull-outline'