import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { RegistroPage } from "./registro.page";



describe('Pruebas unitarias: Registro', ()=>{
  beforeEach( async()=>{
    await TestBed.configureTestingModule( {
      imports :[
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormsModule

        
      ],declarations: [
        RegistroPage
      ]
    }).compileComponents();
  });

  it('1. Levantar la pagina Registro', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });


  it('2. Registro invalido(run invalido)', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let Rut = app.usuario.controls['run'];
    let nombre = app.usuario.controls['nombre']
    let apellido = app.usuario.controls['apellido']
    let fNac = app.usuario.controls['fNac']
    let correo = app.usuario.controls['correo']
    let password = app.usuario.controls['password']
    let tUsuario = app.usuario.controls['tipo_usuario']

    Rut.setValue('5.845.127-4');
    nombre.setValue('A');
    apellido.setValue('Gajardo')
    fNac.setValue('28-05-2002')
    correo.setValue('alan.gajardo@duocuc.cl')
    password.setValue('alan123')
    tUsuario.setValue('pasajero')

    expect(app.usuario.valid).toBeFalse();
  })


  it('3. Registro Valido', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let Rut = app.usuario.controls['run'];
    let nombre = app.usuario.controls['nombre']
    let apellido = app.usuario.controls['apellido']
    let fNac = app.usuario.controls['fNac']
    let correo = app.usuario.controls['correo']
    let password = app.usuario.controls['password']
    let tUsuario = app.usuario.controls['tipo_usuario']

    Rut.setValue('21.037.262-8');
    nombre.setValue('Alan');
    apellido.setValue('Gajardo')
    fNac.setValue('28-05-2002')
    correo.setValue('alan.gajardo@duocuc.cl')
    password.setValue('alan123')
    tUsuario.setValue('pasajero')

    expect(app.usuario.valid).toBeTrue();
  })

  it('4. Registro invalido(Apellido Corto)', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let Rut = app.usuario.controls['run'];
    let nombre = app.usuario.controls['nombre']
    let apellido = app.usuario.controls['apellido']
    let fNac = app.usuario.controls['fNac']
    let correo = app.usuario.controls['correo']
    let password = app.usuario.controls['password']
    let tUsuario = app.usuario.controls['tipo_usuario']

    Rut.setValue('5.845.127-4');
    nombre.setValue('Alan');
    apellido.setValue('Ga')
    fNac.setValue('28-05-2002')
    correo.setValue('alan.gajardo@duocuc.cl')
    password.setValue('alan123')
    tUsuario.setValue('pasajero')

    expect(app.usuario.valid).toBeFalse();
  })
})