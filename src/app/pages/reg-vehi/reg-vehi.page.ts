import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-reg-vehi',
  templateUrl: './reg-vehi.page.html',
  styleUrls: ['./reg-vehi.page.scss'],
})
export class RegVehiPage implements OnInit {

  vehiculo = new FormGroup({
    marca: new FormControl ('',[Validators.required, Validators.minLength(2)]),
    modelo: new FormControl ('',[Validators.required, Validators.minLength(2)]),
    patente: new FormControl ('',[Validators.required,Validators.pattern('[A-Z]{2}-[A-Z]{2}-[0-9]{2}')]),
    anio: new FormControl ('',[Validators.required,Validators.min(2016),Validators.max(2022)]),
    color: new FormControl('',[Validators.required]),
    licencia: new FormControl ('',[Validators.required,Validators.min(11111111),Validators.max(99999999)])
  });
  
  autos: any[] = [];

  constructor(private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.autos = this.usuarioService.obtenerVehiculos();
  }

  registrar(){
    this.usuarioService.agregarVehiculo(this.vehiculo.value);
    alert('Vehiculo registrado');
    this.router.navigate(['/login']);
  }

}
