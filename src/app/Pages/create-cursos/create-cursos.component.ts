import { CursoService } from './../../Services/curso.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ICurso } from '../../Models/ICurso';
@Component({
  selector: 'app-create-cursos',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './create-cursos.component.html',
  styleUrl: './create-cursos.component.css'
})
export class CreateCursosComponent implements OnInit{

@Input('idCurso') idCurso!:number
  private CursoService = inject(CursoService);
  public formBuild = inject(FormBuilder);

  public formCurso:FormGroup = this.formBuild.group({
    nombre: [''],
    descripcion:['']
  });

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.idCurso != 0){
      this.CursoService.obtener(this.idCurso).subscribe({
        next:(data) =>{
          this.formCurso.patchValue({
            nombre: data.nombre,
            descripcion:data.descripcion
          })
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

guardar(){
  const objeto : ICurso = {
    idCurso : this.idCurso,
    nombre: this.formCurso.value.nombre,
    descripcion: this.formCurso.value.descripcion
  }

  if(this.idCurso == 0){
    this.CursoService.create(objeto).subscribe({
      next:(data) =>{
        if(data != null){
          this.router.navigate(["/"]);
        }else{
          alert("Error al crear")
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }else{
    console.log("Entra actualizar")
    this.CursoService.editar(objeto).subscribe({
      next:(data) =>{
        if(data){
          this.router.navigate(["/"]);
        }else{
          alert("Error al editar")
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }


}

volver(){
  this.router.navigate(["/"]);
}


}
