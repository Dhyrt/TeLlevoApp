import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/compat/database';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-confg-c',
  templateUrl: './confg-c.page.html',
  styleUrls: ['./confg-c.page.scss'],
})
export class ConfgCPage implements OnInit {

  constructor(private router: Router, private fireService : FireService, public route: ActivatedRoute, private apiService: ApiService) { }

  usuario: any;
  
  clima: any = {};
  lugar: any = {};
  desc: any = {};

  async ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    let respuesta = await this.apiService.get();
        respuesta.subscribe( (data:any) => {
            console.warn(data);
            this.clima = data.main;
            this.lugar = data;
            this.desc = data.weather[0];
            
        });
  }


  async salir() {
    await this.fireService.logout();
  }

}
