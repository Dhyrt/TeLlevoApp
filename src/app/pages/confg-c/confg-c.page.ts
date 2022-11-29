import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-confg-c',
  templateUrl: './confg-c.page.html',
  styleUrls: ['./confg-c.page.scss'],
})
export class ConfgCPage implements OnInit {

  constructor(private router: Router, private fireService : FireService, public route: ActivatedRoute) { }

  usuario: any;

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  }


  async salir() {
    await this.fireService.logout();
  }

}
