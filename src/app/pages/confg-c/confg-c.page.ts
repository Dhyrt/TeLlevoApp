import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-confg-c',
  templateUrl: './confg-c.page.html',
  styleUrls: ['./confg-c.page.scss'],
})
export class ConfgCPage implements OnInit {

  constructor(private fireService : FireService) { }

  ngOnInit() {
  }

  async salir() {
    await this.fireService.logout();
  }

}
