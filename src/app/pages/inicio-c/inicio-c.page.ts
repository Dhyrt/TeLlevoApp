import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-c',
  templateUrl: './inicio-c.page.html',
  styleUrls: ['./inicio-c.page.scss'],
})
export class InicioCPage implements OnInit {

  usuario: any;
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  }

}
