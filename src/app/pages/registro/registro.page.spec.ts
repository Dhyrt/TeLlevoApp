import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { RegistroPage } from "./registro.page";



describe('Pruebas unitarias: Login', ()=>{
  beforeEach( async()=>{
    await TestBed.configureTestingModule( {
      imports :[
        
        AngularFireModule.initializeApp(environment.firebaseConfig),
        

        
      ],declarations: [
        RegistroPage
      ]
    }).compileComponents();
  });

  it('1. Levantar la pagina Login', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });


  it('2. Registro invalido', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    
  })
})