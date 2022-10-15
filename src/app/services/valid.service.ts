import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidService {

  constructor() { }

  validRun(run): boolean {
    var formSimple = run.replace('.', '').replace('.', '').replace('-', '');
    formSimple = formSimple.substring(0, formSimple.length - 1);
    var runArreglo: any[] = formSimple.split('').reverse();

    var acumulador: number = 0;
    var multiplo: number = 2;
    for (let digito of runArreglo) {
      acumulador = acumulador + digito * multiplo;
      multiplo++;
      if (multiplo > 7) {
        multiplo = 2;
      }
    }
    var resto: number = acumulador % 11;
    var dvCalculado: any = 11 - resto;
    if (dvCalculado >= 11) {
      dvCalculado = '0';
    } else if (dvCalculado == 10) {
      dvCalculado = 'K';
    }

    var dvRun: string = run.substring(run.length - 1).toUpperCase();
    if (dvRun == dvCalculado.toString()) {
      return true;
    } else {
      return false;
    }
  }

  //validar edad:
  validEdad(edadMin, fNac) {
    var fn = new Date(fNac);
    var timeDiff = Math.abs(Date.now() - fn.getTime());
    var edadUsuario = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    if (edadUsuario >= edadMin) {
      return true;
    } else {
      return false;
    }
  }

}
