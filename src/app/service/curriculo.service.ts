import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curriculo } from '../model/curriculo.model';

@Injectable({
  providedIn: 'root',
})
export class CurriculoService {
  private apiUrl = 'http://localhost:3003/curriculos';

  constructor(private http: HttpClient) {}

  // GET – lista todos os currículos
  getCurriculos(): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(this.apiUrl);
  }

  // GET by usuarioId – filtra pelo id do usuário logado
  getCurriculoByUsuarioId(usuarioId: number): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  // GET by id
  getCurriculoById(id: number): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.apiUrl}/${id}`);
  }

  // POST – cadastra novo currículo
  postCurriculo(curriculo: Curriculo): Observable<Curriculo> {
    return this.http.post<Curriculo>(this.apiUrl, curriculo);
  }

  // PUT – atualiza currículo existente
  putCurriculo(curriculo: Curriculo): Observable<Curriculo> {
    return this.http.put<Curriculo>(`${this.apiUrl}/${curriculo.id}`, curriculo);
  }

  // DELETE – remove currículo
  deleteCurriculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
