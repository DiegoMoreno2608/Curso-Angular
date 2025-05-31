
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CursoService } from '../../Services/curso.service';
import { ICurso } from '../../Models/ICurso';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private CursoService = inject(CursoService);
  public listaCursos: ICurso[] = [];
  public displayedColumns: string[] = ['nombre', 'descripcion', 'accion'];

  obtenerCursos() {
    this.CursoService.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaCursos = data
        }

      },
      error: (err) => {
        console.log("error: " + err);
      }

    })
  }
  constructor (private router: Router){
    this.obtenerCursos();
  }
  nuevo() {
    this.router.navigate(['/curso', 0]);
  }

  editar(objeto: ICurso) {
    this.router.navigate(['/curso', objeto.idCurso]);
  }
  eliminar(objeto: ICurso) {
    if (confirm("Desea eliminar el curso" + objeto.nombre)) {
      this.CursoService.eliminar(objeto.idCurso).subscribe({
        next: (data) => {
          if (data) {
            this.obtenerCursos();
          } else {
            alert("no se pudo eliminar")
          }
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }
  }
}
