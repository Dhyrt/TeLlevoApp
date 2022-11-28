import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Icon } from 'ionicons/dist/types/components/icon/icon';

import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarios: any[] = [];
  correo: string = '';
  password: string = '';
  KEY_HUMANOS = 'usuarios';
  usuarioLogin : any = {};
  
  /* usuario = {
    correo: '',
    password: '' 
  }; */
  constructor(private toastController: ToastController, private router: Router, private storageService: StorageService, private fireService: FireService) { }


  ngOnInit() {
    this.loadInfos();
  }
  loadInfos() {
    //this.usuarios = await this.storage.getInfos(this.KEY_HUMANOS);
    this.fireService.getInfos(this.KEY_HUMANOS).subscribe(
      info => {
        this.usuarios = [];
        for(let usuario of info){
          console.log( usuario.payload.doc.data() );
          let us = usuario.payload.doc.data();
          us['id'] = usuario.payload.doc.id;
          this.usuarios.push( us );
        }
      }
    );
  }

 login() {
    this.usuarioLogin = this.usuarios.find( us => us.correo == this.correo && us.password == this.password)
      if (this.usuarioLogin != undefined) {
      this.fireService.validarLogin()
      var navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuarioLogin
        }
      };
      if (this.usuarioLogin.tipo_usuario == 'administrador') {
        this.router.navigate(['/admin'], navigationExtras);
      } else if (this.usuarioLogin.tipo_usuario == 'pasajero') {
        this.router.navigate(['/inicio'], navigationExtras);
      } else if (this.usuarioLogin.tipo_usuario == 'conductor') {
        this.router.navigate(['/inicio-c'], navigationExtras);
      }
    } else {
      this.toastError('bottom', 'Usuario o contraseña Incorrectos!!!');
      //console.log(this.usuario)
    }
  }
  async toastError(position: 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: position,
      icon: 'skull-outline'
    });
    toast.present();
  }

  
  /* login(){
    var usuarioLogin = this.storageService.validarLogin(this.correo, this.password);
    if ( usuarioLogin != undefined ) {
      var navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioLogin
        }
      };
      if (usuarioLogin.tipo_usuario == 'administrador'){
        this.router.navigate(['/admin'], navigationExtras);
      }else if(usuarioLogin.tipo_usuario == 'pasajero'){
        this.router.navigate(['/inicio'], navigationExtras);
      }else if(usuarioLogin.tipo_usuario == 'conductor'){
        this.router.navigate(['/inicio-c'], navigationExtras);
      }
    }else{
      this.toastError('bottom','Usuario o contraseña Incorrectos!!!');
    }
  }
  async toastError(position:'bottom', message: string) {
    const toast = await this.toastController.create({
      message:  message,
      duration: 3000,
      position: position,
      icon: 'skull-outline'
    });
    toast.present();
  }  */

}



//respaldo
/* usuario = new FormGroup({
  correo: new FormControl('', [Validators.required]),
  password: new FormControl('', [Validators.required])

});
constructor(private toastController: ToastController, private router: Router, private storageService: StorageService, private fireService: FireService) { }

ngOnInit() {
  this.loadInfos();
}
loadInfos() {
  //this.usuarios = await this.storage.getInfos(this.KEY_HUMANOS);
  this.fireService.getInfos(this.KEY_HUMANOS).subscribe(
    info => {
      this.usuarios = [];
      for(let usuario of info){
        console.log( usuario.payload.doc.data() );
        let us = usuario.payload.doc.data();
        us['id'] = usuario.payload.doc.id;
        this.usuarios.push( us );
      }
    }
  );
}

login() {
  this.usuarioLogin = this.usuarios.find( us => us.correo == this.usuario.value.correo && us.password == this.usuario.value.password)
  
  if (this.usuarioLogin != undefined) { 
    this.fireService.validarLogin()
    var navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuarioLogin
      }
    };
    if (this.usuarioLogin.tipo_usuario == 'administrador') {
      this.router.navigate(['/admin'], navigationExtras);
    } else if (this.usuarioLogin.tipo_usuario == 'pasajero') {
      this.router.navigate(['/inicio'], navigationExtras);
    } else if (this.usuarioLogin.tipo_usuario == 'conductor') {
      this.router.navigate(['/inicio-c'], navigationExtras);
    }
  } else {
    this.toastError('bottom', 'Usuario o contraseña Incorrectos!!!');
  console.log(this.usuarioLogin)
  }
}
async toastError(position: 'bottom', message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 3000,
    position: position,
    icon: 'skull-outline'
  });
  toast.present();
} */
