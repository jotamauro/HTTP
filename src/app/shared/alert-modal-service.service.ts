import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { AlertModalComponent } from "./alert-modal/alert-modal.component";
import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";

export enum AlertTypes {
  DANGER = "danger",
  SUCCESS = "success",
}

@Injectable({
  providedIn: "root",
})
export class AlertMoralService {
  constructor(private modalService: BsModalService) {}

  private showAlert(
    message: string,
    type: AlertTypes,
    dismissTimeout?: number
  ) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }
  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }
  showConfirm(
    title: string,
    msg: string,
    confirmTxt?: string,
    cancelTxt?: string
  ) {
    const bsModalRef: BsModalRef = this.modalService.show(
      ConfirmModalComponent
    );
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;
    if (confirmTxt) {
      bsModalRef.content.confirmTxt = confirmTxt;
    }
    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
