import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ModalModule, BsModalService } from "ngx-bootstrap/modal";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { AlertModalComponent } from "./shared/alert-modal/alert-modal.component";
import { ConfirmModalComponent } from "./shared/confirm-modal/confirm-modal.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent],
  entryComponents: [AlertModalComponent, ConfirmModalComponent],
})
export class AppModule {}
