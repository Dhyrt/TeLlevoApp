import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-confg',
  templateUrl: './confg.page.html',
  styleUrls: ['./confg.page.scss'],
})
export class ConfgPage implements OnInit {

  constructor(private router: Router, private fireService : FireService) { }

  usuario: any;

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  }

  async salir() {
    await this.fireService.logout();
  }

}
