import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string;
  password: string;

  constructor(private toastController: ToastController, private router: Router, 
      //private usuarioService: UsuarioService
      ) { }

  ngOnInit() {
    }
  logearse(){
    if (this.usuario == 'admin' && this.password == 'admin') {
      this.router.navigate(['/admin']);
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
