import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../Settings/appsettings';
import { ICurso } from '../Models/ICurso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private http = inject(HttpClient)
  private apiUrl = appSettings.apiUrl;
  constructor() { }
  lista() {
    return this.http.get<ICurso[]>(`${this.apiUrl}Curso/getAll`);
  }
  create(objeto: ICurso) {
    return this.http.post<ICurso>(`${this.apiUrl}Curso/postCurso`, objeto);
  }
    obtener(idCurso:number){
    return this.http.get<ICurso>(`${this.apiUrl}Curso/getCursoById/${idCurso}`);
  }

  editar(objeto:ICurso){
    return this.http.put<boolean>(`${this.apiUrl}Curso/putCurso/`,objeto);
  }

  eliminar(idCurso:number){
    return this.http.delete<boolean>(`${this.apiUrl}Curso/deleteCurso/${idCurso}`);
  }
}
