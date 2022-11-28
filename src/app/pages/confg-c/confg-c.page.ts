import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confg-c',
  templateUrl: './confg-c.page.html',
  styleUrls: ['./confg-c.page.scss'],
})
export class ConfgCPage implements OnInit {
  usuario = new FormGroup({
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
    tipo_usuario: new FormControl('', [Validators.required]),
    vehi: new FormControl({}, [])
      
    
  });

  vehi = {
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

  constructor() { }

  ngOnInit() {
  }

}
