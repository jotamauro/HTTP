import { Component, OnInit, ViewChild } from "@angular/core";
import { CursosService } from "../cursos.service";
import { Curso } from "../curso";
import { Observable, empty, Subject, EMPTY } from "rxjs";
import { catchError, take, switchMap } from "rxjs/operators";
import { AlertMoralService } from "src/app/shared/alert-modal-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CursosGenerics } from "../cursos-generics.service";

@Component({
  selector: "app-cursos-lista",
  templateUrl: "./cursos-lista.component.html",
  styleUrls: ["./cursos-lista.component.scss"],
})
export class CursosListaComponent implements OnInit {
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  deleteModalRef: BsModalRef;
  cursoSelecionado: Curso;
  @ViewChild("deleteModal", { static: false }) deleteModal;

  constructor(
    private service: CursosGenerics,
    private alertService: AlertMoralService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.onRefresh();
  }
  public onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleErro();
        return EMPTY;
      })
    );
  }
  handleErro() {
    this.alertService.showAlertDanger("Erro ao conectar no servidor.");
  }
  onEdit(id) {
    this.router.navigate(["editar", id], { relativeTo: this.route });
  }
  onDelete(curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {
    //   class: "modal-sm",
    // });
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja continuar ?",
      "Sim",
      "Não"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.service.remove(curso.id) : EMPTY))
      )
      .subscribe(
        (success) => {
          this.onRefresh();
        },
        (error) => this.alertService.showAlertDanger("Erro ao remover o curso")
      );
  }
  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      (success) => {
        this.onRefresh();
      },
      (error) => this.alertService.showAlertDanger("Erro ao remover o curso")
    );
  }
  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
