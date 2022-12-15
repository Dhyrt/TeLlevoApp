import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FireService } from 'src/app/services/fire.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-confg',
  templateUrl: './confg.page.html',
  styleUrls: ['./confg.page.scss'],
})
export class ConfgPage implements OnInit {

  constructor(private router: Router, private fireService : FireService, private apiService: ApiService) { }

  usuario: any;
  
  clima: any = {};
  lugar: any = {};
  desc: any = {};

  async ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    let respuesta = await this.apiService.get();
        respuesta.subscribe( (data:any) => {
            console.log(data);
            this.clima = data.main;
            this.lugar = data;
            this.desc = data.weather[0];
        });
  }

  async salir() {
    await this.fireService.logout();
  }

}
