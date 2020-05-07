import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import {
  tap,
  map,
  filter,
  distinct,
  distinctUntilChanged,
  debounceTime,
  switchMap,
} from "rxjs/operators";

@Component({
  selector: "app-lib-search",
  templateUrl: "./lib-search.component.html",
  styleUrls: ["./lib-search.component.scss"],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = "https://api.cdnjs.com/libraries";
  results$: Observable<any>;
  total = 0;
  readonly FIELDS = "name,filename,version,homepage";
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.results$ = this.queryField.valueChanges.pipe(
      map((value) => value.trim()),
      filter((value) => value.length > 3),
      debounceTime(200),
      distinctUntilChanged(),
      //tap((value) => console.log(value)),
      switchMap((value) =>
        this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS,
          },
        })
      ),
      tap((res: any) => (this.total = res.total)),
      map((res: any) => res.results)
    );
  }

  onSearch() {
    let value = this.queryField.value;
    if (value && value.trim() !== "") {
      value = value.trim();
    }
    // const params = {
    //   search: value,
    //   fields: fields,
    // };
    let params = new HttpParams();
    params = params.set("search", value);
    params = params.set("fields", this.FIELDS);

    this.results$ = this.http.get(this.SEARCH_URL, { params }).pipe(
      tap((res: any) => (this.total = res.total)),
      map((res: any) => res.results)
    );
  }
}