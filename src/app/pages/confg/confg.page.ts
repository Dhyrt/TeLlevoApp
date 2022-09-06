import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-confg',
  templateUrl: './confg.page.html',
  styleUrls: ['./confg.page.scss'],
})
export class ConfgPage implements OnInit {

  vehiculo = new FormGroup({
    marca: new FormControl ('', [Validators.required, Validators.minLength(2)]),
    modelo: new FormControl ('', [Validators.required, Validators.minLength(2)]),
    patente: new FormControl ('', [Validators.required, Validators.pattern('[A-Za-z]{2}.[0-9A-Za-z]{2}.[0-9]{2}')]),
    anio: new FormControl ('', [Validators.required, Validators.min(2016), Validators.max(2022)]),
    color: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor() { }

  ngOnInit() {
  }

}
