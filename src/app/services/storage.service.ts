import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  usuario: any[] = [];

  constructor(private storage: Storage) { 
    storage.create(); 
  }
}
