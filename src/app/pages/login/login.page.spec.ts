import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { LoginPage} from "./login.page";


describe('Pruebas unitarias: Login', ()=>{
  beforeEach( async()=>{
    await TestBed.configureTestingModule( {
      imports :[
        
        AngularFireModule.initializeApp(environment.firebaseConfig),
        

        
      ],declarations: [
        LoginPage
      ]
    }).compileComponents();
  });

  it('1. Levantar la pagina Login', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

})
