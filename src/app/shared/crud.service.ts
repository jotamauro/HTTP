import { HttpClient } from "@angular/common/http";
import { take } from "rxjs/operators";

export class CrudService<T> {
  constructor(protected httpClient: HttpClient, private API_URL) {}
  list() {
    return this.httpClient.get<T[]>(this.API_URL);
  }
  create(record) {
    return this.httpClient.post(this.API_URL, record).pipe(take(1));
  }
  loadByid(id) {
    return this.httpClient.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }
  update(record: T) {
    return this.httpClient
      .put(`${this.API_URL}/${record["id"]}`, record)
      .pipe(take(1));
  }
  save(record: T) {
    if (record["id"]) {
      return this.update(record);
    }
    return this.create(record);
  }
  remove(id) {
    return this.httpClient.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
