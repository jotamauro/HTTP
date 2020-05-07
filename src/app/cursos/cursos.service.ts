import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Curso } from "./curso";
import { environment } from "../../environments/environment";
import { take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CursosService {
  private readonly API = `${environment.API}cursos`;
  constructor(private httpClient: HttpClient) {}

  public list() {
    return this.httpClient.get<Curso[]>(this.API);
  }
  private create(curso) {
    return this.httpClient.post(this.API, curso).pipe(take(1));
  }
  public loadByid(id) {
    return this.httpClient.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }
  private update(curso) {
    return this.httpClient.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }
  save(curso) {
    if (curso.id) {
      return this.update(curso);
    }
    return this.create(curso);
  }
  remove(id) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
