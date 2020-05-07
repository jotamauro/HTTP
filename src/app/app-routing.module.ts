import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "busca-reativa" },
  { path: "cursos", loadChildren: "./cursos/cursos.module#CursosModule" },
  {
    path: "upload",
    loadChildren: "./upload-file/upload-file.module#UploadFileModule",
  },
  {
    path: "busca-reativa",
    loadChildren:
      "./reactive-search/reactive-search.module#ReactiveSearchModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
