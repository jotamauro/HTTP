import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CursosService } from "../cursos.service";
import { AlertMoralService } from "src/app/shared/alert-modal-service.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { CursosGenerics } from "../cursos-generics.service";

@Component({
  selector: "app-cursos-form",
  templateUrl: "./cursos-form.component.html",
  styleUrls: ["./cursos-form.component.scss"],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosGenerics,
    private modal: AlertMoralService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem não importa
    // exhaustMap -> casos de login

    const curso = this.route.snapshot.data["curso"];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  hasError(field: string) {
    return this.form.get(field).errors;
  }
  onSubmit() {
    this.submitted = true;

    let msgSucesso = "Curso criado com sucesso.";
    let msgErro = "Erro ao criar curso.";

    if (this.form.valid) {
      if (this.form.value.id) {
        msgSucesso = "Curso atualizado com sucesso.";
        msgErro = "Erro ao atualizar curso.";
      }
      this.service.save(this.form.value).subscribe(
        (success) => {
          this.modal.showAlertSuccess(msgSucesso);
          this.location.back();
        },
        (error) => {
          this.modal.showAlertDanger(msgErro);
        }
      );
    }
  }
  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
