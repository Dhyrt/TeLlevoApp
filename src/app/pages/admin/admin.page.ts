import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';
import { FireService } from 'src/app/services/fire.service';
import { ValidService } from 'src/app/services/valid.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  usuario= new FormGroup({
    run: new FormControl('', [Validators.required,
    Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required,
    Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required,
    Validators.minLength(4)]),
    fNac: new FormControl('',[Validators.required]),
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
  v_registrar: boolean = false;
  constructor(private router: Router, private loading: LoadingController, private fireService: FireService, private validoService: ValidService,
    private toastController: ToastController, private alertController: AlertController ) { }

  ngOnInit() {
    //await this.loadInfos();
    this.loadInfos();
  }

  loadInfos() {
    //this.usuarios = await this.storage.getInfos(this.KEY_HUMANOS);
    this.fireService.getInfos(this.KEY_HUMANOS).subscribe(
      info => {
        this.usuarios = [];
        for (let usuario of info) {
          //console.log(usuario.payload.doc.data());
          let us: any = usuario.payload.doc.data(); 
          //console.log (us)           
          us['id'] = usuario.payload.doc.id;
          if (us.tipo_usuario != 'administradorPrefe')  {
            this.usuarios.push(us);}
        }
      }
    );
  }
  registrar (){
    this.usuario.controls.tipo_usuario.setValue (this.tipo_usuario);
    //alert('test')
     //Validacion run
     if(!this.validoService.validRun(this.usuario.controls.run.value)){
      this.toastgeneral('top','Rut invalido')
      //alert("Rut invalido");
      return;
    }
    //Validacion edad
    if(!this.validoService.validEdad(17, this.usuario.controls.fNac.value)){
      this.toastgeneral('top','Debe ser mayor de 17 para registrarse')
      //alert("Debe ser mayor de 17 para registrarse");
      return;
    }
    //Validacion contrase??a
    if (this.usuario.controls.password.value != this.verificar_password) {
      this.toastgeneral('top','Contrase??as no coinciden')
      //alert('contrase??as no coinciden');
      return;
    }
    if (this.usuario.controls.password.value != this.verificar_password) {
      this.toastgeneral('top','Contrase??as no coinciden')
      //alert('Contrase??as no coinciden');
      return;
    }
    if (this.usuario.controls.tipo_usuario.value == 'conductor'){
    if (this.vehi.patente == '') {
      this.toastgeneral('top','Campo patente esta vacio')
      //alert('patente esta vacia ingrese patente')
      return;
    }
    if (this.vehi.licencia == '') {
      this.toastgeneral('top','Campo licencia esta vacio')
      //alert('licencia esta vacia ingrese licencia')
      return;
    }
    this.usuario.controls.vehi.setValue(this.vehi);

    this.usuarioExiste = this.usuarios.find(us => us.run == this.usuario.controls.run.value && us.correo == this.usuario.controls.correo.value)
      if (this.usuarioExiste == undefined){
      this.fireService.agregar(this.KEY_HUMANOS, this.usuario.value);
      this.v_registrar = true;
      this.toastgeneral2('top','Usuario registrado Exitosamente')
      //alert('Usuario registrado');
      this.usuario.reset();
      this.limpiar();
      }else{
        this.toastgeneral('top','Usuario ya esta Registrado',)
        //alert('Usuario ya esta Registrado')
      }
    }
  }
/*   async registrar() {
    if (this.usuario.controls.password.value != this.verificar_password) {
      alert('Contrase??as no coinciden');
      return;
    }
    if (this.vehi.patente == '') {
      alert('patente esta vacia ingrese patente')
      return;
    }
    if (this.vehi.licencia == '') {
      alert('licencia esta vacia ingrese licencia')
      return;
    }
    this.usuario.controls.vehi.setValue(this.vehi);

    var registrado: boolean = await this.storage.agregar(this.KEY_HUMANOS, this.usuario.value);
    if (registrado) {
      this.usuario.reset();
      alert('Usuario Registrado');
      this.verificar_password = '';
    } else {
      alert('Usuario Existente');
      return;
    }
  } */

  async eliminar(id) {
    await this.eliminar1(
    this.fireService.eliminar(this.KEY_HUMANOS,id))
  } 

  async eliminar1(eliminacion){
    const alert = await this.alertController.create({
      header: '??Estas Seguro de verlo Morir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.error('no eliminaste nada');
          },
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          
          handler: () => {
            eliminacion;
            this.loadInfos();
            this.toastgeneral('top','Usuario Eliminado Exitosamente')
          },
        },
      ],
    });

    await alert.present();


  }

  /* async buscar(rutBuscar) {
    var usuarioEncontrado = await this.storage.getInfo(this.KEY_HUMANOS, rutBuscar);
    this.usuario.setValue(usuarioEncontrado);
    this.verificar_password = usuarioEncontrado.password;
  } */
buscar(id){
  this.fireService.getInfo(this.KEY_HUMANOS, id).subscribe(
    (info: any)  => {
      /* console.error( info.data().tipo_usuario ); */
      this.usuario.setValue( info.data() );
      this.tipo_usuario = info.data().tipo_usuario
      this.id_nuevo = info.id;
      this.vehi = info.data().vehi;
      this.verificar_password = info.data().password;
      /* console.warn(this.vehi); */
    }
  )
}
  /* async modificar() {
    await this.storage.actualizar(this.KEY_HUMANOS, this.usuario.value);
    await this.loadInfos();
    this.limpiar();
  } */
  actualizar(){
    console.warn(this.id_nuevo)
    console.error(this.usuario.value)
    this.fireService.actualizar(this.KEY_HUMANOS, this.id_nuevo, this.usuario.value)
    /* this.usuario.controls.tipo_usuario.setValue (this.tipo_usuario) */
    /* console.warn(this.usuario.controls.tipo_usuario) */
    
    this.limpiar();
    this.toastgeneral2('top','Usuario Actualizado Exitosamente')
  }
  limpiar() {
    this.usuario.reset();
    this.vehi = {
      marca: '',
      modelo: '', 
      patente: '', 
      anio: '',
      color: '',
      capac: '',
      licencia: ''
    };
    this.verificar_password = '';
    this.id_nuevo = '';
    this.tipo_usuario = '';
 
  }

  async salir() {
    await this.fireService.logout();
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
