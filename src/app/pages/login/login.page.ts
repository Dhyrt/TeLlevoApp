import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string;
  password: string;

  constructor(private toastController: ToastController, private router: Router, private storage: StorageService) { }

  ngOnInit() {
  }

  login(){
    var usuarioLogin = this.storage.validarLogin(this.correo, this.password);
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
  }

}
