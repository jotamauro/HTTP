import { Injectable } from "@angular/core";
import { CrudService } from "../shared/crud.service";
import { Curso } from "./curso";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class CursosGenerics extends CrudService<Curso> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.API}cursos`);
  }
}
